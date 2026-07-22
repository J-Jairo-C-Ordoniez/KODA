'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Variant } from '@/features/dashboard/business/api/products.api';

interface VariantDrawerProps {
  isOpen: boolean;
  variant: Variant | null;
  productId: string;
  onClose: () => void;
  onSave: (data: any) => Promise<any>;
  onDelete?: (variantId: string) => Promise<any>;
  isSaving: boolean;
}

export default function VariantDrawer({
  isOpen,
  variant,
  productId,
  onClose,
  onSave,
  onDelete,
  isSaving,
}: VariantDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    color: '',
    size: '',
    price: '',
    cost: '',
    stock: '0',
    image: '',
    isActive: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (variant) {
      setFormData({
        name: variant.name || '',
        sku: variant.sku || '',
        color: variant.color || '',
        size: variant.size || '',
        price: String(variant.price || ''),
        cost: String(variant.cost || ''),
        stock: String(variant.inventories?.[0]?.stock ?? 0),
        image: variant.images?.[0]?.content || '',
        isActive: variant.isActive !== false,
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        color: '',
        size: '',
        price: '',
        cost: '',
        stock: '0',
        image: '',
        isActive: true,
      });
    }
    setError(null);
  }, [variant, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setError(null);

    if (!formData.name.trim()) return setError('El nombre es requerido');
    if (!formData.sku.trim()) return setError('El SKU es requerido');
    if (!formData.price || parseFloat(formData.price) < 0)
      return setError('El precio debe ser un número positivo');

    const res = await onSave({ ...formData, productId });
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Error al guardar la variante');
    }
  };

  const handleDeleteClick = async () => {
    if (!variant || !onDelete) return;
    if (confirm(`¿Estás seguro de que deseas eliminar la variante "${variant.name}"?`)) {
      const res = await onDelete(variant.variantId);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'No se puede eliminar la variante.');
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[140] bg-black/10 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-[150] w-full max-w-md bg-background border-l border-primary/5 shadow-2xl flex flex-col animate-slide-in-right h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-primary/5 bg-background-card">
          <div>
            <h3 className="text-base font-bold text-primary tracking-tight">
              {variant ? 'Editar Variante' : 'Nueva Variante'}
            </h3>
            <p className="text-xs font-semibold text-primary/40 uppercase tracking-wider mt-0.5">
              {variant ? `SKU: ${variant.sku}` : 'Ingresa los detalles de la variante'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
          {error && (
            <div className="p-3.5 bg-accent-red/5 border border-accent-red/20 text-accent-red text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">
              Nombre de Variante *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Negro / M"
              className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Ej: SUD-OVS-M-NEG"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-mono font-medium outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">Estado</label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                className={`flex items-center justify-center gap-2 w-full border rounded-xl py-2.5 px-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  formData.isActive
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-foreground-muted/40 border-primary/8 text-primary/50'
                }`}
              >
                {formData.isActive ? <><Eye size={14} /> Activo</> : <><EyeOff size={14} /> Inactivo</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Negro"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">Talla</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="M"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1 col-span-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">Precio *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                step="0.01"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-mono font-medium outline-none transition-all"
              />
            </div>
            <div className="space-y-1 col-span-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">Costo</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0"
                step="0.01"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-mono font-medium outline-none transition-all"
              />
            </div>
            <div className="space-y-1 col-span-1">
              <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">Inventario</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-mono font-medium outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-primary/50 uppercase tracking-widest block mb-1">
              URL de Imagen
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
            />
            {formData.image && (
              <div className="mt-3 relative w-24 h-24 rounded-xl overflow-hidden border border-primary/8 bg-background-card p-1">
                <img
                  src={formData.image}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-lg"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-primary/5 bg-background-card flex items-center justify-between gap-3">
          {variant && onDelete && (
            <button
              type="button"
              onClick={handleDeleteClick}
              disabled={isSaving}
              className="flex items-center gap-2 py-2.5 px-4 bg-transparent hover:bg-accent-red/5 text-accent-red border border-transparent hover:border-accent-red/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Trash2 size={14} /> Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-xs disabled:opacity-50"
          >
            <Save size={14} /> {isSaving ? 'Guardando...' : 'Guardar variante'}
          </button>
        </div>
      </aside>
    </>
  );
}
