'use client'

import { useEffect, useState, useRef } from 'react';
import { Tag, Plus, X, MoreVertical, Edit3, Trash2, AlertCircle } from 'lucide-react';
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

  const { categories, isLoading, isSaving, isDeleting, error, fetchCatalogData, saveCategory, deleteCategory } = useAdminCatalog(tenantId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [newCat, setNewCat] = useState({ name: '', description: '', icon: 'Tag' });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tenantId) fetchCatalogData();
  }, [tenantId, fetchCatalogData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setNewCat({ name: '', description: '', icon: 'Tag' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, cat: any) => {
    e.stopPropagation();
    setEditingCategory(cat);
    setNewCat({ name: cat.name, description: cat.description || '', icon: cat.icon || 'Tag' });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    const result = await saveCategory(newCat, editingCategory);
    if (result.success) {
      setFeedback({ type: 'success', msg: editingCategory ? 'Categoría actualizada' : 'Categoría creada' });
      setNewCat({ name: '', description: '', icon: 'Tag' });
      setIsModalOpen(false);
      
      const newId = (result as any).data?.categoryId;
      if (newId) {
        setHighlightedId(newId);
        setTimeout(() => setHighlightedId(null), 3000);
      }
    } else {
      setFeedback({ type: 'error', msg: result.error || 'Error al procesar la categoría' });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenDelete = (e: React.MouseEvent, cat: any) => {
    e.stopPropagation();
    if (cat._count?.products > 0) {
      setFeedback({ type: 'error', msg: 'No se puede eliminar: tiene productos asociados.' });
      setTimeout(() => setFeedback(null), 4000);
      setActiveMenuId(null);
      return;
    }
    setCategoryToDelete(cat);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    
    const result = await deleteCategory(categoryToDelete.categoryId);
    if (result.success) {
      setFeedback({ type: 'success', msg: 'Categoría eliminada' });
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } else {
      setFeedback({ type: 'error', msg: result.error || 'Error al eliminar' });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/dashboard/business/catalog?category=${categoryId}`);
  };

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20">
      <SectionHeader
        title="Categorías"
        subtitle="Organiza tus productos por grupos para facilitar la gestión."
        action={
          <button
            onClick={handleOpenCreate}
            className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-navy/20"
          >
            <Plus size={16} /> Nueva Categoría
          </button>
        }
      />

      {feedback && (
        <div className={`px-6 py-4 rounded-2xl text-sm font-bold border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
          feedback.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
        }`}>
          {feedback.type === 'error' && <AlertCircle size={18} />}
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
              className={`bg-background border rounded-[32px] p-8 flex flex-col gap-6 hover:shadow-2xl hover:shadow-navy/10 hover:border-navy/20 transition-all cursor-pointer group relative ${
                highlightedId === cat.categoryId ? 'border-navy ring-4 ring-navy/10 scale-[1.02]' : 'border-foreground/5'
              }`}
            >
              {/* Decorative background clipped to card shape */}
              <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              </div>
              
              <div className={`flex items-start justify-between relative ${activeMenuId === cat.categoryId ? 'z-30' : 'z-10'}`}>
                <div className="w-14 h-14 rounded-[20px] bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-all shadow-inner">
                  <Tag size={24} className="text-navy group-hover:text-white" />
                </div>

                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === cat.categoryId ? null : cat.categoryId); }}
                    className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {activeMenuId === cat.categoryId && (
                    <div ref={menuRef} className="absolute right-0 mt-2 w-52 bg-background border border-foreground/10 rounded-[24px] shadow-2xl z-10000 p-2 animate-in fade-in zoom-in-95 duration-200">
                      <button 
                        onClick={(e) => handleOpenEdit(e, cat)}
                        className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-primary hover:bg-navy/5 hover:text-navy rounded-2xl transition-all group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-navy/5 flex items-center justify-center group-hover/item:bg-navy group-hover/item:text-white transition-colors">
                          <Edit3 size={16} />
                        </div>
                        Editar
                      </button>
                      <button 
                        onClick={(e) => handleOpenDelete(e, cat)}
                        className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-red-100/50 flex items-center justify-center group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">
                          <Trash2 size={16} />
                        </div>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 relative z-10">
                <p className="font-black text-primary text-xl truncate group-hover:text-navy transition-colors">{cat.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cat._count?.products > 0 ? 'bg-green-500' : 'bg-secondary/30'}`} />
                  <p className="text-secondary text-[10px] font-black uppercase tracking-widest">{cat._count?.products || 0} productos</p>
                </div>
              </div>
              
              {cat.description && (
                <p className="text-secondary text-sm font-medium line-clamp-2 leading-relaxed border-t border-foreground/5 pt-4 relative z-10">
                  {cat.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Modal Categoría */}
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
              <div className="w-16 h-16 rounded-3xl bg-navy/10 flex items-center justify-center shadow-inner">
                <Tag size={32} className="text-navy" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-primary tracking-tight">
                  {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                </h3>
                <p className="text-secondary font-medium text-sm">
                  {editingCategory ? 'Actualiza los detalles de esta categoría.' : 'Define los detalles para organizar tu inventario.'}
                </p>
              </div>

              <form onSubmit={handleCreateOrUpdate} className="space-y-6">
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
                    rows={4}
                    value={newCat.description}
                    onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary placeholder:font-medium bg-foreground/[0.02] resize-none"
                    placeholder="Breve descripción de la categoría..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
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
                    className="flex-1 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-xl shadow-navy/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSaving ? 'Guardando...' : <><Check size={18} /> {editingCategory ? 'Actualizar' : 'Crear'}</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar Categoría */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-red-600/10 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] p-10 w-full max-w-sm shadow-2xl shadow-red-600/10 border border-white/20 relative overflow-hidden text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-[30px] bg-red-50 flex items-center justify-center mx-auto shadow-inner">
                <Trash2 size={40} className="text-red-500" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-primary tracking-tight">¿Eliminar Categoría?</h3>
                <p className="text-secondary font-medium text-sm mt-2">
                  Estás a punto de eliminar <span className="text-primary font-bold">"{categoryToDelete?.name}"</span>. Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="w-full py-4 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, eliminar categoría'}
                </button>
                <button
                  onClick={() => { setIsDeleteModalOpen(false); setCategoryToDelete(null); }}
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

function Check({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
}
