'use client';

import { useEffect, useState, useMemo } from 'react';
import { Package, Plus, Search, Trash2 } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductModal from './ProductModal';
import ProductDetail from './ProductDetail';
import VariantModal from './VariantModal';
import { Toaster, useToast } from '@/components/ui/Toast';
import ProductCard from './components/ProductCard';

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
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingVariant, setEditingVariant] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);
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
    const matchesCategory = categoryFilter ? p.categoryId === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

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
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      if (productIdFromUrl === productToDelete.productId) handleCloseDetail();
    } else {
      showToast('error', 'Error', result.error);
    }
    setIsDeleting(false);
  };

  const handleSaveVariant = async (data: any) => {
    const result = await saveVariant(data, editingVariant, productIdFromUrl);
    if (result.success) {
      showToast('success', editingVariant ? 'Actualizada' : 'Añadida', 'Variante guardada.');
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
      <main className="space-y-8 bg-background w-full pt-6 px-4 sm:px-8 lg:px-12 overflow-y-auto pb-20">
        <Toaster toasts={toasts} removeToast={removeToast} />
        <ProductDetail 
          product={selectedProduct}
          onBack={handleCloseDetail}
          onAddVariant={() => { setEditingVariant(null); setIsVariantModalOpen(true); }}
          onEditVariant={(v: any) => { setEditingVariant(v); setIsVariantModalOpen(true); }}
          onDeleteVariant={async (id: string) => { if (confirm('¿Eliminar variante?')) await deleteVariant(id); }}
          onUpdateStock={updateVariantStock}
        />
        
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

        <VariantModal 
          isOpen={isVariantModalOpen}
          onClose={() => setIsVariantModalOpen(false)}
          size="2xl"
          onSubmit={handleSaveVariant}
          editingVariant={editingVariant}
          loading={isSaving}
        />
      </main>
    );
  }

  return (
    <main className="space-y-8 bg-background w-full pt-6 px-4 sm:px-8 lg:px-12 overflow-y-auto pb-20 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      <SectionHeader
        title="Catálogo"
        subtitle="Gestiona tus productos y existencias."
        action={
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={16} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[240px] pl-10 pr-4 py-2.5 rounded-xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy outline-none transition-all font-bold text-xs"
              />
            </div>
            <button 
              onClick={handleCreateProduct}
              className="px-5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs hover:bg-navy/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10"
            >
              <Plus size={16} /> Nuevo
            </button>
          </div>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <EmptyState icon={Package} title="Sin resultados" description="Prueba con otro término." />
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-foreground/5 text-center">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
                <Trash2 size={32} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-black text-primary">¿Eliminar Producto?</h3>
                <p className="text-secondary text-sm mt-2 font-medium">Esta acción no se puede deshacer.</p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  disabled={isDeleting}
                  onClick={confirmDeleteProduct}
                  className="w-full py-3.5 rounded-xl bg-red-500 text-white font-black text-xs hover:bg-red-600 transition-all active:scale-95"
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full py-3.5 rounded-xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 text-xs transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

