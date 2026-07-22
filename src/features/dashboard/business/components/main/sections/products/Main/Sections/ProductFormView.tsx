'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import type { Category, Product } from '@/features/dashboard/business/api/products.api';

interface ProductFormProps {
  categories: Category[];
  editingProduct: Product | null; // Null means create mode
  onCancel: () => void;
  onSave: (data: any) => Promise<any>;
  isSaving: boolean;
}

export default function ProductFormView({
  categories,
  editingProduct,
  onCancel,
  onSave,
  isSaving,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    gender: 'mixto', // Default to mixto (hombre, mujer, mixto)
    description: '',
    isPublic: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        categoryId: editingProduct.categoryId || '',
        gender: editingProduct.gender || 'mixto',
        description: editingProduct.description || '',
        isPublic: editingProduct.isPublic !== false,
      });
    } else {
      setFormData({
        name: '',
        categoryId: categories[0]?.categoryId || '',
        gender: 'mixto',
        description: '',
        isPublic: true,
      });
    }
    setError(null);
  }, [editingProduct, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError('El nombre es requerido');
    if (!formData.categoryId) return setError('La categoría es requerida');
    if (!formData.gender) return setError('El género es requerido');

    const res = await onSave(formData);
    if (!res.success) {
      setError(res.error || 'Error al guardar el producto');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-primary tracking-wide uppercase">
          {editingProduct ? 'Editar Producto' : 'Crear Producto'}
        </h2>
        <p className="text-xs text-primary/40 font-light mt-0.5 tracking-wide">
          Administra la información narrativa del producto y su ubicación en el catálogo.
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
            Nombre del Producto *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Sudadera Oversize de Algodón"
            className="w-full bg-transparent border-b border-primary/15 focus:border-accent text-sm text-primary py-2.5 outline-none transition-all placeholder:text-primary/25 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block">
              Categoría *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full bg-primary/3 border border-transparent focus:border-accent rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all cursor-pointer"
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block">
              Género *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-primary/3 border border-transparent focus:border-accent rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all cursor-pointer"
            >
              <option value="mixto">Mixto</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Escribe aquí los detalles técnicos y narrativos de este producto..."
            rows={4}
            className="w-full bg-primary/3 border border-transparent focus:border-accent rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-primary/2 rounded-xl border border-transparent">
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">
              Visibilidad del catálogo
            </label>
            <span className="text-[10px] text-primary/45 font-light tracking-wide mt-0.5 block">
              Si está activo, el producto será visible para los clientes en la tienda pública.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              formData.isPublic ? 'bg-success' : 'bg-primary/10'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                formData.isPublic ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

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
            <Save size={14} /> {isSaving ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}
