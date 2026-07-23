'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Toaster, useToast } from '@/shared/components/Toaster';
import Loader from '@/shared/components/Loader';
import useSalesPOS from '@/features/dashboard/business/hooks/useSalesPOS';

import POSCatalog from './ui/POSCatalog';
import ActiveCartTicket from './ui/ActiveCartTicket';
import CheckoutModal from './ui/CheckoutModal';

export default function Sales() {
  const { toasts, showToast, removeToast } = useToast();
  const {
    isLoadingCatalog,
    isSearching,
    categories,
    displayedVariants,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,

    cartItems,
    cartTotalItems,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,

    generalStats,
    customers,
    isLoadingCustomers,
    loadCustomers,
    isProcessingSale,
    processCheckout,
  } = useSalesPOS();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileTicketOpen, setIsMobileTicketOpen] = useState(false);

  const handleAddToCart = (variantId: string) => {
    addToCart(variantId);
  };

  const handleConfirmCheckout = async (data: any) => {
    const res = await processCheckout(data);
    if (res.success) {
      showToast('success', 'Venta registrada', 'El ticket se procesó correctamente.');
      setIsCheckoutOpen(false);
      setIsMobileTicketOpen(false);
    } else {
      showToast('error', 'Error en el cobro', res.error);
    }
    return res;
  };

  if (isLoadingCatalog && displayedVariants.length === 0 && !searchQuery) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 sm:p-8 pt-6 sm:pt-8">
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Split View: 70% Catalog / 30% Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Catalog (Left) */}
        <div className="lg:col-span-8">
          <POSCatalog
            categories={categories}
            variants={displayedVariants}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategoryFilter}
            onCategorySelect={setSelectedCategoryFilter}
            onAddToCart={handleAddToCart}
            isSearching={isSearching}
          />
        </div>

        {/* Active Cart Ticket (Right — Desktop only) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-6">
          <ActiveCartTicket
            items={cartItems}
            totalItems={cartTotalItems}
            subtotal={cartSubtotal}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Floating Cart Button */}
      {cartTotalItems > 0 && (
        <div className="lg:hidden fixed bottom-[96px] right-5 z-[120]">
          <button
            onClick={() => setIsMobileTicketOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 bg-primary hover:bg-secondary text-white rounded-2xl shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-primary">
                {cartTotalItems}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Ver Ticket ({cartTotalItems})
            </span>
          </button>
        </div>
      )}

      {/* Mobile Cart Drawer */}
      {isMobileTicketOpen && (
        <>
          <div
            onClick={() => setIsMobileTicketOpen(false)}
            className="lg:hidden fixed inset-0 z-[130] bg-black/20 backdrop-blur-xs"
          />
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-[135] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background p-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <ActiveCartTicket
              items={cartItems}
              totalItems={cartTotalItems}
              subtotal={cartSubtotal}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        </>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        total={cartSubtotal}
        customers={customers}
        isLoadingCustomers={isLoadingCustomers}
        isProcessing={isProcessingSale}
        onClose={() => setIsCheckoutOpen(false)}
        onLoadCustomers={loadCustomers}
        onConfirmCheckout={handleConfirmCheckout}
      />
    </div>
  );
}
