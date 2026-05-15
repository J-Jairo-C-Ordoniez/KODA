"use client";

import { useState, useEffect } from 'react';
import { Package, Check } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import Modal from '../categories/ui/Modal';
import { Toaster, useToast } from '@/components/ui/Toast';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string | undefined;
  categories: any[];
  editingProduct?: any;
  onSave: (data: any, editingProduct?: any) => Promise<{ success: boolean; error?: string }>;
  isSaving: boolean;
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

export default function ProductModal({ isOpen, onClose, tenantId, categories, editingProduct, onSave, isSaving, size = 'md' }: ProductModalProps) {
  const { toasts, showToast, removeToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    gender: 'mixto',
    isPublic: true
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        categoryId: editingProduct.categoryId || '',
        gender: editingProduct.gender || 'mixto',
        isPublic: editingProduct.isPublic ?? true
      });
    } else {
      setFormData({
        name: '',
        description: '',
        categoryId: categories[0]?.categoryId || '',
        gender: 'mixto',
        isPublic: true
      });
    }
  }, [editingProduct, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await onSave(formData, editingProduct);
      if (result.success) {
        showToast('success', editingProduct ? 'Producto actualizado' : 'Producto creado', 'Los cambios se han guardado correctamente.');
        setTimeout(() => onClose(), 1500);
      } else {
        showToast('error', 'Error', result.error || 'Error al guardar el producto');
      }
    } catch (err) {
      showToast('error', 'Error', 'Error de conexión');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={size}
      title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      icon={<Package size={24} className="text-contrast" />}
    >
      <Toaster toasts={toasts} removeToast={removeToast} />
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80 tracking-tight ml-1">Nombre del producto</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm placeholder:text-foreground-muted/70"
            placeholder="Ej. Gorras de béisbol"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80 tracking-tight ml-1">Descripción del producto</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm placeholder:text-foreground-muted/70 resize-none"
            placeholder="Materiales, ajuste y detalles..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80 tracking-tight ml-1">Categoría</label>
          <div className="relative">
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm appearance-none cursor-pointer"
            >
              <option value="" disabled>Seleccionar categoría</option>
              {categories.map(cat => (
                <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80 tracking-tight ml-1">Género</label>
          <div className="grid grid-cols-3 gap-2">
            {['hombre', 'mujer', 'mixto'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setFormData({ ...formData, gender: g })}
                className={`py-2.5 rounded-2xl border font-semibold text-sm capitalize transition-all active:scale-95 ${
                  formData.gender === g 
                    ? 'bg-contrast text-white border-contrast shadow-lg shadow-contrast/20' 
                    : 'bg-background text-foreground-muted border-foreground/10 hover:border-contrast/30 hover:text-primary'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-background border border-foreground/8 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-semibold text-primary text-sm tracking-tight">Público</p>
            <p className="text-foreground/60 text-sm font-medium leading-relaxed">Mostrar en el catálogo para clientes.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
            className={`w-14 h-7 rounded-full p-1 transition-all shrink-0 ${formData.isPublic ? 'bg-contrast shadow-lg shadow-contrast/30' : 'bg-foreground/15'}`}
            aria-label={formData.isPublic ? 'Hacer privado' : 'Hacer público'}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-all transform shadow-sm ${formData.isPublic ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex gap-3 sticky bottom-0 bg-background-elevated pt-4 pb-2 border-t border-foreground/5 mt-4 z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl border border-foreground/10 font-semibold text-sm text-foreground/80 hover:bg-foreground/5 hover:text-primary transition-all active:scale-95"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 py-3.5 rounded-2xl bg-contrast text-white font-bold text-sm hover:bg-contrast-hover disabled:opacity-50 transition-all shadow-lg shadow-contrast/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Guardando...</span>
            ) : (
              <><Check size={16} /> {editingProduct ? 'Actualizar' : 'Crear Producto'}</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
