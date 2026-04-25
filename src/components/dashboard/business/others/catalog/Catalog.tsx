'use client';

import { useEffect } from 'react';
import { Package, Plus } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';

export default function Catalog() {
  const { products, isLoading, error, fetchCatalogData } = useAdminCatalog();

  useEffect(() => { fetchCatalogData(); }, [fetchCatalogData]);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Catálogo de Productos"
        subtitle="Gestiona tus productos y sus variantes (talla, color, precio)."
        action={
          <button className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 transition-all flex items-center gap-2">
            <Plus size={16} /> Nuevo Producto
          </button>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : products.length === 0 ? (
        <EmptyState icon={Package} title="Sin productos" description="Agrega tu primer producto para empezar a vender." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <article key={product.productId} className="bg-background border border-foreground/5 rounded-3xl p-6 space-y-4 hover:shadow-xl hover:shadow-navy/5 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <Package size={20} className="text-navy" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.isPublic ? 'bg-green-50 text-green-600' : 'bg-foreground/5 text-secondary'}`}>
                  {product.isPublic ? 'Público' : 'Oculto'}
                </span>
              </div>
              <div>
                <h3 className="font-black text-primary">{product.name}</h3>
                <p className="text-secondary text-sm font-medium mt-1 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-foreground/5">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">{product.category?.name}</span>
                <span className="text-xs font-bold text-navy">{product.variants?.length || 0} variantes</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
