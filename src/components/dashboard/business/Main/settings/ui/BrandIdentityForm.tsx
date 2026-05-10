'use client';

import { Palette, Upload, ShieldCheck, User, Sparkles } from 'lucide-react';

interface BrandIdentityProps {
  logo?: string;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BrandIdentityForm({ logo, isUploading, fileInputRef, onLogoChange }: BrandIdentityProps) {
  return (
    <div className="space-y-8">
      <div className="bg-background-elevated/40 border border-white/5 rounded-[40px] p-8 sm:p-10 space-y-8 relative overflow-hidden group shadow-2xl shadow-black/5">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-contrast/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-contrast/10 transition-all duration-700" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-contrast/10 flex items-center justify-center text-contrast">
            <Palette size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] leading-none">Identidad Visual</h3>
            <p className="text-foreground-muted text-[10px] font-bold uppercase tracking-tight opacity-40">El logo de tu negocio</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-8 relative z-10">
          <div 
            className="relative group cursor-pointer w-full aspect-square max-w-[220px]" 
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-full h-full rounded-[48px] border-2 border-dashed border-white/10 flex items-center justify-center bg-background-elevated overflow-hidden transition-all group-hover:border-contrast/30 group-hover:shadow-2xl group-hover:shadow-contrast/5">
              {logo ? (
                <img src={logo} alt="Logo de la tienda" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-foreground-muted/20">
                  <Upload size={48} strokeWidth={1.5} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Cargar Logo</span>
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-contrast/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[48px] backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-white text-contrast flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Upload size={24} />
                </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full py-4 rounded-2xl bg-foreground/5 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-contrast hover:text-white transition-all disabled:opacity-50 border border-white/5 active:scale-95"
            >
              {isUploading ? 'Subiendo...' : 'Cambiar Imagen'}
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
        </div>
      </div>
    </div>
  );
}
