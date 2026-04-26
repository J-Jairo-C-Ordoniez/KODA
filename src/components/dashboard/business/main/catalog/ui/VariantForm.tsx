'use client'

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Tag, Smartphone, Palette, Ruler, DollarSign, Image as ImageIcon, Check, X, Plus, Layers } from 'lucide-react';

export default function VariantForm({ editingVariant, onSubmit, onCancel, loading, error }: any) {
  const [imageUrl, setImageUrl] = useState(
    editingVariant?.images?.[0]?.content || editingVariant?.image || ''
  );
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
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-pulse">
          {error}
        </div>
      )}

      {/* --- Sección: Detalles Básicos --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-foreground/5 pb-2">
          <Tag size={14} className="text-navy" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Detalles Básicos</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>Nombre</label>
            <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-navy transition-colors" size={16} />
              <input
                required
                name="name"
                defaultValue={editingVariant?.name}
                className={`${inputClass} pl-11 py-3 text-sm`}
                placeholder="Ej: Negro L"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>SKU</label>
            <div className="relative group">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-navy transition-colors" size={16} />
              <input
                required
                name="sku"
                defaultValue={editingVariant?.sku}
                className={`${inputClass} pl-11 py-3 text-sm`}
                placeholder="TSHIRT-BLK-L"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Sección: Precios e Inventario --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-foreground/5 pb-2">
          <DollarSign size={14} className="text-navy" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Precios e Inventario</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>Venta</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 font-black text-xs group-focus-within:text-navy">$</div>
              <input
                required
                type="number"
                step="0.01"
                name="price"
                defaultValue={editingVariant?.price}
                className={`${inputClass} pl-8 py-3 text-sm`}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>Costo</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 font-black text-xs group-focus-within:text-navy">$</div>
              <input
                required
                type="number"
                step="0.01"
                name="cost"
                defaultValue={editingVariant?.cost}
                className={`${inputClass} pl-8 py-3 text-sm`}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Sección: Atributos --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-foreground/5 pb-2">
          <Palette size={14} className="text-navy" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Atributos</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>Color</label>
            <div className="relative group">
              <Palette className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-navy transition-colors" size={16} />
              <input
                required
                name="color"
                defaultValue={editingVariant?.color}
                className={`${inputClass} pl-11 py-3 text-sm`}
                placeholder="Negro, Blanco..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>Talla</label>
            <div className="relative group">
              <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-navy transition-colors" size={16} />
              <input
                required
                name="size"
                defaultValue={editingVariant?.size}
                className={`${inputClass} pl-11 py-3 text-sm`}
                placeholder="L, XL, 42..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Sección: Multimedia y Estado --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-foreground/5 pb-2">
          <ImageIcon size={14} className="text-navy" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Multimedia y Estado</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <label className={labelClass}>Imagen</label>
            {imageUrl ? (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-navy/20 group">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                  <button 
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 font-bold text-[10px]"
                  >
                    <X size={14} /> Quitar Imagen
                  </button>
                </div>
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
                    className="w-full aspect-video rounded-3xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-2 text-secondary hover:border-navy hover:text-navy hover:bg-navy/5 transition-all group bg-foreground/[0.01]"
                  >
                    <Plus size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest block">Subir Foto</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Visibilidad</label>
            <div 
              onClick={() => setIsActive(!isActive)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isActive 
                  ? 'bg-navy/5 border-navy/20 shadow-sm' 
                  : 'bg-foreground/[0.02] border-foreground/10 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isActive ? 'bg-navy text-white' : 'bg-foreground/10 text-secondary'}`}>
                  <Layers size={16} />
                </div>
                <div>
                  <p className={`font-black text-xs ${isActive ? 'text-navy' : 'text-primary'}`}>Estado</p>
                  <p className="text-secondary text-[10px] font-medium leading-none mt-0.5">
                    {isActive ? 'Público' : 'Oculto'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className={`w-12 h-7 rounded-full p-1 transition-all ${isActive ? 'bg-navy' : 'bg-foreground/20'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Acciones --- */}
      <div className="flex gap-4 pt-4 border-t border-foreground/5">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3.5 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95 text-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="flex-1 py-3.5 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 active:scale-95 text-sm"
        >
          {loading ? 'Guardando...' : <><Check size={18} /> {editingVariant ? 'Actualizar' : 'Guardar'}</>}
        </button>
      </div>
    </form>
  );
}