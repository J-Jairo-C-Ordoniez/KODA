'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useCustomers } from '@/features/business/customers/hooks/useCustomers';
import { useSession } from 'next-auth/react';
import CustomerSelectorModal from './CustomerSelectorModal';
import { Toaster, useToast } from '@/shared/components/ui/Toast';
import ProductSearch from '../components/ProductSearch';
import CartList from '../components/CartList';
import CustomerSection from '../components/CustomerSection';
import { Check, X } from 'lucide-react';

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

  const PAYMENT_METHODS = [
    { id: 'cash', label: 'Efectivo' },
    { id: 'transfer', label: 'Transf.' },
    { id: 'debt', label: 'Fiado' }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[650px] lg:overflow-hidden">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      {/* Search Section */}
      <div className="flex-1 min-h-[300px] lg:min-h-0 flex flex-col">
        <ProductSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredVariants={filteredVariants}
          addToCart={addToCart}
          cartLength={cart.length}
        />
      </div>

      {/* Cart & Summary Section */}
      <div className="w-full lg:w-[400px] flex flex-col rounded-[32px] border border-white/10 overflow-hidden shrink-0">
        <div className="flex-1 overflow-hidden flex flex-col">
          <CartList 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={() => setCart([])}
          />
        </div>

        {/* Footer with Payment and Customer */}
        <div className="p-6 border-t border-white/10 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted ml-1">Método de Pago</label>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      paymentMethod === m.id 
                        ? 'bg-contrast text-white shadow-lg shadow-contrast/20 border-contrast' 
                        : 'bg-background border-white/10 text-foreground-muted hover:border-contrast/30'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <CustomerSection 
              paymentMethod={paymentMethod}
              selectedCustomer={selectedCustomer}
              setSelectedCustomerId={setSelectedCustomerId}
              setShowCustomerSelector={setShowCustomerSelector}
            />
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Total a Pagar</p>
              <p className="text-3xl font-black text-contrast tracking-tighter">${total.toLocaleString('es-ES')}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={onCancel} 
                className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 rounded-2xl transition-all border border-transparent hover:border-foreground/10"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                disabled={submitting || cart.length === 0 || (paymentMethod === 'debt' && !selectedCustomerId)}
                className="flex-[1.5] py-4 bg-contrast text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-contrast/20 active:translate-y-0 transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {submitting ? (
                   <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...</span>
                ) : <><Check size={16} /> Confirmar Venta</>}
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