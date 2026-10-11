'use client';

import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react';
import { formatCurrency } from '@/lib/formatters';
import type { HydratedCartItem } from '@/features/dashboard/business/hooks/useSalesPOS';

interface TicketCardProps {
    item: HydratedCartItem;
    onUpdateQuantity: (variantId: string, quantity: number) => void;
    onRemoveItem: (variantId: string) => void;
}

export default function TicketCard({ item, onUpdateQuantity, onRemoveItem }: TicketCardProps) {
    return (
        <article className="flex items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-background p-3 transition-all hover:border-primary/20">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-primary/10 bg-background">
                    <Image
                        src={item.image}
                        alt={item.variantName}
                        fill
                        sizes="44px"
                        className="object-contain p-1"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium leading-relaxed text-foreground/75">
                        {item.productName} · {item.variantName}
                    </h4>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/50">
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
                    <MinusIcon size={12} weight="bold" />
                </button>
                <span className="w-6 text-center font-mono text-xs font-bold text-primary">
                    {item.quantity}
                </span>
                <button
                    onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-background border border-primary/10 hover:bg-foreground-muted/60 text-primary flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                >
                    <PlusIcon size={12} weight="bold" />
                </button>
                <button
                    onClick={() => onRemoveItem(item.variantId)}
                    className="w-7 h-7 rounded-lg text-primary/40 hover:text-accent-red hover:bg-accent-red/10 flex items-center justify-center transition-colors cursor-pointer ml-1"
                    title="Eliminar de ticket"
                >
                    <TrashIcon size={18} />
                </button>
            </div>
        </article>
    )
}
