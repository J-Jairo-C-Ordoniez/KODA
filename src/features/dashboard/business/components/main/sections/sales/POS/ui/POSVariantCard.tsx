'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/Button';
import { PackageIcon, PlusIcon, ProhibitIcon } from '@phosphor-icons/react';
import { formatCurrency } from '@/lib/formatters';
import type { POSVariant } from '@/features/dashboard/business/hooks/useSalesPOS';

interface POSVariantCardProps {
  variant: POSVariant;
  onAddToCart: (variantId: string) => void;
}

export default function POSVariantCard({ variant, onAddToCart }: POSVariantCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const isOutOfStock = variant.stock <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    onAddToCart(variant.variantId);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <article
      onClick={!isOutOfStock ? handleAdd : undefined}
      className={`group flex select-none flex-col justify-between rounded-3xl border border-primary/10 bg-background/80 p-4 shadow-sm transition-all duration-300 md:rounded-4xl sm:p-6 ${isOutOfStock
        ? 'opacity-60 cursor-not-allowed'
        : `hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${isAdding ? 'scale-[0.97] shadow-inner' : ''}`
        }`}
    >
      <header className="mb-3 flex items-start justify-end">
        <span className={`rounded-full px-2 py-0.5 text-base font-semibold leading-relaxed ${isOutOfStock
          ? 'text-red-600'
          : variant.stock <= 3 ? 'text-amber-600' : 'text-emerald-600'
          }`}>
          {isOutOfStock ? 'Agotado' : `${variant.stock} disponibles`}
        </span>
      </header>

      <div className="relative aspect-[4/3] w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
        {variant.primaryImage && variant.primaryImage !== '/placeholder-product.png' ? (
          <Image
            src={variant.primaryImage}
            alt={variant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-primary/25">
            <PackageIcon size={44} weight="light" />
            <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] rounded-xl flex flex-col items-center justify-center gap-1">
            <ProhibitIcon size={28} className="text-red-400" weight="regular" />
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Sin stock</span>
          </div>
        )}

        {/* Add-to-cart animation overlay */}
        {isAdding && !isOutOfStock && (
          <div className="absolute inset-0 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center shadow-lg">
              <PlusIcon size={20} weight="bold" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-1 flex-col justify-between border-t border-primary/10 pt-2">
        <div className="mb-4 space-y-1">
          <p className="text-sm font-medium leading-relaxed text-foreground/50">
            {variant.sku || 'Sin SKU'}
          </p>
          <h3 className="text-base font-medium leading-relaxed text-foreground/75 transition-colors group-hover:text-secondary sm:text-md">
            {variant.productName} · {variant.name}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-foreground/50">
            Color {variant.color || 'N/A'} · Talla {variant.size || 'N/A'}
          </p>
        </div>

        <div className="mt-2 flex items-end justify-between gap-3 border-t border-primary/10 pt-2">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-relaxed text-foreground/50">Precio</h4>
            <p className="text-base font-bold leading-relaxed text-primary sm:text-lg md:text-2xl">
              {formatCurrency(Number(variant.price))}
            </p>
          </div>

          <Button
            variant='primary'
            onClick={e => { e.stopPropagation(); handleAdd(); }}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Sin stock disponible' : 'Agregar al carrito'}
          >
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}
