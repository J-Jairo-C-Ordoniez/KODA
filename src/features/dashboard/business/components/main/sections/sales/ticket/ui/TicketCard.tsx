'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { HydratedCartItem } from '@/features/dashboard/business/hooks/useSalesPOS';

interface TicketCardProps {
    item: HydratedCartItem;
    onUpdateQuantity: (variantId: string, quantity: number) => void;
    onRemoveItem: (variantId: string) => void;
}

export default function TicketCard({ item, onUpdateQuantity, onRemoveItem }: TicketCardProps) {
    return (
        <article className="flex items-center justify-between gap-3 p-3 rounded-xl bg-primary/2 border border-primary/5 hover:border-primary/10 transition-all">
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
                    <p className="text-xs font-medium text-primary/60 mt-1">
                        {formatCurrency(item.price)} c/u
                    </p>
                </div>
            </div>

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
                    <Trash2 size={18} />
                </button>
            </div>
        </article>
    )
}