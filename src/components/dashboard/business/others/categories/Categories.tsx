'use client';

import { useEffect } from 'react';
import { Tag, Plus } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';

export default function Categories() {
  const { categories, isLoading, error, fetchCatalogData, saveCategory, deleteCategory } = useAdminCatalog();

  useEffect(() => { fetchCatalogData(); }, [fetchCatalogData]);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Categorías"
        subtitle="Organiza tus productos por grupos para facilitar la gestión."
        action={
          <button className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 transition-all flex items-center gap-2">
            <Plus size={16} /> Nueva Categoría
          </button>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : categories.length === 0 ? (
        <EmptyState icon={Tag} title="Sin categorías" description="Crea tu primera categoría para organizar tu catálogo." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <article key={cat.categoryId} className="bg-background border border-foreground/5 rounded-3xl p-6 flex items-center gap-4 hover:shadow-lg hover:shadow-navy/5 transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-navy/10 flex items-center justify-center shrink-0">
                <Tag size={18} className="text-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-primary text-sm truncate">{cat.name}</p>
                <p className="text-secondary text-xs font-medium">{cat.products?.length || 0} productos</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
