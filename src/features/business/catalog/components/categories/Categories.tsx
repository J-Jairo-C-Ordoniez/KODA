'use client'

import { useEffect, useState, useRef } from 'react';
import { Tag, Plus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAdminCatalog } from '@/features/dashboard/business/hooks/useProducts';
import { SectionHeader } from '@/features/business/dashboard/components/Summary/Main/ui/SectionHeader';
import { EmptyState } from '@/features/business/dashboard/components/business-ui/EmptyState';
import Loader from '@/shared/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster, useToast } from '@/shared/components/ui/Toast';
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
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (tenantId) fetchCatalogData();
  }, [tenantId, fetchCatalogData]);

  useGSAP(() => {
    if (!isLoading && !error && categories.length > 0) {
      gsap.fromTo('.category-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, { scope: containerRef, dependencies: [isLoading, error, categories] });

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
    <main ref={containerRef} className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Categorías"
        subtitle="Organiza tus productos por grupos para una gestión más sencilla."
        action={
          <button
            onClick={handleOpenCreate}
            className="w-fit px-6 py-3 rounded-2xl bg-contrast text-white font-bold text-sm hover:bg-contrast-hover active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-contrast/20"
          >
            <Plus size={16} /> Nueva Categoría
          </button>
        }
      />

      {isLoading ? <Loader /> : error ? (
        <p role="alert" className="text-red-400 text-sm font-medium bg-red-500/8 p-4 rounded-2xl border border-red-500/15">{error}</p>
      ) : categories.length === 0 ? (
        <EmptyState icon={Tag} title="No hay categorías" description="Crea tu primera categoría para organizar tu catálogo." />
      ) : (
        <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
              className="category-card"
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
