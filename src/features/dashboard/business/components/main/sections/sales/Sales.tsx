'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Toaster from '@/shared/components/Toaster';
import useToast from '@/shared/hooks/useToast';
import Loader from '@/shared/components/Loader';
import useSalesPOS from '@/features/dashboard/business/hooks/useSalesPOS';

import POS from '@/features/dashboard/business/components/main/sections/sales/POS/POS';
import Ticket from '@/features/dashboard/business/components/main/sections/sales/ticket/Ticket';
import CheckoutModal from '@/features/dashboard/business/components/main/sections/sales/ticket/ui/CheckoutModal';
import Button from '@/shared/components/Button';

export default function Sales() {
  const { toasts, showToast, removeToast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileTicketOpen, setIsMobileTicketOpen] = useState(false);
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

    customers,
    isLoadingCustomers,
    loadCustomers,
    isProcessingSale,
    processCheckout,
  } = useSalesPOS();

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
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <POS
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

        <div className="hidden lg:block lg:col-span-4 sticky top-6">
          <Ticket
            items={cartItems}
            totalItems={cartTotalItems}
            subtotal={cartSubtotal}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        </div>
      </section>

      {cartTotalItems > 0 && (
        <div className="lg:hidden fixed bottom-24 right-5 z-120">
          <Button
            variant="primary"
            onClick={() => setIsMobileTicketOpen(true)}
          >
            <div className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-primary">
                {cartTotalItems}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Ver Ticket
            </span>
          </Button>
        </div>
      )}

      {isMobileTicketOpen && (
        <>
          <div
            onClick={() => setIsMobileTicketOpen(false)}
            className="md:hidden fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity"
          />
          <div className="md:hidden fixed inset-x-0 bottom-0 z-120 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
            <Ticket
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
