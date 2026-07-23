'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { HydratedCartItem } from '@/features/dashboard/business/hooks/useSalesPOS';

interface ActiveCartTicketProps {
  items: HydratedCartItem[];
  totalItems: number;
  subtotal: number;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export default function ActiveCartTicket({
  items,
  totalItems,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}: ActiveCartTicketProps) {
  return (
    <aside className="bg-background-card border border-primary/8 rounded-2xl p-5 flex flex-col h-full justify-between shadow-xs">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-primary/8 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary text-background">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Ticket Activo</h3>
              <p className="text-xs text-primary/50 font-medium">
                {totalItems} item{totalItems !== 1 ? 's' : ''} en carrito
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs font-semibold text-primary/45 hover:text-accent-red transition-colors p-1 cursor-pointer"
              title="Vaciar carrito"
            >
              Vaciar
            </button>
          )}
        </div>

        {/* Item List */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 text-primary/40">
            <ShoppingBag size={40} strokeWidth={1.25} className="mb-3" />
            <p className="text-sm font-semibold">El carrito está vacío</p>
            <p className="text-xs mt-1 max-w-[200px] text-primary/40">
              Haz clic en cualquier variante del catálogo para agregarla al ticket.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
            {items.map(item => (
              <div
                key={item.variantId}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-foreground-muted/30 border border-primary/5 hover:border-primary/10 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative w-11 h-11 rounded-lg bg-background border border-primary/5 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.variantName}
                      fill
                      sizes="44px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-primary truncate leading-tight">
                      {item.productName} · {item.variantName}
                    </h4>
                    <p className="text-[11px] font-medium text-primary/50 mt-0.5">
                      {formatCurrency(item.price)} c/u
                    </p>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-background border border-primary/10 hover:bg-foreground-muted/60 text-primary flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center font-mono text-xs font-bold text-primary">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-background border border-primary/10 hover:bg-foreground-muted/60 text-primary flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.variantId)}
                    className="w-7 h-7 rounded-lg text-primary/40 hover:text-accent-red hover:bg-accent-red/10 flex items-center justify-center transition-colors cursor-pointer ml-1"
                    title="Eliminar de ticket"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Calculation & Checkout Button */}
      <div className="border-t border-primary/8 pt-4 mt-4 space-y-4">
        <div className="space-y-1.5 text-xs font-semibold">
          <div className="flex justify-between text-primary/60">
            <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-primary/5">
            <span>Total a cobrar</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <button
          onClick={onOpenCheckout}
          disabled={items.length === 0}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          Cobrar · {formatCurrency(subtotal)} <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}
