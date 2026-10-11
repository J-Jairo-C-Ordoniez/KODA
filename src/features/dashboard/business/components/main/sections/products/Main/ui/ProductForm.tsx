'use client';

import { useEffect, useState } from 'react';
import { SpinnerGapIcon } from '@phosphor-icons/react';
import Button from '@/shared/components/Button';

interface ProductFormProps {
  categories: any[];
  editingProduct: any | null;
  onCancel: () => void;
  onSave: (data: any) => Promise<any>;
  isSaving: boolean;
}

export default function ProductForm({ categories, editingProduct, onCancel, onSave, isSaving }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    gender: 'mixto',
    description: '',
    isPublic: true,
  });

  useEffect(() => {
    setFormData({
      name: editingProduct?.name || '',
      categoryId: editingProduct?.categoryId || categories[0]?.categoryId || '',
      gender: editingProduct?.gender || 'mixto',
      description: editingProduct?.description || '',
      isPublic: editingProduct?.isPublic !== false,
    });
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
    <section className="w-full space-y-5 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold tracking-tight leading-tight text-primary">
          {editingProduct ? 'Editar producto' : 'Crear producto'}
        </h2>
        <p className="max-w-3xl text-base font-normal leading-relaxed text-foreground/75 sm:text-lg md:text-xl">
          Guarda la ficha base del producto.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 border-t border-primary/10 pt-8"
      >
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <div>
            <label className="block text-base font-medium leading-relaxed text-foreground/75 sm:text-lg">
              Nombre del producto *
            </label>
            <p className="mt-1 text-sm font-normal leading-relaxed text-foreground/75 sm:text-base">
              Usa el nombre comercial de la prenda o línea.
            </p>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Sudadera Oversize de Algodón"
            className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <div>
            <label className="block text-base font-medium leading-relaxed text-foreground/75 sm:text-lg">
              Categoría *
            </label>
            <p className="mt-1 text-sm font-normal leading-relaxed text-foreground/75 sm:text-base">
              Elige dónde aparecerá en el menú del catálogo.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all focus:border-primary/30 focus:ring-4 focus:ring-primary/5 cursor-pointer sm:text-base"
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all focus:border-primary/30 focus:ring-4 focus:ring-primary/5 cursor-pointer sm:text-base"
            >
              <option value="mixto">Mixto</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <div>
            <label className="block text-base font-medium leading-relaxed text-foreground/75 sm:text-lg">
              Descripción
            </label>
            <p className="mt-1 text-sm font-normal leading-relaxed text-foreground/75 sm:text-base">
              Describe materiales, ajuste o intención de venta. Mantén el texto útil para quien administra el inventario.
            </p>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej: Silueta amplia, algodón pesado y acabado suave para colección urbana."
            rows={5}
            className="w-full resize-none rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <div>
            <label className="block text-base font-medium leading-relaxed text-foreground/75 sm:text-lg">
              Visibilidad
            </label>
            <p className="mt-1 text-sm font-normal leading-relaxed text-foreground/75 sm:text-base">
              Controla si este producto puede aparecer en la tienda pública cuando tenga variantes activas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className="flex items-center justify-between rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-left transition-colors hover:bg-primary/2 cursor-pointer"
          >
            <span>
              <span className="block text-sm font-bold text-primary">
                Producto {formData.isPublic ? 'visible' : 'oculto'}
              </span>
              <span className="mt-1 block text-xs text-primary/50">
                {formData.isPublic ? 'Disponible para mostrarse en tienda.' : 'Oculto mientras preparas la ficha.'}
              </span>
            </span>
            <span className={`flex h-6 w-12 items-center rounded-full p-1 transition-colors ${formData.isPublic ? 'bg-success' : 'bg-primary/10'}`}>
              <span className={`h-4 w-4 rounded-full bg-white shadow-md transition-transform ${formData.isPublic ? 'translate-x-6' : 'translate-x-0'}`} />
            </span>
          </button>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={onSave}
            disabled={isSaving}
            type='submit'
          >
            {isSaving ? (
              <>
                <SpinnerGapIcon size={16} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                Guardar producto
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
