import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

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
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-foreground/5 flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">
          Carrito ({cart.length})
        </h3>
        {cart.length > 0 && (
          <button 
            onClick={clearCart} 
            className="text-[9px] font-bold text-red-500 hover:underline uppercase tracking-tighter"
          >
            Vaciar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {cart.map((item) => (
          <div key={item.variantId} className="flex items-center gap-3 animate-in slide-in-from-right-4 duration-300">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm shrink-0 border border-foreground/5">
              <img src={item.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-primary truncate uppercase">{item.productName}</p>
              <p className="text-[9px] font-bold text-secondary tracking-widest uppercase opacity-60">
                ${item.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-foreground/5 shadow-sm">
              <button 
                onClick={() => updateQuantity(item.variantId, -1)} 
                className="p-1 hover:bg-foreground/5 rounded text-secondary transition-colors"
              >
                <Minus size={10} />
              </button>
              <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.variantId, 1)} 
                className="p-1 hover:bg-foreground/5 rounded text-secondary transition-colors"
              >
                <Plus size={10} />
              </button>
            </div>
            <button 
              onClick={() => removeFromCart(item.variantId)} 
              className="p-2 text-secondary/40 hover:text-red-500 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
