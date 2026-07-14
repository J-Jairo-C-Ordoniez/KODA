'use client';

import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
  variantId: string;
  name: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartListProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export default function CartList({ cart, updateQuantity, removeFromCart, clearCart }: CartListProps) {
  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag size={14} className="text-contrast" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">
            Carrito <span className="text-foreground-muted ml-1">({cart.length})</span>
          </h3>
        </div>
        {cart.length > 0 && (
          <button 
            onClick={clearCart} 
            className="text-[9px] font-black text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            Vaciar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-10">
            <ShoppingBag size={40} className="mb-2" />
            <p className="text-[10px] font-black uppercase tracking-widest">Sin productos</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.variantId} className="flex items-center gap-3 animate-in slide-in-from-right-4 duration-300">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-background-elevated shrink-0 border border-white/5">
                <img src={item.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-primary truncate uppercase tracking-tight">{item.productName}</p>
                <p className="text-[10px] font-bold text-contrast tracking-widest uppercase mt-0.5">
                  ${item.price.toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-background-elevated rounded-xl p-1 border border-white/5">
                <button 
                  onClick={() => updateQuantity(item.variantId, -1)} 
                  className="w-6 h-6 flex items-center justify-center hover:bg-foreground/5 rounded-lg text-foreground-muted transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-xs font-black w-4 text-center text-primary">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.variantId, 1)} 
                  className="w-6 h-6 flex items-center justify-center hover:bg-foreground/5 rounded-lg text-foreground-muted transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(item.variantId)} 
                className="p-2 text-foreground-muted/30 hover:text-red-500 transition-colors"
                title="Quitar"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
