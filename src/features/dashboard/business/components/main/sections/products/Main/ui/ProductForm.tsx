'use client';

import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
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
    <section className="mx-auto max-w-5xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          {editingProduct ? 'Editar producto' : 'Crear producto'}
        </h2>
        <p className="text-gray-500 text-base mt-1 max-w-2xl">
          Guarda la ficha base del producto.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 border-t border-primary/10 pt-8"
      >
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Nombre del producto *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Usa el nombre comercial de la prenda o línea.
            </p>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Sudadera Oversize de Algodón"
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Categoría *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Elige dónde aparecerá en el menú del catálogo.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-lg border border-primary/10 bg-background px-4 py-3 text-sm font-medium text-primary outline-none transition-all focus:border-primary cursor-pointer"
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
              className="w-full rounded-lg border border-primary/10 bg-background px-4 py-3 text-sm font-medium text-primary outline-none transition-all focus:border-primary cursor-pointer"
            >
              <option value="mixto">Mixto</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Descripción
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Describe materiales, ajuste o intención de venta. Mantén el texto útil para quien administra el inventario.
            </p>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej: Silueta amplia, algodón pesado y acabado suave para colección urbana."
            rows={5}
            className="w-full resize-none rounded-lg border border-primary/10 bg-background px-4 py-3 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-primary/25 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Visibilidad
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Controla si este producto puede aparecer en la tienda pública cuando tenga variantes activas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className="flex items-center justify-between rounded-lg border border-primary/10 bg-background px-4 py-3 text-left cursor-pointer"
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
                <LoaderCircle size={16} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                Guardar Categoría
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
