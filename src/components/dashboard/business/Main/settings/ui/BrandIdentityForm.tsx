import { Palette, Upload, Globe, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface BrandIdentityProps {
  logo?: string;
  slug: string;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCopyLink: () => void;
}

export function BrandIdentityForm({ logo, slug, isUploading, fileInputRef, onLogoChange, onCopyLink }: BrandIdentityProps) {
  return (
    <div className="space-y-8 h-full">
      <div className="bg-background border border-foreground/5 rounded-[40px] p-8 space-y-8 shadow-sm">
        <div className="space-y-1.5">
          <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
            <Palette size={16} className="text-navy" /> Identidad Visual
          </h3>
          <p className="text-secondary text-[10px] font-bold uppercase tracking-tight opacity-60">Tu logo es la cara de tu negocio.</p>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <div 
            className="relative group cursor-pointer w-full aspect-square max-w-[240px]" 
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-full h-full rounded-[48px] border-2 border-dashed border-navy/10 flex items-center justify-center bg-navy/2 overflow-hidden transition-all group-hover:border-navy/30 group-hover:bg-navy/5">
              {logo ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-navy/30">
                  <Upload size={40} strokeWidth={1.5} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Subir Logo</span>
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[48px] backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-2xl bg-white text-navy flex items-center justify-center shadow-2xl">
                  <Upload size={20} />
                </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full py-4 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 transition-all disabled:opacity-50 shadow-xl shadow-navy/10"
            >
              {isUploading ? 'Procesando...' : 'Cambiar Imagen'}
            </button>
            <p className="text-[9px] font-black text-secondary text-center uppercase tracking-[0.2em] opacity-40">JPG, PNG • Max 2MB</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
        </div>
      </div>

      <div className="bg-navy/3 border border-navy/10 rounded-[40px] p-8 space-y-6 relative overflow-hidden group">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-navy/5 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
            <Globe size={20} />
          </div>
          <div>
              <h4 className="font-black text-navy text-xs uppercase tracking-widest">Catálogo Público</h4>
              <p className="text-[9px] font-bold text-navy/40 uppercase tracking-tight">Tu vitrina 24/7</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-navy/10 space-y-4 shadow-sm relative z-10 transition-transform group-hover:translate-y-[-2px]">
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-secondary/60">Identificador Personalizado</p>
            <div className="flex items-center justify-between gap-2 overflow-hidden">
              <span className="text-xs font-black text-navy truncate">koda.app/{slug}</span>
              <button type="button" onClick={onCopyLink} className="p-2 hover:bg-navy/5 text-navy rounded-lg transition-all shrink-0"><Copy size={14} /></button>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => window.open(`https://koda.app/${slug}`, '_blank')}
            className="w-full py-2.5 rounded-xl border border-navy/20 text-navy text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-navy hover:text-white transition-all"
          >
            <ExternalLink size={12} /> Visitar Catálogo
          </button>
        </div>

        <div className="flex items-start gap-3 p-4 bg-navy/5 rounded-2xl border border-navy/10 relative z-10">
            <ShieldCheck size={16} className="text-navy shrink-0 mt-0.5" />
            <p className="text-[9px] font-bold text-navy/60 leading-relaxed uppercase tracking-tight">
              Tu catálogo se sincroniza en tiempo real con tu inventario. Lo que vendes aquí, se descuenta allá.
            </p>
        </div>
      </div>
    </div>
  );
}
