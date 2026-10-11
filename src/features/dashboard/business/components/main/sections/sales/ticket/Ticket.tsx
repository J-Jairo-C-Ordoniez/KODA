'use client';

import Button from '@/shared/components/Button';
import TicketCard from '@/features/dashboard/business/components/main/sections/sales/ticket/ui/TicketCard';
import { ShoppingBagIcon } from '@phosphor-icons/react';
import { formatCurrency } from '@/lib/formatters';
import type { HydratedCartItem } from '@/features/dashboard/business/hooks/useSalesPOS';

interface ActiveCartTicketProps {
    items?: HydratedCartItem[];
    totalItems?: number;
    subtotal?: number;
    onUpdateQuantity: (variantId: string, quantity: number) => void;
    onRemoveItem: (variantId: string) => void;
    onClearCart: () => void;
    onOpenCheckout: () => void;
}

export default function ActiveCartTicket({ items = [], totalItems = 0, subtotal = 0, onUpdateQuantity, onRemoveItem, onClearCart, onOpenCheckout, }: ActiveCartTicketProps) {
    return (
        <aside className="flex h-full flex-col justify-between rounded-3xl border border-primary/10 bg-background/80 p-4 shadow-sm md:rounded-4xl sm:p-6">
            <header>
                <article className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                        <span className="rounded-xl bg-primary p-2 text-background">
                            <ShoppingBagIcon size={20} weight="fill" />
                        </span>
                        <div>
                            <h3 className="text-base font-medium leading-relaxed text-foreground/75 sm:text-md">
                                Ticket Activo
                            </h3>
                            <p className="text-sm font-medium leading-relaxed text-foreground/50">
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
                        <h4 className="text-base font-medium leading-relaxed text-foreground/75 sm:text-md">
                            El carrito está vacío
                        </h4>
                        <p className="my-2 max-w-md text-sm font-medium leading-relaxed text-foreground/50">
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

            <footer className="mt-4 space-y-4 border-t border-primary/10 pt-4">
                <div className="space-y-1.5">
                    <div className="flex justify-between pb-4 text-sm font-medium leading-relaxed text-foreground/50">
                        <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between border-t border-primary/10 pt-4 text-base font-medium leading-relaxed text-foreground/75 sm:text-md">
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
