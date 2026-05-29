import { ArrowLeft, Package, Plus, Tag } from 'lucide-react';

interface ProductDetailHeaderProps {
  product: any;
  onBack: () => void;
  onAddVariant: () => void;
}

export default function ProductDetailHeader({ product, onBack, onAddVariant }: ProductDetailHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <nav aria-label="Navegación secundaria" className="flex items-center">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 px-3 py-2 -ml-3 rounded-xl hover:bg-foreground/5 transition-all active:scale-95 text-foreground-muted hover:text-primary"
          aria-label="Volver al catálogo"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm hidden sm:inline">Volver al catálogo</span>
        </button>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <section className="flex items-center gap-4 min-w-0" aria-label="Información del producto">
          <figure className="w-14 h-14 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center shrink-0 m-0">
            <Package size={26} className="text-contrast" />
          </figure>
          <hgroup className="min-w-0 space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-primary tracking-tight truncate">{product.name}</h2>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border shrink-0 ${product.isPublic ? 'bg-success/10 text-success border-success/20' : 'bg-foreground/5 text-foreground-muted border-foreground/10'}`}>
                {product.isPublic ? 'Público' : 'Privado'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-foreground/50" />
              <p className="text-foreground/70 font-medium text-sm tracking-tight">{product.category?.name}</p>
            </div>
          </hgroup>
        </section>

        <button
          onClick={onAddVariant}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-contrast text-white font-bold text-sm hover:bg-contrast-hover active:scale-95 transition-all shadow-lg shadow-contrast/20"
        >
          <Plus size={16} /> Nueva variante
        </button>
      </div>
    </header>
  );
}
