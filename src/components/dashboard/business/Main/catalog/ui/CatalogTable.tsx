import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Trash2, Image as ImageIcon, Plus, Package, MoreVertical, Tag } from 'lucide-react';

export default function CatalogTable({ 
    products, 
    expandedProducts, 
    onToggleExpand, 
    onAddVariant, 
    onEditProduct, 
    onDeleteProduct, 
    onEditVariant, 
    onDeleteVariant 
}) {
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    // Click outside to close menu
    useEffect(() => {
        const handleClickOutside = () => setActiveMenuId(null);
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 opacity-50 space-y-4 bg-background-elevated rounded-[28px] border border-foreground/5">
                <Package size={48} className="text-foreground-muted" />
                <p className="text-md font-medium tracking-wider text-foreground-muted">
                    No se encontraron productos
                </p>
            </div>
        );
    }

    return (
        <section className="catalog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {products.map((product) => {
                const isMenuOpen = activeMenuId === product.productId;
                const variantCount = product.variants?.length || 0;

                return (
                    <article 
                        key={product.productId}
                        className="catalog-card bg-background-elevated border border-foreground/8 rounded-[28px] p-6 flex flex-col gap-5 hover:border-contrast/30 hover:shadow-xl hover:shadow-contrast/5 transition-all duration-300 relative group"
                    >
                        {/* Ambient glow */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-contrast/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Top row */}
                        <div className="flex items-start justify-between relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                                <Package size={22} className="text-foreground-muted group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-success/10 text-success text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-success/20 shadow-sm">
                                    Público
                                </span>
                                <div className="relative">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(isMenuOpen ? null : product.productId); }}
                                        className="p-2 rounded-xl hover:bg-foreground/8 text-foreground-muted hover:text-primary transition-colors"
                                    >
                                        <MoreVertical size={18} />
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-background-elevated border border-foreground/10 rounded-2xl shadow-2xl shadow-black/40 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-200">
                                            <button onClick={() => { onEditProduct(product); setActiveMenuId(null); }} className="w-full px-4 py-3.5 flex items-center gap-3 text-sm font-bold text-primary hover:bg-foreground/5 rounded-xl transition-colors">
                                                <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center"><Edit3 size={14} /></div>
                                                Editar Producto
                                            </button>
                                            <button onClick={() => { onAddVariant(product.productId); setActiveMenuId(null); }} className="w-full px-4 py-3.5 flex items-center gap-3 text-sm font-bold text-contrast hover:bg-contrast/10 rounded-xl transition-colors">
                                                <div className="w-7 h-7 rounded-lg bg-contrast/10 flex items-center justify-center"><Plus size={14} /></div>
                                                Añadir Variante
                                            </button>
                                            <button onClick={() => { onDeleteProduct(product.productId); setActiveMenuId(null); }} className="w-full px-4 py-3.5 flex items-center gap-3 text-sm font-bold text-red-400 hover:bg-red-500/8 rounded-xl transition-colors">
                                                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center"><Trash2 size={14} /></div>
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Middle row */}
                        <div className="flex-1 space-y-1 relative z-10">
                            <h3 className="font-black text-primary text-xl leading-tight tracking-tight group-hover:text-contrast transition-colors truncate">
                                {product.name}
                            </h3>
                            {product.description && (
                                <p className="text-foreground-muted text-sm font-medium line-clamp-2 leading-relaxed mt-2">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-foreground-muted relative z-10">
                            <Tag size={12} className="text-foreground-muted/60" />
                            <span>{product.category.name}</span>
                            <span className="text-foreground-muted/30">•</span>
                            <span>{product.gender}</span>
                        </div>

                        {/* Bottom row (Variants) */}
                        <div className="border-t border-foreground/5 pt-4 mt-1 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                {variantCount > 0 ? (
                                    <>
                                        <div className="flex -space-x-2">
                                            {product.variants.slice(0, 3).map((v, i) => (
                                                <div key={v.variantId} className="w-8 h-8 rounded-full bg-background border-2 border-background-elevated overflow-hidden flex items-center justify-center relative shadow-sm" style={{ zIndex: 10 - i }}>
                                                    {v.image ? (
                                                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon size={12} className="text-foreground-muted/50" />
                                                    )}
                                                </div>
                                            ))}
                                            {variantCount > 3 && (
                                                <div className="w-8 h-8 rounded-full bg-foreground/5 border-2 border-background-elevated flex items-center justify-center relative z-0">
                                                    <span className="text-[10px] font-bold text-primary">+{variantCount - 3}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-primary font-black text-sm leading-none">{variantCount}</span>
                                            <span className="text-foreground-muted text-[10px] uppercase tracking-widest font-bold">Variantes</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                        <span className="text-foreground-muted text-[10px] uppercase tracking-widest font-bold">Sin variantes</span>
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => onToggleExpand(product.productId)}
                                className={`text-xs font-bold transition-colors ${expandedProducts[product.productId] ? 'text-contrast' : 'text-foreground-muted hover:text-primary'}`}
                            >
                                {expandedProducts[product.productId] ? 'Ocultar' : 'Ver Detalles'}
                            </button>
                        </div>

                        {/* Expanded Variants details */}
                        {expandedProducts[product.productId] && variantCount > 0 && (
                            <div className="mt-2 pt-4 border-t border-foreground/5 relative z-10 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                {product.variants.map((v) => (
                                    <div key={v.variantId} className="flex gap-4 p-3 rounded-2xl bg-background border border-foreground/5 hover:border-contrast/20 transition-all group/var">
                                        <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 bg-foreground/5 flex items-center justify-center border border-foreground/5">
                                            {v.image ? (
                                                <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <ImageIcon className="h-5 w-5 text-foreground-muted/30" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-center">
                                            <p className="text-xs font-bold text-primary truncate uppercase tracking-tight">{v.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-primary font-black text-sm leading-none">${Number(v.price).toLocaleString('es-CO')}</span>
                                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-foreground/5 text-foreground-muted font-bold uppercase tracking-widest border border-foreground/5 truncate">{v.color} - {v.size}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 opacity-0 group-hover/var:opacity-100 transition-opacity">
                                            <button onClick={() => onEditVariant(product.productId, v)} className="p-1.5 rounded-lg text-foreground-muted hover:text-primary hover:bg-foreground/5"><Edit3 size={12} /></button>
                                            <button onClick={() => onDeleteVariant(v.variantId)} className="p-1.5 rounded-lg text-foreground-muted hover:text-red-400 hover:bg-red-500/10"><Trash2 size={12} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </article>
                );
            })}
        </section>
    );
}
