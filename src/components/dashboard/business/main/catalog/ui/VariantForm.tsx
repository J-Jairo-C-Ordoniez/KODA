'use client'

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Tag, Smartphone, Palette, Ruler, DollarSign, Image as ImageIcon, Check, X, Plus, Layers } from 'lucide-react';

export default function VariantForm({ editingVariant, onSubmit, onCancel, loading, error }: any) {
  const [imageUrl, setImageUrl] = useState(editingVariant?.image || '');
  const [isActive, setIsActive] = useState(editingVariant ? editingVariant.isActive : true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    (data as any).isActive = isActive;
    (data as any).image = imageUrl;
    onSubmit(data);
  };

  const labelClass = "text-[10px] font-black uppercase tracking-widest text-secondary ml-1";
  const inputClass = "w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02]";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClass}>Nombre de la variante</label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              name="name"
              defaultValue={editingVariant?.name}
              className={`${inputClass} pl-12`}
              placeholder="Ej: Negro L"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>SKU (Código único)</label>
          <div className="relative">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              name="sku"
              defaultValue={editingVariant?.sku}
              className={`${inputClass} pl-12`}
              placeholder="Ej: TSHIRT-BLK-L"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className={labelClass}>Color</label>
          <div className="relative">
            <Palette className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              name="color"
              defaultValue={editingVariant?.color}
              className={`${inputClass} pl-12`}
              placeholder="Negro"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Talla / Tamaño</label>
          <div className="relative">
            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              name="size"
              defaultValue={editingVariant?.size}
              className={`${inputClass} pl-12`}
              placeholder="L, XL, 42..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Precio de Venta</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              type="number"
              step="0.01"
              name="price"
              defaultValue={editingVariant?.price}
              className={`${inputClass} pl-12`}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Costo de Compra</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              type="number"
              step="0.01"
              name="cost"
              defaultValue={editingVariant?.cost}
              className={`${inputClass} pl-12`}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Stock Inicial</label>
          <div className="relative">
            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            <input
              required
              type="number"
              name="stock"
              defaultValue={editingVariant?.inventories?.[0]?.stock || 0}
              className={`${inputClass} pl-12`}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className={labelClass}>Imagen de la Variante</label>
        <div className="flex flex-wrap gap-4">
          {imageUrl ? (
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-navy group">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <CldUploadWidget
              uploadPreset="clothing_upload"
              onSuccess={(result: any) => {
                if (result.info?.secure_url) {
                  setImageUrl(result.info.secure_url);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-32 h-32 rounded-3xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-2 text-secondary hover:border-navy hover:text-navy hover:bg-navy/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-navy/10">
                    <Plus size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Subir Foto</span>
                </button>
              )}
            </CldUploadWidget>
          )}

          <div className="flex-1 min-w-[240px] p-6 rounded-3xl bg-navy/5 border border-navy/10 flex items-center justify-between">
            <div>
              <p className="font-black text-navy text-sm">Estado de Variante</p>
              <p className="text-secondary text-xs font-medium">Activa esta variante para que aparezca en el catálogo.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-8 rounded-full p-1 transition-all ${isActive ? 'bg-navy' : 'bg-foreground/20'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-all transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-foreground/5">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="flex-1 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-lg shadow-navy/20 flex items-center justify-center gap-2"
        >
          {loading ? 'Guardando...' : <><Check size={18} /> Guardar Variante</>}
        </button>
      </div>
    </form>
  );
}