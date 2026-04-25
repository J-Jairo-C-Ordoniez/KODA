'use client'

import { useEffect, useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Categories() {
  const { data: session } = useSession();
  const router = useRouter();
  const tenantId = session?.user?.tenantId;

  const { categories, isLoading, isSaving, error, fetchCatalogData, saveCategory } = useAdminCatalog(tenantId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', description: '', icon: 'Tag' });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (tenantId) fetchCatalogData();
  }, [tenantId, fetchCatalogData]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    const result = await saveCategory(newCat);
    if (result.success) {
      setFeedback({ type: 'success', msg: 'Categoría creada con éxito' });
      setNewCat({ name: '', description: '', icon: 'Tag' });
      setIsModalOpen(false);
      
      // Highlight new category
      const newId = (result as any).data?.categoryId;
      if (newId) {
        setHighlightedId(newId);
        setTimeout(() => setHighlightedId(null), 3000);
      }
    } else {
      setFeedback({ type: 'error', msg: result.error || 'Error al crear la categoría' });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/dashboard/business/catalog?category=${categoryId}`);
  };

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto">
      <SectionHeader
        title="Categorías"
        subtitle="Organiza tus productos por grupos para facilitar la gestión."
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-navy/20"
          >
            <Plus size={16} /> Nueva Categoría
          </button>
        }
      />

      {feedback && (
        <div className={`px-4 py-3 rounded-2xl text-sm font-semibold border animate-in fade-in slide-in-from-top-2 ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
          }`}>
          {feedback.msg}
        </div>
      )}

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : categories.length === 0 ? (
        <EmptyState icon={Tag} title="Sin categorías" description="Crea tu primera categoría para organizar tu catálogo." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat: any) => (
            <article
              key={cat.categoryId}
              onClick={() => handleCategoryClick(cat.categoryId)}
              className={`bg-background border rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl hover:shadow-navy/5 hover:border-navy/10 transition-all cursor-pointer group relative overflow-hidden ${
                highlightedId === cat.categoryId ? 'border-navy ring-4 ring-navy/10 scale-[1.02]' : 'border-foreground/5'
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-navy/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center shrink-0 group-hover:bg-navy group-hover:text-white transition-colors">
                  <Tag size={20} className="text-navy group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <p className="font-black text-primary text-base truncate group-hover:text-navy transition-colors">{cat.name}</p>
                  <p className="text-secondary text-[10px] font-black uppercase tracking-widest">{cat._count?.products || 0} productos</p>
                </div>
              </div>
              
              {cat.description && (
                <p className="text-secondary text-xs font-medium line-clamp-2 leading-relaxed border-t border-foreground/5 pt-3">
                  {cat.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Modal Nueva Categoría */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] p-10 w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-navy/10 flex items-center justify-center">
                <Tag size={32} className="text-navy" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-primary tracking-tight">Nueva Categoría</h3>
                <p className="text-secondary font-medium text-sm">Define los detalles para organizar tu inventario.</p>
              </div>

              <form onSubmit={handleCreate} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nombre</label>
                  <input
                    autoFocus
                    type="text"
                    required
                    value={newCat.name}
                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary placeholder:font-medium bg-foreground/[0.02]"
                    placeholder="Ej. Calzado, Accesorios..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Descripción (Opcional)</label>
                  <textarea
                    rows={3}
                    value={newCat.description}
                    onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary placeholder:font-medium bg-foreground/[0.02] resize-none"
                    placeholder="Breve descripción de la categoría..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !newCat.name.trim()}
                    className="flex-1 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-lg shadow-navy/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSaving ? 'Guardando...' : <><Plus size={18} /> Crear</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
