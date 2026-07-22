'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import type { Category } from '@/features/dashboard/business/api/products.api';

interface CategoryFormProps {
  editingCategory: Category | null; // Null means create mode
  onCancel: () => void;
  onSave: (data: any) => Promise<any>;
  isSaving: boolean;
}

export default function CategoryFormView({
  editingCategory,
  onCancel,
  onSave,
  isSaving,
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Tag',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || '',
        description: editingCategory.description || '',
        icon: editingCategory.icon || 'Tag',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Tag',
      });
    }
    setError(null);
  }, [editingCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError('El nombre es requerido');

    const res = await onSave(formData);
    if (!res.success) {
      setError(res.error || 'Error al guardar la categoría');
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-primary tracking-wide uppercase">
          {editingCategory ? 'Editar Categoría' : 'Crear Categoría'}
        </h2>
        <p className="text-xs text-primary/40 font-light mt-0.5 tracking-wide">
          Crea una nueva división en tu catálogo para organizar mejor tus productos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-primary/5 rounded-2xl p-8 shadow-sm">
        {error && (
          <div className="p-3.5 bg-accent-red/5 border border-accent-red/20 text-accent-red text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block">
            Nombre de la Categoría *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Calzado, Sudaderas, Accesorios"
            className="w-full bg-transparent border-b border-primary/15 focus:border-accent text-sm text-primary py-2.5 outline-none transition-all placeholder:text-primary/25 font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block">
            Descripción de Categoría
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Escribe una breve descripción opcional sobre las colecciones y productos que agrupará esta categoría..."
            rows={4}
            className="w-full bg-primary/3 border border-transparent focus:border-accent rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all resize-none"
          />
        </div>

        <input type="hidden" name="icon" value={formData.icon} />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-primary/5">
          <button
            type="button"
            onClick={onCancel}
            className="py-2.5 px-6 border border-primary/10 hover:bg-primary/4 text-primary rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 py-2.5 px-6 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Save size={14} /> {isSaving ? 'Guardando...' : 'Guardar Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
}
