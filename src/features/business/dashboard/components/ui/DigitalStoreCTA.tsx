import { Share2, ArrowUpRight } from 'lucide-react';

interface DigitalStoreCTAProps {
  tenantSlug?: string;
  onShare: () => void;
}

export function DigitalStoreCTA({ tenantSlug, onShare }: DigitalStoreCTAProps) {
  return (
    <article className="ov-side bg-background-elevated border border-white/10 hover:border-contrast/30 p-6 rounded-3xl flex flex-col gap-5 transition-colors duration-300">
      <div>
        <p className="text-sm font-medium text-foreground/80 tracking-tight">Tu tienda digital</p>
        <p className="text-lg font-bold text-primary mt-1">Catálogo disponible al público</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onShare}
          aria-label="Compartir catálogo"
          className="flex-1 py-3 rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-white/5 text-primary text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <Share2 size={16} aria-hidden="true" /> Compartir
        </button>
        <a
          href={`/${tenantSlug || ''}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver mi tienda en una nueva pestaña"
          className="flex-1 py-3 rounded-xl bg-contrast text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-contrast-hover transition-colors active:scale-95"
        >
          <ArrowUpRight size={16} aria-hidden="true" /> Ver tienda
        </a>
      </div>
    </article>
  );
}
