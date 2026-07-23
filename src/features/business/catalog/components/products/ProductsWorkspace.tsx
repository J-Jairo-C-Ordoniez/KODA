'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Sidebar as SidebarIcon, Plus, LayoutGrid, ChevronRight, PackageOpen, HelpCircle } from 'lucide-react';
import { useAdminCatalog } from '@/features/dashboard/business/hooks/useProducts';
import CategoryAccordion from './CategoryAccordion';
import VariantCard from './VariantCard';
import VariantDrawer from './VariantDrawer';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';
import { Toaster, useToast } from '@/shared/components/Toaster';
import Loader from '@/shared/components/Loader';

export default function ProductsWorkspace() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const {
    products,
    categories,
    isLoading,
    error,
    isSaving,
    fetchCatalogData,
    saveProduct,
    deleteProduct,
    saveVariant,
    updateVariantStock,
    deleteVariant,
    saveCategory,
    deleteCategory,
  } = useAdminCatalog(tenantId);

  const { toasts, showToast, removeToast } = useToast();

  // Navigation and active product filter states
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'create-product' | 'edit-product' | 'create-category' | 'edit-category'>('grid');

  // Secondary state variables
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [isVariantDrawerOpen, setIsVariantDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    if (tenantId) fetchCatalogData();
  }, [tenantId, fetchCatalogData]);

  // Derive active selected product & category
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return products.find((p: any) => p.productId === selectedProductId);
  }, [products, selectedProductId]);

  const selectedCategoryOfProduct = useMemo(() => {
    if (!selectedProduct) return null;
    return categories.find((c: any) => c.categoryId === selectedProduct.categoryId);
  }, [categories, selectedProduct]);

  // Filtering variants
  const displayedVariants = useMemo(() => {
    if (selectedProductId) {
      const prod = products.find((p: any) => p.productId === selectedProductId);
      return prod?.variants || [];
    }
    // If no product is selected, display ALL variants in the catalog
    return products.flatMap((p: any) =>
      (p.variants || []).map((v: any) => ({ ...v, productName: p.name }))
    );
  }, [products, selectedProductId]);

  // Sidebar controls
  const handleSelectProduct = (productId: string | null) => {
    setSelectedProductId(productId);
    setActiveView('grid');
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const triggerCreateCategory = () => {
    setEditingItem(null);
    setActiveView('create-category');
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const triggerCreateProduct = () => {
    setEditingItem(null);
    setActiveView('create-product');
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  // Mutators for Categories
  const handleSaveCategory = async (formData: any) => {
    const res = await saveCategory(formData, editingItem);
    if (res.success) {
      showToast('success', editingItem ? 'Categoría actualizada' : 'Categoría creada', 'Los cambios se han guardado.');
      setActiveView('grid');
      setEditingItem(null);
    } else {
      showToast('error', 'Error al guardar categoría', res.error);
    }
    return res;
  };

  const handleUpdateCategoryInline = async (categoryId: string, data: { name: string }) => {
    const cat = categories.find(c => c.categoryId === categoryId);
    if (!cat) return { success: false, error: 'No encontrada' };
    const res = await saveCategory({ ...cat, name: data.name }, cat);
    if (res.success) {
      showToast('success', 'Categoría renombrada', `Nombre cambiado a "${data.name}"`);
    } else {
      showToast('error', 'Error al renombrar', res.error);
    }
    return res;
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const res = await deleteCategory(categoryId);
    if (res.success) {
      showToast('success', 'Categoría eliminada', 'La categoría se ha removido.');
      if (selectedProduct?.categoryId === categoryId) {
        setSelectedProductId(null);
      }
    } else {
      showToast('error', 'Error al eliminar', res.error);
    }
    return res;
  };

  // Mutators for Products
  const handleSaveProduct = async (formData: any) => {
    const res = await saveProduct(formData, editingItem);
    if (res.success) {
      showToast('success', editingItem ? 'Producto actualizado' : 'Producto creado', 'El producto se ha guardado.');
      setActiveView('grid');
      setEditingItem(null);
    } else {
      showToast('error', 'Error al guardar producto', res.error);
    }
    return res;
  };

  const handleUpdateProductInline = async (productId: string, data: { name: string, categoryId: string, gender: string }) => {
    const prod = products.find(p => p.productId === productId);
    if (!prod) return { success: false, error: 'No encontrado' };
    const res = await saveProduct({ ...prod, name: data.name }, prod);
    if (res.success) {
      showToast('success', 'Producto renombrado', `Nombre cambiado a "${data.name}"`);
    } else {
      showToast('error', 'Error al renombrar', res.error);
    }
    return res;
  };

  const handleDeleteProduct = async (productId: string) => {
    const res = await deleteProduct(productId);
    if (res.success) {
      showToast('success', 'Producto eliminado', 'El producto se ha removido.');
      if (selectedProductId === productId) {
        setSelectedProductId(null);
      }
    } else {
      showToast('error', 'Error al eliminar producto', res.error);
    }
    return res;
  };

  // Mutators for Variants
  const handleOpenVariantEdit = (variant: any) => {
    setSelectedVariant(variant);
    setIsVariantDrawerOpen(true);
  };

  const handleOpenVariantCreate = () => {
    setSelectedVariant(null);
    setIsVariantDrawerOpen(true);
  };

  const handleSaveVariant = async (formData: any) => {
    const res = await saveVariant(formData, selectedVariant, selectedProductId);
    if (res.success) {
      showToast('success', selectedVariant ? 'Variante actualizada' : 'Variante creada', 'Los cambios en la variante se guardaron con éxito.');
      setIsVariantDrawerOpen(false);
    } else {
      showToast('error', 'Error al guardar variante', res.error);
    }
    return res;
  };

  const handleQuickUpdateStock = async (variantId: string, stock: number) => {
    const res = await updateVariantStock(variantId, stock);
    if (res.success) {
      showToast('success', 'Stock actualizado', `El stock de la variante se actualizó a ${stock}.`);
    } else {
      showToast('error', 'Error de actualización', res.error);
    }
    return res;
  };

  const handleDeleteVariant = async (variantId: string) => {
    const res = await deleteVariant(variantId);
    if (res.success) {
      showToast('success', 'Variante eliminada', 'La variante se removió del catálogo.');
      setIsVariantDrawerOpen(false);
    } else {
      showToast('error', 'Error al eliminar', res.error);
    }
    return res;
  };

  // Breadcrumbs text
  const breadcrumbs = useMemo(() => {
    if (selectedProduct) {
      return (
        <span className="flex items-center gap-1.5 text-xs text-primary/45 uppercase tracking-widest font-bold">
          <span>Catálogo</span>
          <ChevronRight size={12} className="text-primary/25" />
          {selectedCategoryOfProduct && (
            <>
              <span className="hover:text-primary transition-colors">{selectedCategoryOfProduct.name}</span>
              <ChevronRight size={12} className="text-primary/25" />
            </>
          )}
          <span className="text-primary font-bold">{selectedProduct.name}</span>
        </span>
      );
    }
    return (
      <span className="text-xs text-primary uppercase tracking-widest font-bold">
        Catálogo / Todos los productos
      </span>
    );
  }, [selectedProduct, selectedCategoryOfProduct]);

  if (isLoading && products.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 left-2 z-110 p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-primary/10 hover:shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
        title={isSidebarOpen ? 'Ocultar árbol de catálogo' : 'Mostrar árbol de catálogo'}
        aria-label="Alternar menú de catálogo"
      >
        <SidebarIcon size={20} />
      </button>

      {/* Overlay Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Column: Navigation Accordion (18% width on desktop) */}
      <div
        className={`shrink-0 transition-all duration-300 border-r border-primary/5 bg-background fixed inset-y-0 left-0 z-100 w-[260px] p-4 pt-20
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:pt-4
          ${isSidebarOpen ? 'md:w-[18%] md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden md:p-0 md:border-r-0'}
        `}
      >
        <CategoryAccordion
          categories={categories}
          products={products}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
          onCreateCategory={triggerCreateCategory}
          onCreateProduct={triggerCreateProduct}
          onUpdateCategory={handleUpdateCategoryInline}
          onDeleteCategory={handleDeleteCategory}
          onUpdateProduct={handleUpdateProductInline}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>

      {/* Right Column: Stage (82% width) */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8 custom-scrollbar bg-background">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Main Views */}
          {activeView === 'create-category' && (
            <CategoryForm
              editingCategory={null}
              onCancel={() => setActiveView('grid')}
              onSave={handleSaveCategory}
              isSaving={isSaving}
            />
          )}

          {activeView === 'create-product' && (
            <ProductForm
              categories={categories}
              editingProduct={null}
              onCancel={() => setActiveView('grid')}
              onSave={handleSaveProduct}
              isSaving={isSaving}
            />
          )}

          {activeView === 'grid' && (
            <div className="space-y-6">
              {/* Header bar / Breadcrumbs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/5 pb-4">
                <div className="space-y-1">
                  {breadcrumbs}
                  {selectedProduct && (
                    <h2 className="text-xl font-bold text-primary tracking-tight uppercase mt-1">
                      {selectedProduct.name}
                    </h2>
                  )}
                </div>

                {selectedProductId && (
                  <div className="flex items-center gap-2">
                    {/* Edit Product button */}
                    <button
                      onClick={() => {
                        setEditingItem(selectedProduct);
                        setActiveView('create-product');
                      }}
                      className="py-2 px-3 border border-primary/10 hover:bg-primary/4 text-primary rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Editar Producto
                    </button>
                    {/* Add Variant button */}
                    <button
                      onClick={handleOpenVariantCreate}
                      className="flex items-center gap-2 py-2 px-4 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus size={14} /> Nueva Variante
                    </button>
                  </div>
                )}
              </div>

              {/* Grid of cards */}
              {displayedVariants.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-primary/5 rounded-2xl p-8 max-w-lg mx-auto shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-primary/4 flex items-center justify-center text-primary/40 mb-4 animate-pulse">
                    {selectedProduct ? <LayoutGrid size={28} /> : <PackageOpen size={28} />}
                  </div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                    {selectedProduct ? 'Sin variantes registradas' : 'Tu catálogo está listo'}
                  </h3>
                  <p className="text-xs text-primary/45 font-light leading-relaxed max-w-sm mt-2">
                    {selectedProduct
                      ? 'Crea tu primera variante para este producto especificando precio, talla, color y cantidad de stock.'
                      : 'Selecciona un producto en el menú de la izquierda o crea uno nuevo para empezar a cargar variantes.'}
                  </p>
                  {selectedProduct && (
                    <button
                      onClick={handleOpenVariantCreate}
                      className="mt-6 flex items-center gap-2 py-2 px-4 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus size={14} /> Crear primera variante
                    </button>
                  )}
                </div>
              ) : (
                /* Grilla de Variantes */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayedVariants.map((v: any) => {
                    const prodName = v.productName || selectedProduct?.name || 'Producto';
                    return (
                      <VariantCard
                        key={v.variantId}
                        variant={v}
                        productName={prodName}
                        onClick={() => handleOpenVariantEdit(v)}
                        onUpdateStock={handleQuickUpdateStock}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drawer for Variant Deep Editing */}
      <VariantDrawer
        isOpen={isVariantDrawerOpen}
        variant={selectedVariant}
        productId={selectedProductId || ''}
        onClose={() => setIsVariantDrawerOpen(false)}
        onSave={handleSaveVariant}
        onDelete={handleDeleteVariant}
        isSaving={isSaving}
      />
    </div>
  );
}
