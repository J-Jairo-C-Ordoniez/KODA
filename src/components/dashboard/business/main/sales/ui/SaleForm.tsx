import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Minus, Trash2, UserPlus, User, Check, ShoppingCart, CreditCard, AlertCircle, X, UserCheck } from 'lucide-react';
import { useCustomers } from '@/hooks/admin/useCustomers';
import { useSession } from 'next-auth/react';
import CustomerSelectorModal from './CustomerSelectorModal';
import { Toaster, useToast } from '@/components/ui/Toast';

interface CartItem {
  variantId: string;
  name: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string;
  color: string;
  size: string;
}

export default function SaleForm({ variants, onSubmit, onCancel, submitting }: any) {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { customers, isLoading: isCustomersLoading, isSaving: isSavingCustomer, fetchCustomers, saveCustomer } = useCustomers(tenantId);
  const { toasts, showToast, removeToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash, transfer, debt
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const selectedCustomer = useMemo(() => {
    return customers.find((c: any) => c.customerId === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  // Filter variants by search
  const filteredVariants = useMemo(() => {
    if (!searchTerm) return [];
    const search = searchTerm.toLowerCase();
    return variants.filter((v: any) => 
      v.product?.name?.toLowerCase().includes(search) || 
      v.name?.toLowerCase().includes(search) || 
      v.sku?.toLowerCase().includes(search)
    ).slice(0, 5); // Limit for performance
  }, [variants, searchTerm]);

  const addToCart = (v: any) => {
    const existing = cart.find(item => item.variantId === v.variantId);
    if (existing) {
      setCart(cart.map(item => 
        item.variantId === v.variantId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, {
        variantId: v.variantId,
        name: v.name,
        productName: v.product?.name || 'Producto',
        sku: v.sku,
        price: Number(v.price),
        quantity: 1,
        image: v.images?.[0]?.content,
        color: v.color,
        size: v.size
      }]);
    }
    setSearchTerm('');
  };

  const updateQuantity = (variantId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.variantId === variantId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (variantId: string) => {
    setCart(cart.filter(item => item.variantId !== variantId));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCreateCustomer = async (data: { name: string, phone: string }) => {
    const res = await saveCustomer(data);
    if (res.success) {
      setSelectedCustomerId(res.data.customerId);
      setShowCustomerSelector(false);
      showToast('success', 'Cliente registrado', 'Se ha seleccionado automáticamente.');
    } else {
      showToast('error', 'Error al registrar', res.error || 'No se pudo crear el cliente.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (paymentMethod === 'debt' && !selectedCustomerId) return;

    onSubmit({
      items: cart.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      })),
      total,
      paymentMethod,
      customerId: selectedCustomerId || undefined
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 h-[600px] relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      {/* Left Column: Search & Selection */}
      <div className="flex-1 flex flex-col space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Buscar Variantes</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Nombre, producto o SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-[20px] bg-foreground/5 border-2 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {searchTerm && filteredVariants.length === 0 && (
            <div className="py-12 text-center text-secondary opacity-50 space-y-2">
              <AlertCircle size={32} className="mx-auto opacity-20" />
              <p className="text-sm font-medium">No se encontraron resultados</p>
            </div>
          )}

          {!searchTerm && cart.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-foreground/5 rounded-[32px] flex items-center justify-center mx-auto text-secondary/20">
                <ShoppingCart size={32} />
              </div>
              <p className="text-secondary font-medium text-sm">Usa el buscador para añadir productos</p>
            </div>
          )}

          {filteredVariants.map((v: any) => (
            <button 
              key={v.variantId}
              onClick={() => addToCart(v)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 bg-background hover:border-navy/30 hover:bg-navy/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-foreground/5 border border-foreground/5 shadow-inner shrink-0">
                {v.images?.[0] ? <img src={v.images[0].content} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-[8px] font-bold opacity-20">N/A</div>}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-black text-primary truncate group-hover:text-navy transition-colors uppercase tracking-tight">{v.product?.name}</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{v.name} • {v.size}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-primary">${Number(v.price).toLocaleString()}</p>
                <Plus size={16} className="text-navy opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Cart & Checkout */}
      <div className="w-full md:w-[380px] flex flex-col bg-foreground/[0.02] rounded-[40px] border border-foreground/5 overflow-hidden">
        <div className="p-6 border-b border-foreground/5 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Carrito ({cart.length})</h3>
          {cart.length > 0 && <button onClick={() => setCart([])} className="text-[10px] font-bold text-red-500 hover:underline">Vaciar</button>}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cart.map((item) => (
            <div key={item.variantId} className="flex items-center gap-3 animate-in slide-in-from-right-4 duration-300">
               <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
                 <img src={item.image} className="w-full h-full object-cover" alt="" />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-[10px] font-black text-primary truncate uppercase">{item.productName}</p>
                 <p className="text-[9px] font-bold text-secondary tracking-widest uppercase opacity-60">${item.price.toLocaleString()}</p>
               </div>
               <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-foreground/5">
                 <button onClick={() => updateQuantity(item.variantId, -1)} className="p-1 hover:bg-foreground/5 rounded text-secondary"><Minus size={12} /></button>
                 <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                 <button onClick={() => updateQuantity(item.variantId, 1)} className="p-1 hover:bg-foreground/5 rounded text-secondary"><Plus size={12} /></button>
               </div>
               <button onClick={() => removeFromCart(item.variantId)} className="p-2 text-secondary/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="p-6 bg-white border-t border-foreground/5 space-y-6">
          <div className="space-y-4">
            {/* Payment Method */}
            <div className="grid grid-cols-3 gap-2">
              {['cash', 'transfer', 'debt'].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    paymentMethod === m ? 'bg-navy border-navy text-white shadow-lg shadow-navy/20' : 'bg-transparent border-foreground/10 text-secondary hover:border-navy/30'
                  }`}
                >
                  {m === 'cash' ? 'Efectivo' : m === 'transfer' ? 'Transf.' : 'Fiado'}
                </button>
              ))}
            </div>

            {/* Customer Section (Only if debt or explicitly selected) */}
            {(paymentMethod === 'debt' || selectedCustomerId) && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Cliente para el Fiado</label>
                
                {selectedCustomer ? (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy/5 border border-navy/10 relative group">
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-white shrink-0">
                      <UserCheck size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-primary uppercase tracking-tight truncate">{selectedCustomer.name}</p>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{selectedCustomer.phone}</p>
                    </div>
                    <button 
                      onClick={() => setShowCustomerSelector(true)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Cambiar Cliente"
                    />
                    <button 
                      onClick={() => setSelectedCustomerId('')}
                      className="p-2 hover:bg-red-50 text-secondary/40 hover:text-red-500 rounded-lg transition-all z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowCustomerSelector(true)}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-foreground/10 hover:border-navy/30 hover:bg-navy/5 text-secondary hover:text-navy transition-all group"
                  >
                    <UserPlus size={18} className="opacity-40 group-hover:opacity-100" />
                    <span className="text-xs font-bold">Seleccionar o Registrar Cliente</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-foreground/5 space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Total a Pagar</p>
              <p className="text-3xl font-black text-primary tracking-tight">${total.toLocaleString()}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={onCancel} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-secondary hover:bg-foreground/5 rounded-2xl transition-all">Cancelar</button>
              <button 
                onClick={handleSubmit}
                disabled={submitting || cart.length === 0 || (paymentMethod === 'debt' && !selectedCustomerId)}
                className="flex-[2] py-4 bg-navy text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
              >
                {submitting ? 'Procesando...' : 'Confirmar Venta'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Selector Modal Overlay */}
      {showCustomerSelector && (
        <CustomerSelectorModal 
          customers={customers}
          onSelect={(id) => { setSelectedCustomerId(id); setShowCustomerSelector(false); }}
          onCreateCustomer={handleCreateCustomer}
          onClose={() => setShowCustomerSelector(false)}
          isCreating={isSavingCustomer}
        />
      )}
    </div>
  );
}