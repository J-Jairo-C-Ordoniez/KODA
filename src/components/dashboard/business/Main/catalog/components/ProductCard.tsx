import React from 'react';
import { Package, MoreVertical, Edit3, Trash2, Tag, Layers } from 'lucide-react';

interface ProductCardProps {
  product: any;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onOpenDetail: (id: string) => void;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}

export default function ProductCard({ 
  product, 
  activeMenuId, 
  setActiveMenuId, 
  onOpenDetail, 
  onEdit, 
  onDelete 
}: ProductCardProps) {
  return (
    <article 
      onClick={() => onOpenDetail(product.productId)}
      className={`product-card bg-background-elevated border rounded-3xl transition-all duration-300 group relative flex flex-col cursor-pointer min-h-[300px] overflow-hidden
        hover:border-contrast/30 hover:shadow-xl hover:shadow-contrast/5
        ${activeMenuId === product.productId ? 'z-50 border-foreground/8' : 'z-10 border-foreground/8'}`}
    >
      {/* Ambient glow on hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-contrast/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col relative z-10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-contrast/10 border border-contrast/20 flex items-center justify-center group-hover:bg-contrast/20 transition-colors duration-300">
            <Package size={20} className="text-contrast" />
          </div>
          <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm ${product.isPublic ? 'bg-success/10 text-success border-success/20' : 'bg-foreground/5 text-secondary border-foreground/10'}`}>
              {product.isPublic ? 'Público' : 'Privado'}
            </span>
            
            <div className="relative">
              <button 
                onClick={() => setActiveMenuId(activeMenuId === product.productId ? null : product.productId)}
                className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
                aria-label="Más opciones"
              >
                <MoreVertical size={18} />
              </button>

              {activeMenuId === product.productId && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                  <div className="absolute right-0 mt-2 w-48 bg-background-elevated rounded-2xl shadow-2xl shadow-black/40 border border-foreground/10 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-200">
                    <button 
                      onClick={() => onEdit(product)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-primary hover:bg-foreground/5 rounded-xl transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center"><Edit3 size={14} /></div>
                      Editar
                    </button>
                    <button 
                      onClick={() => onDelete(product)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-400 hover:bg-red-500/8 rounded-xl transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center"><Trash2 size={14} /></div>
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-black text-primary group-hover:text-contrast transition-colors tracking-tight truncate">{product.name}</h3>
          <p className="text-foreground-muted text-sm font-medium line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-foreground-muted">
            <Tag size={12} className="text-foreground-muted/60" />
            <span>{product.category?.name}</span>
            <span className="text-foreground-muted/30">•</span>
            <span>{product.gender}</span>
          </div>

          <div className="pt-4 border-t border-foreground/5 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {product.variants?.slice(0, 3).map((v: any, i: number) => (
                  <div key={v.variantId} className="w-8 h-8 rounded-full border-2 border-background-elevated bg-background flex items-center justify-center overflow-hidden shadow-sm relative" style={{ zIndex: 10 - i }}>
                    {v.images?.[0] ? (
                      <img src={v.images[0].content} alt={v.name} className="w-full h-full object-cover" />
                    ) : (
                      <Layers size={12} className="text-foreground-muted/50" />
                    )}
                  </div>
                ))}
                {product.variants?.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-background-elevated bg-foreground/5 flex items-center justify-center text-[10px] font-bold text-primary shadow-sm relative z-0">
                    +{product.variants.length - 3}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-black text-primary leading-none">{product.variants?.length || 0}</p>
                <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Variantes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
