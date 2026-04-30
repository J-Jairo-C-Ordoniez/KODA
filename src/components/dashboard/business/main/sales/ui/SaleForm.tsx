import React, { useState, useEffect, useMemo } from 'react';
import { useCustomers } from '@/hooks/admin/useCustomers';
import { useSession } from 'next-auth/react';
import CustomerSelectorModal from './CustomerSelectorModal';
import { Toaster, useToast } from '@/components/ui/Toast';
import ProductSearch from '../components/ProductSearch';
import CartList from '../components/CartList';
import CustomerSection from '../components/CustomerSection';

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
  const { customers, fetchCustomers, saveCustomer, isSaving: isSavingCustomer } = useCustomers(tenantId);
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

  const filteredVariants = useMemo(() => {
    if (!searchTerm) return [];
    const search = searchTerm.toLowerCase();
    return variants.filter((v: any) => 
      v.product?.name?.toLowerCase().includes(search) || 
      v.name?.toLowerCase().includes(search) || 
      v.sku?.toLowerCase().includes(search)
    ).slice(0, 10);
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
      showToast('success', 'Cliente registrado', 'Seleccionado automáticamente.');
    } else {
      showToast('error', 'Error', res.error || 'No se pudo crear.');
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
    <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[85vh] lg:h-[600px] overflow-hidden">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      {/* Search Section */}
      <div className="flex-1 min-h-[300px] lg:min-h-0">
        <ProductSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredVariants={filteredVariants}
          addToCart={addToCart}
          cartLength={cart.length}
        />
      </div>

      {/* Cart & Summary Section */}
      <div className="w-full lg:w-[400px] flex flex-col bg-foreground/3 rounded-3xl border border-foreground/5 overflow-hidden shrink-0">
        <div className="flex-1 overflow-hidden flex flex-col">
          <CartList 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={() => setCart([])}
          />
        </div>

        {/* Footer with Payment and Customer */}
        <div className="p-6 bg-background border-t border-foreground/5 space-y-6 shadow-2xl shadow-black/5">
          <div className="space-y-4">
            {/* Payment Options */}
            <div className="grid grid-cols-3 gap-2">
              {['cash', 'transfer', 'debt'].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border transition-all ${
                    paymentMethod === m 
                      ? 'bg-navy text-white shadow-lg shadow-navy/20 border-navy' 
                      : 'bg-white border-foreground/10 text-secondary hover:border-navy/30'
                  }`}
                >
                  {m === 'cash' ? 'Efectivo' : m === 'transfer' ? 'Transf.' : 'Fiado'}
                </button>
              ))}
            </div>

            <CustomerSection 
              paymentMethod={paymentMethod}
              selectedCustomer={selectedCustomer}
              setSelectedCustomerId={setSelectedCustomerId}
              setShowCustomerSelector={setShowCustomerSelector}
            />
          </div>

          <div className="pt-4 border-t border-foreground/5 space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Total Venta</p>
              <p className="text-3xl font-black text-primary tracking-tighter">${total.toLocaleString()}</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onCancel} 
                className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-secondary hover:bg-foreground/5 rounded-2xl transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                disabled={submitting || cart.length === 0 || (paymentMethod === 'debt' && !selectedCustomerId)}
                className="flex-2 py-4 bg-navy text-white text-md font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-navy/20 active:translate-y-0 transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none"
              >
                {submitting ? 'Procesando...' : 'Confirmar Venta'}
              </button>
            </div>
          </div>
        </div>
      </div>

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