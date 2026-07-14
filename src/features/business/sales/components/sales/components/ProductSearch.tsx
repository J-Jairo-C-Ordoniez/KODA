'use client';

import React from 'react';
import { Search, Plus, AlertCircle, ShoppingCart, Tag } from 'lucide-react';

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredVariants: any[];
  addToCart: (variant: any) => void;
  cartLength: number;
}

export default function ProductSearch({ 
  searchTerm, 
  setSearchTerm, 
  filteredVariants, 
  addToCart,
  cartLength 
}: ProductSearchProps) {
  return (
    <div className="flex-1 flex flex-col space-y-4 h-full">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted ml-1">
          Buscar Productos
        </label>
        <div className="relative group">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors" 
            size={18} 
          />
          <input 
            type="text" 
            placeholder="Nombre, producto o SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-background border border-foreground/10 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm placeholder:text-foreground-muted/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {searchTerm && filteredVariants.length === 0 && (
          <div className="py-12 text-center text-foreground-muted opacity-50 space-y-2">
            <AlertCircle size={32} className="mx-auto opacity-20" />
            <p className="text-xs font-medium">No se encontraron resultados</p>
          </div>
        )}

        {!searchTerm && cartLength === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto text-foreground-muted/20">
              <ShoppingCart size={28} />
            </div>
            <p className="text-foreground-muted font-bold text-xs uppercase tracking-widest">Usa el buscador para añadir productos</p>
          </div>
        )}

        {filteredVariants.map((v: any) => (
          <button 
            key={v.variantId}
            onClick={() => addToCart(v)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl border border-foreground/5 bg-background-elevated hover:border-contrast/30 hover:shadow-lg hover:shadow-contrast/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-background border border-foreground/8 shrink-0 flex items-center justify-center">
              {v.images?.[0] ? (
                <img src={v.images[0].content} className="w-full h-full object-cover" alt="" />
              ) : (
                <Tag size={16} className="text-foreground-muted/20" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[11px] font-black text-primary truncate uppercase tracking-tight group-hover:text-contrast transition-colors">
                {v.product?.name}
              </p>
              <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest mt-0.5">
                {v.name} • {v.size}
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <p className="text-sm font-black text-primary">${Number(v.price).toLocaleString()}</p>
              <div className="w-6 h-6 rounded-lg bg-contrast/10 text-contrast flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                <Plus size={14} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
