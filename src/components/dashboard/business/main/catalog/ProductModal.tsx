"use client";

import { useState, useEffect } from 'react';
import { Package, Check } from 'lucide-react';
import { useAdminCatalog } from '@/hooks/admin/useAdminCatalog';
import Modal from '../categories/ui/Modal';

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
  // const { saveProduct, isSaving } = useAdminCatalog(tenantId); // REMOVED to share state with Catalog
  
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
        onClose();
      } else {
        alert(result.error || 'Error al guardar el producto');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={size}
      title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      description="Gestiona la información base de tu producto."
      icon={<Package size={32} className="text-navy" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-2 overflow-y-auto max-h-[70vh] custom-scrollbar px-1">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nombre del Producto</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02]"
            placeholder="Ej. Gorras cerradas"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Descripción del Producto</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] resize-none"
            placeholder="Materiales, ajuste y detalles del producto..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Categoría</label>
          <select
            required
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] appearance-none"
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categories.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Género</label>
          <div className="grid grid-cols-3 gap-2">
            {['hombre', 'mujer', 'mixto'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setFormData({ ...formData, gender: g })}
                className={`py-4 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${
                  formData.gender === g 
                    ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20' 
                    : 'bg-background text-secondary border-foreground/10 hover:border-navy/30'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-navy/5 border border-navy/10 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="font-black text-navy text-xs tracking-tight uppercase tracking-widest">Público</p>
            <p className="text-secondary text-[10px] font-medium leading-tight">Mostrar en el catálogo para clientes.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
            className={`w-14 h-8 rounded-full p-1 transition-all shrink-0 ${formData.isPublic ? 'bg-navy' : 'bg-foreground/20'}`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transition-all transform ${formData.isPublic ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex gap-4 pt-4 sticky bottom-0 bg-background pb-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-xl shadow-navy/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isSaving ? 'Guardando...' : <><Check size={18} /> {editingProduct ? 'Actualizar' : 'Crear'}</>}
          </button>
        </div>
      </form>
    </Modal>
  );
}
