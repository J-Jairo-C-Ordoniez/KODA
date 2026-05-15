'use client'

import { useState } from 'react';
import { Tag, Smartphone, Palette, Ruler, DollarSign, Image as ImageIcon, Check } from 'lucide-react';
import VariantInput from './VariantInput';
import VariantImageUpload from './VariantImageUpload';
import VariantStatusToggle from './VariantStatusToggle';

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

  const Fieldset = ({ icon, label, children }: { icon: React.ReactNode; label: string, children: React.ReactNode }) => (
    <fieldset className="space-y-3">
      <legend className="flex items-center gap-2 pb-2 border-b border-foreground/5 mb-2 w-full">
        <span className="text-contrast">{icon}</span>
        <span className="text-sm font-semibold text-primary tracking-tight">{label}</span>
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {children}
      </div>
    </fieldset>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold" role="alert">
          {error}
        </div>
      )}

      <Fieldset icon={<Tag size={14} />} label="Detalles Básicos">
        <VariantInput label="Nombre" name="name" icon={Tag} defaultValue={editingVariant?.name} placeholder="Ej. Negro L" />
        <VariantInput label="SKU" name="sku" icon={Smartphone} defaultValue={editingVariant?.sku} placeholder="Ej. TSH-BLK-L" />
      </Fieldset>

      <Fieldset icon={<DollarSign size={14} />} label="Precios">
        <VariantInput label="Precio" name="price" type="number" step="0.01" prefix="$" defaultValue={editingVariant?.price} placeholder="0.00" />
        <VariantInput label="Costo" name="cost" type="number" step="0.01" prefix="$" defaultValue={editingVariant?.cost} placeholder="0.00" />
      </Fieldset>

      <Fieldset icon={<Palette size={14} />} label="Atributos">
        <VariantInput label="Color" name="color" icon={Palette} defaultValue={editingVariant?.color} placeholder="Ej. Negro" />
        <VariantInput label="Talla" name="size" icon={Ruler} defaultValue={editingVariant?.size} placeholder="Ej. XL" />
      </Fieldset>

      <Fieldset icon={<ImageIcon size={14} />} label="Imagen y Estado">
        <VariantImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <VariantStatusToggle isActive={isActive} setIsActive={setIsActive} />
      </Fieldset>

      <div className="flex gap-3 pt-4 border-t border-foreground/5 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-2xl border border-foreground/10 font-semibold text-sm text-foreground/80 hover:bg-foreground/5 hover:text-primary transition-all active:scale-95"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="flex-1 py-3 rounded-2xl bg-contrast text-white font-bold text-sm hover:bg-contrast-hover disabled:opacity-50 transition-all shadow-lg shadow-contrast/25 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center gap-2" role="status">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              Guardando...
            </span>
          ) : (
            <><Check size={16} aria-hidden="true" /> {editingVariant ? 'Actualizar' : 'Guardar'}</>
          )}
        </button>
      </div>
    </form>
  );
}