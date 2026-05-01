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
      className={`bg-background border border-foreground/5 rounded-3xl transition-all group relative flex flex-col cursor-pointer min-h-[300px] hover:shadow-xl hover:shadow-navy/5 hover:border-navy/10 ${activeMenuId === product.productId ? 'z-50' : 'z-10'}`}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
      </div>

      <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col relative z-10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
            <Package size={20} className="text-navy group-hover:text-white" />
          </div>
          <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
            <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${product.isPublic ? 'bg-green-50 text-green-600' : 'bg-foreground/5 text-secondary'}`}>
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
                  <div className="absolute right-0 mt-2 w-48 bg-background rounded-2xl shadow-2xl border border-foreground/5 p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                    <button 
                      onClick={() => onEdit(product)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-secondary hover:text-navy hover:bg-navy/5 rounded-xl transition-all"
                    >
                      <Edit3 size={16} /> Editar Producto
                    </button>
                    <button 
                      onClick={() => onDelete(product)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-black text-primary group-hover:text-navy transition-colors tracking-tight">{product.name}</h3>
          <p className="text-secondary text-xs font-medium line-clamp-2 leading-relaxed opacity-70">{product.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Tag size={12} className="text-navy" />
              <span className="text-xs font-black text-secondary uppercase tracking-widest">{product.category?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-navy/20" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{product.gender}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {product.variants?.slice(0, 3).map((v: any) => (
                  <div key={v.variantId} className="w-8 h-8 rounded-full border-4 border-background bg-navy/10 flex items-center justify-center overflow-hidden shadow-sm">
                    {v.images?.[0] ? (
                      <img src={v.images[0].content} alt={v.name} className="w-full h-full object-cover" />
                    ) : (
                      <Layers size={12} className="text-navy" />
                    )}
                  </div>
                ))}
                {product.variants?.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-4 border-background bg-foreground/5 flex items-center justify-center text-xs font-black text-secondary shadow-sm">
                    +{product.variants.length - 3}
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-black text-primary leading-none">{product.variants?.length || 0}</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Variantes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
