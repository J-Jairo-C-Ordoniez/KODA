'use client'

import { useEffect, useState } from 'react';
import { Tag, Plus } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster, useToast } from '@/components/ui/Toast';
import { CategoryCard } from './ui/CategoryCard';
import { CategoryFormModal, DeleteCategoryModal } from './ui/CategoryModals';

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
  const { toasts, showToast, removeToast } = useToast();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (tenantId) fetchCatalogData();
  }, [tenantId, fetchCatalogData]);

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
      showToast('success', editingCategory ? 'Categoría actualizada' : 'Categoría creada', editingCategory ? 'Cambios guardados con éxito.' : `La categoría ${newCat.name} ha sido añadida.`);
      setNewCat({ name: '', description: '', icon: 'Tag' });
      setIsModalOpen(false);
      
      const newId = (result as any).data?.categoryId;
      if (newId) {
        setHighlightedId(newId);
        setTimeout(() => setHighlightedId(null), 3000);
      }
    } else {
      showToast('error', 'Error', result.error || 'No se pudo procesar la categoría.');
    }
  };

  const handleOpenDelete = (e: React.MouseEvent, cat: any) => {
    e.stopPropagation();
    if (cat._count?.products > 0) {
      showToast('error', 'No se puede eliminar', 'Esta categoría tiene productos asociados. Elimínalos primero.');
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
      showToast('success', 'Eliminada', 'La categoría ha sido eliminada del sistema.');
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } else {
      showToast('error', 'Error', result.error || 'No se pudo eliminar la categoría.');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/dashboard/business/catalog?category=${categoryId}`);
  };

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Categorías"
        subtitle="Organiza tus productos por grupos para una gestión más sencilla."
        action={
          <button
            onClick={handleOpenCreate}
            className="px-6 py-3 rounded-2xl bg-navy text-white font-bold text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-navy/20"
          >
            <Plus size={16} /> Nueva Categoría
          </button>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : categories.length === 0 ? (
        <EmptyState icon={Tag} title="No hay categorías" description="Crea tu primera categoría para organizar tu catálogo." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat: any) => (
            <CategoryCard
              key={cat.categoryId}
              cat={cat}
              highlightedId={highlightedId}
              activeMenuId={activeMenuId}
              setActiveMenuId={setActiveMenuId}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingCategory={editingCategory}
          newCat={newCat}
          setNewCat={setNewCat}
          onSubmit={handleCreateOrUpdate}
          isSaving={isSaving}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          onClose={() => { setIsDeleteModalOpen(false); setCategoryToDelete(null); }}
          categoryToDelete={categoryToDelete}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </main>
  );
}
