'use client';

import { useState } from 'react';
import { ArrowLeft, Package, Layers, Plus, Edit3, Trash2, Tag, MoreVertical, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  product: any;
  onBack: () => void;
  onAddVariant: () => void;
  onEditVariant: (variant: any) => void;
  onDeleteVariant: (id: string) => void;
  onUpdateStock: (variantId: string, newStock: number) => Promise<any>;
}

export default function ProductDetail({ 
  product, 
  onBack, 
  onAddVariant, 
  onEditVariant, 
  onDeleteVariant,
  onUpdateStock
}: ProductDetailProps) {
  const router = useRouter();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStockBadge = (v: any) => {
    const stock = v.inventories?.[0]?.stock || 0;
    if (stock === 0) return <span className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">Sin Stock</span>;
    if (stock < 5) return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">Stock Bajo</span>;
    return <span className="px-2.5 py-1 bg-success/10 text-success border border-success/20 text-[10px] font-black uppercase tracking-widest rounded-full">{stock} uds.</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      
      {/* Header */}
      <header className="flex items-start gap-4">
        <button 
          onClick={onBack}
          className="w-11 h-11 mt-1 rounded-2xl bg-background-elevated border border-foreground/8 flex items-center justify-center hover:bg-foreground/8 hover:border-contrast/30 transition-all shrink-0 active:scale-95"
          aria-label="Volver"
        >
          <ArrowLeft size={18} className="text-foreground-muted" />
        </button>

        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center shrink-0">
              <Package size={22} className="text-contrast" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-primary tracking-tight truncate">{product.name}</h2>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shrink-0 ${product.isPublic ? 'bg-success/10 text-success border-success/20' : 'bg-foreground/5 text-foreground-muted border-foreground/10'}`}>
                  {product.isPublic ? 'Público' : 'Privado'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Tag size={12} className="text-contrast" />
                <p className="text-foreground-muted font-bold text-xs uppercase tracking-wider">{product.category?.name}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onAddVariant}
            className="w-fit flex items-center gap-2 px-5 py-3 rounded-2xl bg-contrast text-white font-black text-sm hover:bg-contrast-hover active:scale-95 transition-all shadow-lg shadow-contrast/20 whitespace-nowrap shrink-0"
          >
            <Plus size={15} /> Nueva Variante
          </button>
        </div>
      </header>

      {/* Variants section */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-black text-primary tracking-tight">Variantes</h3>
          <span className="bg-contrast/10 border border-contrast/20 text-contrast px-3 py-1 rounded-full text-xs font-black">{product.variants?.length || 0}</span>
        </div>

        {product.variants?.length === 0 ? (
          <div className="py-20 text-center space-y-4 border-2 border-dashed border-foreground/8 rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center mx-auto">
              <Layers size={28} className="text-contrast/40" />
            </div>
            <p className="text-foreground-muted font-medium text-sm">Añade tallas, colores o modelos para empezar a vender.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {product.variants.map((v: any) => (
              <article 
                key={v.variantId} 
                className="bg-background-elevated border border-foreground/8 rounded-3xl hover:border-contrast/30 hover:shadow-xl hover:shadow-contrast/5 transition-all duration-300 group relative flex flex-col"
                style={{ zIndex: activeMenuId === v.variantId ? 50 : 'auto' }}
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 -top-10 -right-10 w-32 h-32 bg-contrast/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Image with padding + rounded corners */}
                <div className="relative w-full p-3 pb-0">
                  <div className="relative w-full aspect-4/3 bg-background rounded-2xl overflow-hidden">
                    {v.images?.[0] ? (
                      <img 
                        src={v.images[0].content} 
                        alt={v.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <Layers size={24} className="text-foreground-muted/20" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted/30">Sin imagen</span>
                      </div>
                    )}
                    {/* Stock badge */}
                    <div className="absolute top-2 left-2">{getStockBadge(v)}</div>
                  </div>
                </div>

                {/* Content + menu */}
                <div className="p-4 space-y-3 relative z-10 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-base font-black text-primary group-hover:text-contrast transition-colors duration-300 truncate">{v.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">{v.sku || 'Sin SKU'}</p>
                    </div>
                    
                    {/* Three-dot menu */}
                    <div className="relative shrink-0">
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
                          <div className="absolute right-0 mt-1 w-52 bg-background-elevated border border-foreground/10 rounded-2xl shadow-2xl shadow-black/40 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-200">
                            <button 
                              onClick={() => { onEditVariant(v); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-primary hover:bg-foreground/5 rounded-xl transition-all"
                            >
                              <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0"><Edit3 size={13} /></div>
                              Editar Variante
                            </button>
                            <button 
                              onClick={() => { router.push(`/dashboard/business/inventory?search=${v.sku}`); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-primary hover:bg-foreground/5 rounded-xl transition-all"
                            >
                              <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0"><ClipboardList size={13} /></div>
                              Ver en Inventario
                            </button>
                            <div className="h-px bg-foreground/5 mx-2 my-1" />
                            <button 
                              onClick={() => { onDeleteVariant(v.variantId); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/8 rounded-xl transition-all"
                            >
                              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0"><Trash2 size={13} /></div>
                              Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-foreground/5 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Atributos</p>
                      <p className="font-bold text-primary text-xs uppercase">{v.color} • {v.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Precio</p>
                      <p className="font-black text-contrast text-sm">${Number(v.price).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}