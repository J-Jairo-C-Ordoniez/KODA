'use client';

import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

interface CategoryFormProps {
  editingCategory: any | null;
  onCancel: () => void;
  onSave: (data: any) => Promise<any>;
  isSaving: boolean;
}

export default function CategoryForm({
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
    setFormData({
      name: editingCategory?.name || '',
      description: editingCategory?.description || '',
      icon: editingCategory?.icon || 'Tag',
    });
    setError(null);
  }, [editingCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    const res = await onSave(formData);
    if (!res.success) {
      setError(res.error || 'Error al guardar la categoría');
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          {editingCategory ? 'Editar categoría' : 'Crear categoría'}
        </h2>
        <p className="text-gray-500 text-base mt-1 max-w-2xl">
          Define una división clara para agrupar productos y facilitar la navegación del catálogo.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 border-t border-primary/10 pt-8">
        {error && (
          <div className="rounded-lg border border-accent-red/20 bg-accent-red/5 p-3.5 text-sm font-medium text-accent-red">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Nombre de la categoría *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Usa un nombre corto y reconocible. Este nombre también ordena los productos en el menú lateral.
            </p>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Calzado, Sudaderas, Accesorios"
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Descripción
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Añade una nota interna para recordar qué colecciones o líneas deben vivir dentro de esta categoría.
            </p>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej: Prendas superiores de temporada, lanzamientos y básicos permanentes."
            rows={5}
            className="w-full resize-none rounded-lg border border-primary/10 bg-white px-4 py-3 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        <input type="hidden" name="icon" value={formData.icon} />

        <div className="flex flex-col-reverse gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-primary/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-foreground-muted/40 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-secondary disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} /> {isSaving ? 'Guardando...' : 'Guardar categoría'}
          </button>
        </div>
      </form>
    </section>
  );
}
