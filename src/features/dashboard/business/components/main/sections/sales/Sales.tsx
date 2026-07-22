'use client';

import { useState } from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Toaster, useToast } from '@/shared/components/Toast';
import Loader from '@/shared/components/Loader';
import useSalesPOS from '@/features/dashboard/business/hooks/useSalesPOS';
import useProducts from '@/features/dashboard/business/hooks/useProducts';

import SalesMetrics from './ui/SalesMetrics';
import POSCatalog from './ui/POSCatalog';
import ActiveCartTicket from './ui/ActiveCartTicket';
import CheckoutModal from './ui/CheckoutModal';
import VariantDrawer from '@/features/business/catalog/components/products/VariantDrawer';

interface SalesProps {
  tenantId?: string;
}

export default function Sales({ tenantId = 'default-tenant' }: SalesProps) {
  const { toasts, showToast, removeToast } = useToast();
  const {
    catalogLoading,
    categories,
    filteredVariants,
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

    metrics,
    customers,
    isProcessingSale,
    processCheckout,
  } = useSalesPOS(tenantId);

  const { isSaving: isCatalogSaving, saveVariant, deleteVariant } = useProducts();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<any | null>(null);
  const [isVariantDrawerOpen, setIsVariantDrawerOpen] = useState(false);
  const [isMobileTicketOpen, setIsMobileTicketOpen] = useState(false);

  const handleAddToCart = (variantId: string) => {
    addToCart(variantId);
    showToast('success', 'Producto agregado', 'Se añadió el item al ticket activo.');
  };

  const handleOpenEditVariant = (variant: any) => {
    setEditingVariant(variant);
    setIsVariantDrawerOpen(true);
  };

  const handleDeleteVariant = async (variantId: string) => {
    const res = await deleteVariant(variantId);
    if (res.success) {
      showToast('success', 'Variante eliminada', 'Se removió la variante del catálogo.');
      setIsVariantDrawerOpen(false);
      setEditingVariant(null);
    } else {
      showToast('error', 'Error al eliminar', res.error);
    }
  };

  const handleSaveVariant = async (formData: any) => {
    const res = await saveVariant(formData, editingVariant, editingVariant?.productId);
    if (res.success) {
      showToast('success', 'Variante actualizada', 'Los cambios se guardaron con éxito.');
      setIsVariantDrawerOpen(false);
      setEditingVariant(null);
    } else {
      showToast('error', 'Error al guardar', res.error);
    }
  };

  const handleConfirmCheckout = async (data: any) => {
    const res = await processCheckout(data);
    if (res.success) {
      showToast('success', 'Venta registrada con éxito', 'Se generó la venta y se actualizó el inventario.');
      setIsCheckoutOpen(false);
      setIsMobileTicketOpen(false);
    } else {
      showToast('error', 'Error en el cobro', res.error);
    }
    return res;
  };

  if (catalogLoading && filteredVariants.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Header Breadcrumb */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary/60" aria-label="Ubicación de ventas">
          <span className="rounded-md bg-foreground-muted/40 px-2.5 py-1 text-primary/70 font-semibold">Caja / POS</span>
          <ChevronRight size={13} className="text-primary/25" />
          <span className="px-1 py-0.5 font-bold text-primary">Ventas en Mostrador</span>
        </nav>
      </header>

      {/* Sales Summary Metrics */}
      <SalesMetrics metrics={metrics} />

      {/* POS Main Content Split View (70% Catalog / 30% Active Cart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (70%): Catalog & Search */}
        <div className="lg:col-span-8 space-y-5">
          <POSCatalog
            categories={categories}
            variants={filteredVariants}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategoryFilter}
            onCategorySelect={setSelectedCategoryFilter}
            onAddToCart={handleAddToCart}
            onEditVariant={handleOpenEditVariant}
            onDeleteVariant={handleDeleteVariant}
          />
        </div>

        {/* Right Column (30% Desktop Ticket / Mobile Hidden) */}
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

      {/* Mobile Floating Cart Button & Drawer */}
      {cartTotalItems > 0 && (
        <div className="lg:hidden fixed bottom-6 right-6 z-[120]">
          <button
            onClick={() => setIsMobileTicketOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 bg-primary hover:bg-secondary text-white rounded-2xl shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent-red text-white text-[10px] font-bold flex items-center justify-center border-2 border-primary">
                {cartTotalItems}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Ver Ticket ({cartTotalItems})</span>
          </button>
        </div>
      )}

      {/* Mobile Cart Drawer Overlay */}
      {isMobileTicketOpen && (
        <>
          <div
            onClick={() => setIsMobileTicketOpen(false)}
            className="lg:hidden fixed inset-0 z-[130] bg-black/20 backdrop-blur-xs transition-opacity"
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
        isProcessing={isProcessingSale}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirmCheckout={handleConfirmCheckout}
      />

      {/* Variant Edit Drawer */}
      <VariantDrawer
        isOpen={isVariantDrawerOpen}
        variant={editingVariant}
        productId={editingVariant?.productId || ''}
        onClose={() => setIsVariantDrawerOpen(false)}
        onSave={handleSaveVariant}
        onDelete={handleDeleteVariant}
        isSaving={isCatalogSaving}
      />
    </div>
  );
}
