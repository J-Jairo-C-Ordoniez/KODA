'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/Button';
import { Package, Plus, Ban } from 'lucide-react';
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
      className={`bg-background-card border border-primary/8 p-5 rounded-2xl transition-all duration-200 group flex flex-col justify-between select-none ${isOutOfStock
        ? 'opacity-60 cursor-not-allowed'
        : `hover:shadow-md cursor-pointer ${isAdding ? 'scale-[0.97] shadow-inner' : ''}`
        }`}
    >
      <div className="relative aspect-square w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
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
            <Package size={44} strokeWidth={1.25} />
            <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] rounded-xl flex flex-col items-center justify-center gap-1">
            <Ban size={28} className="text-red-400" strokeWidth={1.5} />
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Sin stock</span>
          </div>
        )}

        {/* Add-to-cart animation overlay */}
        {isAdding && !isOutOfStock && (
          <div className="absolute inset-0 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center shadow-lg">
              <Plus size={20} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between border-t border-primary/10 pt-4">
        <header className="mb-4 space-y-2">
          <p className="text-sm font-semibold uppercase text-primary/60">
            {variant.sku || 'Sin SKU'}
          </p>
          <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
            {variant.productName} · {variant.name}
          </h3>
          <p className="text-sm text-primary/60">
            Color {variant.color || 'N/A'} · Talla {variant.size || 'N/A'}
          </p>
        </header>

        <div className="pt-4 border-t border-primary/10 flex items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-semibold uppercase text-primary/60">
                Stock
              </h4>
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${isOutOfStock
                  ? 'text-red-600 bg-red-50 border border-red-100'
                  : variant.stock <= 3
                    ? 'text-amber-700 bg-amber-50 border border-amber-100'
                    : 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                  }`}
              >
                {isOutOfStock ? 'Agotado' : `${variant.stock} disp.`}
              </span>
            </div>

            <p className="text-2xl font-bold tracking-tight text-primary">
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
