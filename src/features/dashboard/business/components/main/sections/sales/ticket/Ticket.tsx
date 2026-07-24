'use client';

import Image from 'next/image';
import Button from '@/shared/components/Button';
import TicketCard from '@/features/dashboard/business/components/main/sections/sales/ticket/ui/TicketCard';
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

export default function ActiveCartTicket({ items, totalItems, subtotal, onUpdateQuantity, onRemoveItem, onClearCart, onOpenCheckout, }: ActiveCartTicketProps) {
    return (
        <aside className="bg-background-card border border-primary/8 rounded-2xl p-5 flex flex-col h-full justify-between shadow-xs">
            <header>
                <article className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-primary text-background">
                            <ShoppingBag size={18} />
                        </span>
                        <div>
                            <h3 className="text-lg font-medium text-primary tracking-tight">
                                Ticket Activo
                            </h3>
                            <p className="text-sm text-primary/60">
                                {totalItems} item{totalItems !== 1 ? 's' : ''} en carrito
                            </p>
                        </div>
                    </div>

                    {items.length > 0 && (
                        <Button
                            variant='secondary'
                            onClick={onClearCart}
                            title="Vaciar carrito"
                            className="px-2 py-1"
                            size='sm'
                        >
                            Vaciar
                        </Button>
                    )}
                </article>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12 text-primary/40">
                        <h4 className="text-lg font-medium text-primary tracking-tight">
                            El carrito está vacío
                        </h4>
                        <p className="text-sm text-primary/60 leading-relaxed max-w-md my-2">
                            Haz clic en cualquier variante del catálogo para agregarla al ticket.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-95 overflow-y-auto custom-scrollbar pr-1">
                        {items.map(item => (
                            <TicketCard
                                key={item.variantId}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemoveItem={onRemoveItem}
                            />
                        ))}
                    </div>
                )}
            </header>

            <footer className="border-t border-primary/10 pt-4 mt-4 space-y-4">
                <div className="space-y-1.5 text-xs font-semibold">
                    <div className="flex justify-between text-sm font-medium text-primary/60 tracking-tight pb-4">
                        <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-primary/8 text-lg font-medium text-primary tracking-tight">
                        <span>Total a cobrar</span>
                        <span className="text-xl font-bold text-primary">{formatCurrency(subtotal)}</span>
                    </div>
                </div>

                <Button
                    variant='primary'
                    onClick={onOpenCheckout}
                    disabled={items.length === 0}
                    className='w-full'
                >
                    Cobrar · {formatCurrency(subtotal)}
                </Button>
            </footer>
        </aside>
    );
}
