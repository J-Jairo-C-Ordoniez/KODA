import { CldUploadWidget } from 'next-cloudinary';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';
import { labelClasses } from './VariantInput';

export default function VariantImageUpload({ imageUrl, setImageUrl }: any) {
  return (
    <div className="space-y-1">
      <label className={labelClasses}>Imagen</label>
      {imageUrl ? (
        <figure className="relative w-full aspect-square rounded-2xl overflow-hidden border border-foreground/10 group/img m-0">
          <Image 
            src={imageUrl} 
            alt="Vista previa de la variante" 
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover" 
          />
          <figcaption className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="p-2 bg-red-500/90 text-white rounded-xl flex items-center gap-1 font-bold text-xs"
              aria-label="Quitar imagen"
            >
              <X size={12} /> Quitar
            </button>
          </figcaption>
        </figure>
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
              className="w-full aspect-square rounded-2xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-1 text-foreground/60 hover:border-contrast/40 hover:text-contrast hover:bg-contrast/5 transition-all"
            >
              <Plus size={18} />
              <span className="text-xs font-semibold">Subir foto</span>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
