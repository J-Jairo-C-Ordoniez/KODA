'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { Package, Plus, Search, Trash2, Filter } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAdminCatalog } from '@/features/dashboard/business/hooks/useProducts';
import { SectionHeader } from '@/features/business/dashboard/components/Summary/Main/ui/SectionHeader';
import { EmptyState } from '@/features/business/dashboard/components/business-ui/EmptyState';
import Loader from '@/shared/components/Loader';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductModal from './ProductModal';
import ProductDetail from './ProductDetail';
import VariantModal from './VariantModal';
import { Toaster, useToast } from '@/shared/components/Toast';
import ProductCard from './components/ProductCard';
import { DeleteConfirmModal } from './ui/DeleteConfirmModal';

export default function Catalog() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tenantId = session?.user?.tenantId;

  const categoryFilter = searchParams.get('category');
  const productIdFromUrl = searchParams.get('productId');

  const {
    products,
    categories,
    isLoading,
    error,
    fetchCatalogData,
    saveProduct,
    deleteProduct,
    saveVariant,
    updateVariantStock,
    deleteVariant,
    isSaving
  } = useAdminCatalog(tenantId);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingVariant, setEditingVariant] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [variantToDelete, setVariantToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (tenantId) fetchCatalogData();
  }, [tenantId, fetchCatalogData]);

  const selectedProduct = useMemo(() => {
    return products.find((p: any) => p.productId === productIdFromUrl);
  }, [products, productIdFromUrl]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoryParam = categoryFilter ? p.categoryId === categoryFilter : true;
    const matchesCategorySelect = selectedCategory === 'all' || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategoryParam && matchesCategorySelect;
  });

  useGSAP(() => {
    if (!isLoading && !error && filteredProducts.length > 0) {
      gsap.fromTo('.product-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, { scope: containerRef, dependencies: [isLoading, error, filteredProducts] });

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
    setActiveMenuId(null);
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    if (product.variants?.length > 0) {
      showToast('error', 'No se puede eliminar', `El producto "${product.name}" tiene variantes asociadas.`);
      setActiveMenuId(null);
      return;
    }
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    const result = await deleteProduct(productToDelete.productId);
    if (result.success) {
      showToast('success', 'Eliminado', 'Producto eliminado.');
      if (productIdFromUrl === productToDelete.productId) handleCloseDetail();
    } else {
      showToast('error', 'Error al eliminar', result.error);
    }
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleOpenDeleteVariant = (variantId: string) => {
    const variant = products.flatMap((p: any) => p.variants || []).find((v: any) => v.variantId === variantId);
    setVariantToDelete(variant);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteVariant = async () => {
    if (!variantToDelete) return;
    setIsDeleting(true);
    const result = await deleteVariant(variantToDelete.variantId);
    if (result.success) {
      showToast('success', 'Eliminado', 'Variante eliminada.');
    } else {
      showToast('error', 'Error al eliminar', result.error);
    }
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setVariantToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
    setVariantToDelete(null);
  };

  const handleSaveVariant = async (data: any) => {
    const result = await saveVariant(data, editingVariant, productIdFromUrl);
    if (result.success) {
      showToast('success', editingVariant ? 'Actualizado' : 'Añadido', 'Variante guardada.');
      setIsVariantModalOpen(false);
      setEditingVariant(null);
    } else {
      showToast('error', 'Error', result.error);
    }
  };

  const handleOpenDetail = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('productId', id);
    router.push(`?${params.toString()}`);
  };

  const handleCloseDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('productId');
    router.push(`?${params.toString()}`);
  };

  if (productIdFromUrl && selectedProduct) {
    return (
      <main ref={containerRef} className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10">
        <Toaster toasts={toasts} removeToast={removeToast} />
        <ProductDetail
          product={selectedProduct}
          onBack={handleCloseDetail}
          onAddVariant={() => { setEditingVariant(null); setIsVariantModalOpen(true); }}
          onEditVariant={(v: any) => { setEditingVariant(v); setIsVariantModalOpen(true); }}
          onDeleteVariant={handleOpenDeleteVariant}
          onUpdateStock={updateVariantStock}
        />

        {isProductModalOpen && (
          <ProductModal
            isOpen={isProductModalOpen}
            onClose={() => setIsProductModalOpen(false)}
            size="2xl"
            tenantId={tenantId}
            categories={categories}
            editingProduct={editingProduct}
            onSave={saveProduct}
            isSaving={isSaving}
          />
        )}

        {isVariantModalOpen && (
          <VariantModal
            isOpen={isVariantModalOpen}
            onClose={() => setIsVariantModalOpen(false)}
            size="2xl"
            onSubmit={handleSaveVariant}
            editingVariant={editingVariant}
            loading={isSaving}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={productToDelete ? confirmDeleteProduct : confirmDeleteVariant}
            isDeleting={isDeleting}
            title={productToDelete ? '¿Eliminar producto?' : '¿Eliminar variante?'}
            itemName={productToDelete?.name || variantToDelete?.name}
          />
        )}
      </main>
    );
  }

  return (
    <main ref={containerRef} className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 relative pb-24">
      <Toaster toasts={toasts} removeToast={removeToast} />
      <SectionHeader
        title="Catálogo"
        subtitle="Gestiona tus productos y existencias."
        action={
          <div className="flex flex-col xl:flex-row gap-3 w-full xl:w-auto">
            <div className="flex gap-3 w-full xl:w-auto">
              <div className="relative group flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted group-focus-within:text-contrast transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-bold text-primary placeholder:font-medium placeholder:text-foreground-muted text-sm shadow-sm"
                />
              </div>
              <div className="relative group w-fit shrink-0">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted group-focus-within:text-contrast transition-colors z-10 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-11 pr-10 py-3.5 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-bold text-primary text-sm shadow-sm appearance-none cursor-pointer w-fit max-w-[200px]"
                >
                  <option value="all">Todas</option>
                  {categories.map((cat: any) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>
            <button
              onClick={handleCreateProduct}
              className="w-fit px-6 py-3.5 rounded-2xl bg-contrast text-white font-black text-sm hover:bg-contrast-hover active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-contrast/20 whitespace-nowrap"
            >
              <Plus size={16} /> Nuevo Producto
            </button>
          </div>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p role="alert" className="text-red-400 text-xs font-bold bg-red-500/8 p-4 rounded-xl border border-red-500/15">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <EmptyState icon={Package} title="Sin resultados" description="Prueba con otro término de búsqueda." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product.productId}
              product={product}
              activeMenuId={activeMenuId}
              setActiveMenuId={setActiveMenuId}
              onOpenDetail={handleOpenDetail}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          size="2xl"
          tenantId={tenantId}
          categories={categories}
          editingProduct={editingProduct}
          onSave={saveProduct}
          isSaving={isSaving}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={productToDelete ? confirmDeleteProduct : confirmDeleteVariant}
          isDeleting={isDeleting}
          title={productToDelete ? '¿Eliminar producto?' : '¿Eliminar variante?'}
          itemName={productToDelete?.name || variantToDelete?.name}
        />
      )}
    </main>
  );
}

