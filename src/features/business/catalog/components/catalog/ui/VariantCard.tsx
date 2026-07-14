import { Layers, MoreVertical, Edit3, ClipboardList, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface VariantCardProps {
  v: any;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onEditVariant: (variant: any) => void;
  onDeleteVariant: (id: string) => void;
}

export default function VariantCard({ v, activeMenuId, setActiveMenuId, onEditVariant, onDeleteVariant }: VariantCardProps) {
  const router = useRouter();

  const getStockBadge = (v: any) => {
    const stock = v.inventories?.[0]?.stock || 0;
    if (stock === 0) return <span className="px-3 py-1.5 bg-red-500 text-white shadow-md text-xs font-bold rounded-xl">Sin stock</span>;
    if (stock < 5) return <span className="px-3 py-1.5 bg-amber-500 text-white shadow-md text-xs font-bold rounded-xl">Stock bajo</span>;
    return <span className="px-3 py-1.5 bg-success text-white shadow-md text-xs font-bold rounded-xl">{stock} uds.</span>;
  };

  return (
    <article
      className="bg-background-elevated border border-foreground/8 rounded-3xl hover:border-contrast/30 hover:shadow-xl hover:shadow-contrast/5 transition-all duration-300 group relative flex flex-col"
      style={{ zIndex: activeMenuId === v.variantId ? 50 : 'auto' }}
    >
      <div className="absolute inset-0 -top-10 -right-10 w-32 h-32 bg-contrast/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <figure className="relative w-full p-3 pb-0 m-0">
        <div className="relative w-full aspect-4/3 bg-background rounded-2xl overflow-hidden">
          {v.images?.[0] ? (
            <Image
              src={v.images[0].content}
              alt={v.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <Layers size={24} className="text-foreground-muted/20" />
              <span className="text-xs font-medium text-foreground-muted/50">Sin imagen</span>
            </div>
          )}
          <div className="absolute top-2 left-2">{getStockBadge(v)}</div>
        </div>
      </figure>

      <div className="p-4 space-y-3 relative z-10 flex-1 flex flex-col">
        <header className="flex items-start justify-between gap-2">
          <hgroup className="min-w-0">
            <h4 className="text-base font-bold text-primary group-hover:text-contrast transition-colors duration-300 truncate">{v.name}</h4>
            <p className="text-sm font-medium text-foreground/60">{v.sku || 'Sin SKU'}</p>
          </hgroup>

          <nav className="relative shrink-0" aria-label="Opciones de variante">
            <button
              onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === v.variantId ? null : v.variantId); }}
              className="p-1.5 rounded-xl hover:bg-foreground/8 text-foreground-muted hover:text-primary transition-colors"
              aria-label="Más opciones"
            >
              <MoreVertical size={16} />
            </button>

            {activeMenuId === v.variantId && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                <nav className="absolute right-0 bottom-full mb-2 w-52 bg-background-elevated border border-foreground/10 rounded-2xl shadow-2xl shadow-black/40 p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={() => { onEditVariant(v); setActiveMenuId(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary hover:bg-foreground/5 rounded-xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0"><Edit3 size={14} /></div>
                    Editar variante
                  </button>
                  <button
                    onClick={() => { router.push(`/dashboard/business/inventory?search=${v.sku}`); setActiveMenuId(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary hover:bg-foreground/5 rounded-xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0"><ClipboardList size={14} /></div>
                    Ver en inventario
                  </button>
                  <div className="h-px bg-foreground/5 mx-2 my-1" />
                  <button
                    onClick={() => { onDeleteVariant(v.variantId); setActiveMenuId(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/8 rounded-xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0"><Trash2 size={14} /></div>
                    Eliminar
                  </button>
                </nav>
              </>
            )}
          </nav>
        </header>

        <footer className="pt-3 border-t border-foreground/5 flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs font-medium text-foreground/60 tracking-tight">Atributos</p>
            <p className="font-semibold text-primary text-sm capitalize">{v.color} • {v.size}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-foreground/60 tracking-tight">Precio</p>
            <p className="font-bold text-contrast text-base">${Number(v.price).toLocaleString()}</p>
          </div>
        </footer>
      </div>
    </article>
  );
}
