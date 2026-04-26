'use client';

import { useEffect, useState, useMemo } from 'react';
import { Package, Plus, Search, Filter, Layers, MoreVertical, Edit3, Trash2, Tag, Check } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductModal from './ProductModal';
import ProductDetail from './ProductDetail';
import VariantModal from './VariantModal';

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
  
  // Menu state for 3 dots
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingVariant, setEditingVariant] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => { 
    if (tenantId) fetchCatalogData(); 
  }, [tenantId, fetchCatalogData]);

  useEffect(() => { 
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const selectedProduct = useMemo(() => {
    return products.find((p: any) => p.productId === productIdFromUrl);
  }, [products, productIdFromUrl]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? p.categoryId === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Handlers for Products
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
      setAlertMessage(`No se puede eliminar: el producto "${product.name}" tiene variantes asociadas.`);
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
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      if (productIdFromUrl === productToDelete.productId) {
        handleCloseDetail();
      }
    } else {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  // Handlers for Variants
  const handleAddVariant = () => {
    setEditingVariant(null);
    setIsVariantModalOpen(true);
  };

  const handleEditVariant = (variant: any) => {
    setEditingVariant(variant);
    setIsVariantModalOpen(true);
  };

  const handleSaveVariant = async (data: any) => {
    const result = await saveVariant(data, editingVariant, productIdFromUrl);
    if (result.success) {
      setIsVariantModalOpen(false);
      setEditingVariant(null);
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
      <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20">
        <ProductDetail 
          product={selectedProduct}
          onBack={handleCloseDetail}
          onAddVariant={handleAddVariant}
          onEditVariant={handleEditVariant}
          onDeleteVariant={async (id) => {
            if (confirm('¿Eliminar esta variante?')) {
              await deleteVariant(id);
            }
          }}
          onUpdateStock={updateVariantStock}
        />
        
        {/* Modals are only for their respective tasks */}
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
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20">
      <SectionHeader
        title="Catálogo de Productos"
        subtitle="Gestiona tus productos y sus variantes."
        action={
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[280px]"
              />
            </div>
            <button 
              onClick={handleCreateProduct}
              className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-navy/20"
            >
              <Plus size={16} /> Nuevo Producto
            </button>
          </div>
        }
      />

      {alertMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Trash2 size={16} className="text-red-500" />
          </div>
          <p className="text-red-600 font-bold text-sm tracking-tight">{alertMessage}</p>
        </div>
      )}

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <EmptyState icon={Package} title={searchTerm ? "Sin resultados" : "Sin productos"} description={searchTerm ? "No encontramos productos que coincidan con tu búsqueda." : "Agrega tu primer producto para empezar a vender."} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product: any) => (
            <article 
              key={product.productId} 
              onClick={() => handleOpenDetail(product.productId)}
              className="bg-background border border-foreground/5 rounded-[40px] transition-all group relative flex flex-col cursor-pointer min-h-[320px]"
              style={{ zIndex: activeMenuId === product.productId ? 50 : 10 }}
            >
              {/* Contenedor con overflow-hidden solo para el fondo y decoraciones */}
              <div className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              </div>

              {/* Contenido Real */}
              <div className="p-8 space-y-6 flex-1 flex flex-col relative z-10">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
                    <Package size={24} className="text-navy group-hover:text-white" />
                  </div>
                  <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${product.isPublic ? 'bg-green-50 text-green-600' : 'bg-foreground/5 text-secondary'}`}>
                      {product.isPublic ? 'Público' : 'Privado'}
                    </span>
                    
                    {/* El Menú está FUERA del overflow-hidden para no ser recortado */}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === product.productId ? null : product.productId)}
                        className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenuId === product.productId && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-0 mt-2 w-48 bg-background rounded-2xl shadow-2xl border border-foreground/5 p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-secondary hover:text-navy hover:bg-navy/5 rounded-xl transition-all"
                            >
                              <Edit3 size={16} /> Editar Producto
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={16} /> Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="text-2xl font-black text-primary group-hover:text-navy transition-colors tracking-tight">{product.name}</h3>
                  <p className="text-secondary text-sm font-medium line-clamp-2 leading-relaxed">{product.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-navy" />
                      <span className="text-xs font-black text-secondary uppercase tracking-widest">{product.category?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-navy/20" />
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.15em]">{product.gender}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-foreground/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {product.variants?.slice(0, 3).map((v: any, i: number) => (
                          <div key={v.variantId} className="w-10 h-10 rounded-full border-4 border-background bg-navy/10 flex items-center justify-center overflow-hidden shadow-sm">
                            {v.images?.[0] ? (
                              <img src={v.images[0].content} alt={v.name} className="w-full h-full object-cover" />
                            ) : (
                              <Layers size={14} className="text-navy" />
                            )}
                          </div>
                        ))}
                        {product.variants?.length > 3 && (
                          <div className="w-10 h-10 rounded-full border-4 border-background bg-foreground/5 flex items-center justify-center text-xs font-black text-secondary shadow-sm">
                            +{product.variants.length - 3}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-black text-primary leading-none">{product.variants?.length || 0}</p>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Variantes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
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

      {/* Modal Personalizado de Eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-red-600/10 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] p-10 w-full max-w-sm shadow-2xl shadow-red-600/10 border border-white/20 relative overflow-hidden text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-[30px] bg-red-50 flex items-center justify-center mx-auto shadow-inner">
                <Trash2 size={40} className="text-red-500" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-primary tracking-tight">¿Eliminar Producto?</h3>
                <p className="text-secondary font-medium text-sm mt-2 leading-relaxed">
                  Estás a punto de eliminar <span className="text-primary font-bold">"{productToDelete?.name}"</span>.
                </p>
                
                {productToDelete?.variants?.length > 0 && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-amber-700 text-xs font-bold leading-tight">
                      Este producto tiene {productToDelete.variants.length} variantes. Debes eliminarlas primero para poder borrar el producto base.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  disabled={isDeleting || productToDelete?.variants?.length > 0}
                  onClick={confirmDeleteProduct}
                  className={`w-full py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                    productToDelete?.variants?.length > 0 
                    ? 'bg-foreground/10 text-secondary cursor-not-allowed shadow-none' 
                    : 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20'
                  }`}
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, eliminar producto'}
                </button>
                <button
                  onClick={() => { setIsDeleteModalOpen(false); setProductToDelete(null); }}
                  className="w-full py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95"
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
