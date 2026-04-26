'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Package, Layers, Plus, Edit3, Trash2, Tag, Check, MoreVertical } from 'lucide-react';

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
  const [updatingStockId, setUpdatingStockId] = useState<string | null>(null);
  const [stockValues, setStockValues] = useState<Record<string, number>>({});
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Initialize stock values properly to avoid uncontrolled input error
  useEffect(() => {
    if (product.variants) {
      const initialStock: Record<string, number> = {};
      product.variants.forEach((v: any) => {
        initialStock[v.variantId] = v.inventories?.[0]?.stock || 0;
      });
      setStockValues(initialStock);
    }
  }, [product]);

  const handleStockChange = (variantId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setStockValues(prev => ({ ...prev, [variantId]: numValue }));
  };

  const saveStock = async (variantId: string) => {
    setUpdatingStockId(variantId);
    await onUpdateStock(variantId, stockValues[variantId] || 0);
    setUpdatingStockId(null);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-6">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[24px] bg-navy/10 flex items-center justify-center shadow-inner">
            <Package size={32} className="text-navy" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black text-primary tracking-tight">{product.name}</h2>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${product.isPublic ? 'bg-green-50 text-green-600' : 'bg-foreground/5 text-secondary'}`}>
                {product.isPublic ? 'Público' : 'Privado'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Tag size={14} className="text-navy" />
              <p className="text-secondary font-bold text-sm uppercase tracking-wider">{product.category?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description - CLEAN (No box as requested) */}
      <div className="space-y-2 max-w-3xl">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Descripción del Producto</h3>
        <p className="text-primary font-medium leading-relaxed text-lg">{product.description}</p>
      </div>

      {/* Variants Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-primary tracking-tight">Variantes</h3>
            <span className="bg-navy/10 text-navy px-3 py-1 rounded-full text-xs font-black">{product.variants?.length || 0}</span>
          </div>
          <button
            onClick={onAddVariant}
            className="px-8 py-4 rounded-2xl bg-navy text-white font-black text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-xl shadow-navy/20"
          >
            <Plus size={18} /> Nueva Variante
          </button>
        </div>

        {product.variants?.length === 0 ? (
           <div className="py-32 text-center space-y-4 border-2 border-dashed border-foreground/5 rounded-[60px] bg-foreground/[0.01]">
              <div className="w-24 h-24 rounded-[36px] bg-foreground/5 flex items-center justify-center mx-auto text-secondary/20">
                <Layers size={48} />
              </div>
              <p className="text-secondary font-medium">Agrega tallas, colores o modelos para empezar a vender.</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {product.variants.map((v: any) => (
              <div key={v.variantId} className="bg-background border border-foreground/5 rounded-[40px] p-8 space-y-5 hover:shadow-2xl hover:shadow-navy/10 transition-all group relative overflow-hidden flex flex-col">
                {/* Decorative Corner */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-foreground/[0.03] rounded-full group-hover:scale-110 transition-transform duration-700" />
                
                <div className="flex items-start justify-between relative z-10">
                  {/* Image Box - Larger Presence */}
                  <div className="w-24 h-24 rounded-[28px] bg-foreground/5 overflow-hidden border border-foreground/5 shadow-inner shrink-0">
                    {v.images?.[0] ? (
                      <img src={v.images[0].content} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary/20 italic text-[8px] font-bold uppercase">N/A</div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Stock Status Badge - Clickable to Inventory */}
                    <button 
                      onClick={() => window.location.href = `/dashboard/business/inventory?search=${v.sku}`}
                      className="transition-transform active:scale-95 cursor-pointer"
                      title="Ver en Inventario"
                    >
                      {(() => {
                        const stock = v.inventories?.[0]?.stock || 0;
                        if (stock === 0) return <span className="px-3 py-1 bg-red-50 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-red-100 transition-colors">Agotado</span>;
                        if (stock < 5) return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-amber-100 transition-colors">Bajo Stock</span>;
                        return <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-green-100 transition-colors">{stock} Uds.</span>;
                      })()}
                    </button>

                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === v.variantId ? null : v.variantId)}
                        className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenuId === v.variantId && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-0 mt-2 w-48 bg-background rounded-2xl shadow-2xl border border-foreground/5 p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                            <button 
                              onClick={() => { onEditVariant(v); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-secondary hover:text-navy hover:bg-navy/5 rounded-xl transition-all"
                            >
                              <Edit3 size={16} /> Editar Variante
                            </button>
                            <button 
                              onClick={() => { onDeleteVariant(v.variantId); setActiveMenuId(null); }}
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

                <div className="space-y-1 relative z-10">
                  <h4 className="text-xl font-black text-primary group-hover:text-navy transition-colors">{v.name}</h4>
                  <p className="text-secondary text-[10px] font-bold uppercase tracking-widest opacity-60">{v.sku || 'Sin SKU'}</p>
                </div>

                {/* Info Area - Compact horizontal */}
                <div className="pt-4 border-t border-foreground/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-secondary">Atributos</p>
                      <p className="font-bold text-primary text-xs uppercase">{v.color} • {v.size}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-navy/40">Precio</p>
                    <p className="font-black text-navy text-sm">${Number(v.price).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
