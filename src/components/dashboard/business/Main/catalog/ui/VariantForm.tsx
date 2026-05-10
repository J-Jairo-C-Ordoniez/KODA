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

  const L = "text-[10px] font-black uppercase tracking-widest text-foreground-muted";
  const I = "w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-contrast focus:ring-2 focus:ring-contrast/15 outline-none transition-all font-bold text-primary bg-background text-sm placeholder:text-foreground-muted/50";

  const Section = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-foreground/5">
      <span className="text-contrast">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">{label}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
          {error}
        </div>
      )}

      {/* Nombre + SKU */}
      <div className="space-y-3">
        <Section icon={<Tag size={12} />} label="Detalles Básicos" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={L}>Nombre</label>
            <div className="relative group">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/30 group-focus-within:text-contrast transition-colors" size={13} />
              <input required name="name" defaultValue={editingVariant?.name} className={`${I} pl-9`} placeholder="Negro L" />
            </div>
          </div>
          <div className="space-y-1">
            <label className={L}>SKU</label>
            <div className="relative group">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/30 group-focus-within:text-contrast transition-colors" size={13} />
              <input required name="sku" defaultValue={editingVariant?.sku} className={`${I} pl-9`} placeholder="TSH-BLK-L" />
            </div>
          </div>
        </div>
      </div>

      {/* Precio + Costo */}
      <div className="space-y-3">
        <Section icon={<DollarSign size={12} />} label="Precios" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={L}>Precio</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/40 font-black text-xs group-focus-within:text-contrast transition-colors">$</span>
              <input required type="number" step="0.01" name="price" defaultValue={editingVariant?.price} className={`${I} pl-7`} placeholder="0.00" />
            </div>
          </div>
          <div className="space-y-1">
            <label className={L}>Costo</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/40 font-black text-xs group-focus-within:text-contrast transition-colors">$</span>
              <input required type="number" step="0.01" name="cost" defaultValue={editingVariant?.cost} className={`${I} pl-7`} placeholder="0.00" />
            </div>
          </div>
        </div>
      </div>

      {/* Color + Talla */}
      <div className="space-y-3">
        <Section icon={<Palette size={12} />} label="Atributos" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={L}>Color</label>
            <div className="relative group">
              <Palette className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/30 group-focus-within:text-contrast transition-colors" size={13} />
              <input required name="color" defaultValue={editingVariant?.color} className={`${I} pl-9`} placeholder="Negro..." />
            </div>
          </div>
          <div className="space-y-1">
            <label className={L}>Talla</label>
            <div className="relative group">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/30 group-focus-within:text-contrast transition-colors" size={13} />
              <input required name="size" defaultValue={editingVariant?.size} className={`${I} pl-9`} placeholder="L, XL, 42..." />
            </div>
          </div>
        </div>
      </div>

      {/* Imagen + Visibilidad */}
      <div className="space-y-3">
        <Section icon={<ImageIcon size={12} />} label="Imagen y Estado" />
        <div className="grid grid-cols-2 gap-3 items-start">
          {/* Imagen compacta */}
          <div className="space-y-1">
            <label className={L}>Imagen</label>
            {imageUrl ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-foreground/10 group/img">
                <img src={imageUrl} alt="Vista previa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="p-2 bg-red-500/90 text-white rounded-xl flex items-center gap-1 font-bold text-xs"
                  >
                    <X size={12} /> Quitar
                  </button>
                </div>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset="clothing_upload"
                onSuccess={(result: any) => {
                  if (result.info?.secure_url) setImageUrl(result.info.secure_url);
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full aspect-square rounded-2xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-1.5 text-foreground-muted hover:border-contrast/40 hover:text-contrast hover:bg-contrast/5 transition-all"
                  >
                    <Plus size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Subir</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          {/* Visibilidad */}
          <div className="space-y-1">
            <label className={L}>Estado</label>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className="w-full p-3.5 rounded-xl border border-foreground/10 bg-background flex items-center justify-between gap-2 hover:border-contrast/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-contrast/10 border border-contrast/20' : 'bg-foreground/5 border border-foreground/10'}`}>
                  <Layers size={13} className={isActive ? 'text-contrast' : 'text-foreground-muted'} />
                </div>
                <div className="text-left">
                  <p className="font-black text-[11px] text-primary leading-none">{isActive ? 'Público' : 'Oculto'}</p>
                  <p className="text-foreground-muted text-[10px]">Visibilidad</p>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full p-0.5 transition-all shrink-0 ${isActive ? 'bg-contrast' : 'bg-foreground/15'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-all transform shadow-sm ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-3 border-t border-foreground/5">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3.5 rounded-2xl border border-foreground/10 font-bold text-sm text-foreground-muted hover:bg-foreground/5 hover:text-primary transition-all active:scale-95"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="flex-1 py-3.5 rounded-2xl bg-contrast text-white font-black text-sm hover:bg-contrast-hover disabled:opacity-50 transition-all shadow-lg shadow-contrast/25 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </span>
          ) : (
            <><Check size={15} /> {editingVariant ? 'Actualizar' : 'Guardar'}</>
          )}
        </button>
      </div>
    </form>
  );
}