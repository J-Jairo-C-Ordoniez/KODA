'use client';

import { useEffect, useState } from 'react';
import { Package, Plus, Search, Filter, Layers, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import ProductModal from './ProductModal';

export default function Catalog() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const tenantId = session?.user?.tenantId;
  const categoryFilter = searchParams.get('category');
  
  const { products, categories, isLoading, error, fetchCatalogData, deleteProduct } = useAdminCatalog(tenantId);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => { 
    if (tenantId) fetchCatalogData(); 
  }, [tenantId, fetchCatalogData]);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? p.categoryId === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(productId);
    }
  };

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20">
      <SectionHeader
        title="Catálogo de Productos"
        subtitle="Gestiona tus productos y sus variantes (talla, color, precio)."
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
              onClick={handleCreate}
              className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-navy/20"
            >
              <Plus size={16} /> Nuevo Producto
            </button>
          </div>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <EmptyState icon={Package} title={searchTerm ? "Sin resultados" : "Sin productos"} description={searchTerm ? "No encontramos productos que coincidan con tu búsqueda." : "Agrega tu primer producto para empezar a vender."} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product: any) => (
            <article key={product.productId} className="bg-background border border-foreground/5 rounded-[32px] p-8 space-y-6 hover:shadow-2xl hover:shadow-navy/10 hover:border-navy/10 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
                  <Package size={24} className="text-navy group-hover:text-white" />
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${product.isPublic ? 'bg-green-50 text-green-600' : 'bg-foreground/5 text-secondary'}`}>
                    {product.isPublic ? 'Público' : 'Privado'}
                  </span>
                  <div className="relative group/menu">
                    <button className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative z-10 flex-1">
                <h3 className="text-xl font-black text-primary group-hover:text-navy transition-colors">{product.name}</h3>
                <p className="text-secondary text-sm font-medium line-clamp-2 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-navy" />
                  <span className="text-xs font-black text-secondary uppercase tracking-widest">{product.category?.name}</span>
                </div>

                <div className="pt-4 border-t border-foreground/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {product.variants?.slice(0, 3).map((v: any, i: number) => (
                        <div key={v.variantId} className="w-8 h-8 rounded-full border-2 border-background bg-navy/10 flex items-center justify-center overflow-hidden">
                          {v.images?.[0] ? (
                            <img src={v.images[0].content} alt={v.name} className="w-full h-full object-cover" />
                          ) : (
                            <Layers size={12} className="text-navy" />
                          )}
                        </div>
                      ))}
                      {product.variants?.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-foreground/5 flex items-center justify-center text-[10px] font-black text-secondary">
                          +{product.variants.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-primary">{product.variants?.length || 0} Variantes</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2.5 rounded-xl bg-foreground/5 text-secondary hover:bg-navy hover:text-white transition-all shadow-sm"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.productId)}
                      className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tenantId={tenantId}
        categories={categories}
        editingProduct={editingProduct}
      />
    </main>
  );
}
