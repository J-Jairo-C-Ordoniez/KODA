import React from 'react';
import { Search, Plus, AlertCircle, ShoppingCart } from 'lucide-react';

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
        <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">
          Buscar Productos
        </label>
        <div className="relative group">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" 
            size={18} 
          />
          <input 
            type="text" 
            placeholder="Nombre, producto o SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-foreground/5 border-2 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {searchTerm && filteredVariants.length === 0 && (
          <div className="py-12 text-center text-secondary opacity-50 space-y-2">
            <AlertCircle size={32} className="mx-auto opacity-20" />
            <p className="text-xs font-medium">No se encontraron resultados</p>
          </div>
        )}

        {!searchTerm && cartLength === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto text-secondary/20">
              <ShoppingCart size={28} />
            </div>
            <p className="text-secondary font-semibold text-xs">Usa el buscador para añadir productos</p>
          </div>
        )}

        {filteredVariants.map((v: any) => (
          <button 
            key={v.variantId}
            onClick={() => addToCart(v)}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-foreground/5 bg-background hover:border-navy/30 hover:bg-navy/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-foreground/5 border border-foreground/5 shrink-0">
              {v.images?.[0] ? (
                <img src={v.images[0].content} className="w-full h-full object-cover" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] font-bold opacity-20">N/A</div>
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[10px] font-black text-primary truncate uppercase tracking-tight">
                {v.product?.name}
              </p>
              <p className="text-[9px] font-bold text-secondary uppercase tracking-widest opacity-60">
                {v.name} • {v.size}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-primary">${Number(v.price).toLocaleString()}</p>
              <Plus size={14} className="text-navy opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
