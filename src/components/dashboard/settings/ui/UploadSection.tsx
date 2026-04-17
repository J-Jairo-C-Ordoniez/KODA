'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';

export default function UploadSection({ label, value, preset, onSuccess, aspect }) {
    return (
        <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-secondary ml-1">{label}</label>

            <div className={`relative group w-full ${aspect} bg-primary/5 border-2 border-dashed border-primary/10 rounded-xl overflow-hidden transition-all hover:border-primary/30 shadow-sm`}>
                {value ? (
                    <Image
                        src={value}
                        alt="Preview"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary/30">
                        <ImageIcon className="h-10 w-10 mb-2 stroke-[1px]" />
                        <span className="text-[10px] font-medium tracking-tighter uppercase">Sin archivo seleccionado</span>
                    </div>
                )}

                <div className={`absolute inset-0 bg-primary/90 flex flex-col items-center justify-center transition-all duration-300 ${value ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    <CldUploadWidget
                        uploadPreset={preset}
                        onSuccess={(result) => {
                            if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                                onSuccess(result.info.secure_url as string);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open()}
                                className="bg-foreground text-primary px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-2xl transform transition-transform active:scale-90"
                            >
                                {value ? 'Reemplazar Imagen' : 'Subir Archivo'}
                            </button>
                        )}
                    </CldUploadWidget>
                    <p className="text-[8px] text-foreground/50 mt-4 uppercase font-bold tracking-tighter">Cloudinary Secure Upload</p>
                </div>
            </div>
        </div>
    );
}