'use client';

import { Package } from 'lucide-react';
import type { Variant } from '@/features/dashboard/business/api/products.api';
import { formatCurrency } from '@/lib/formatters';
import Image from 'next/image';

interface ReadOnlyVariantCardProps {
  variant: Variant;
  productName: string;
}

function getCurrentStock(variant: Variant) {
  return variant.inventories?.[0]?.stock ?? variant.stock ?? 0;
}

export default function ReadOnlyVariantCard({ variant, productName }: ReadOnlyVariantCardProps) {
  const currentStock = getCurrentStock(variant);

  const primaryImage = variant.images?.find(image => image.isPrimary)?.content
    || variant.images?.[0]?.content
    || '/placeholder-product.png';

  return (
    <article
      className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between"
    >
      <div className="relative aspect-square w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
        {primaryImage !== '/placeholder-product.png' ? (
          <Image
            src={primaryImage}
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

        <span className={`absolute right-3 top-3 text-xs font-bold px-2.5 py-1 rounded-lg border backdrop-blur-xs ${
          variant.isActive
            ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
            : 'text-primary/60 bg-primary/2 border-primary/8'
        }`}>
          {variant.isActive ? 'Activo' : 'Pausado'}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between border-t border-primary/10 pt-4">
        <header className="mb-4 space-y-2">
          <p className="text-sm font-semibold uppercase text-primary/60">
            {variant.sku || 'Sin SKU'}
          </p>
          <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
            {productName} · {variant.name}
          </h3>
          <p className="text-sm text-primary/60">
            Color {variant.color || 'N/A'} · Talla {variant.size || 'N/A'}
          </p>
        </header>

        <div className="pt-4 border-t border-primary/10 flex items-end justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold uppercase text-primary/60">
              Precio
            </h4>
            <p className="text-2xl font-bold tracking-tight text-primary">
              {formatCurrency(Number(variant.price))}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <h4 className="text-sm font-semibold uppercase text-primary/60">
              Stock
            </h4>
            <div className="h-10 px-3.5 rounded-xl border border-primary/8 bg-primary/5 flex items-center justify-center font-mono text-sm font-bold text-primary">
              {currentStock}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
