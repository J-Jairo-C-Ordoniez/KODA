'use client';

import { useEffect, useState } from 'react';
import { CheckIcon, PackageIcon, SpinnerGapIcon } from '@phosphor-icons/react';
import type { Variant } from '@/features/dashboard/business/api/products.api';
import { formatCurrency } from '@/lib/formatters';
import Image from 'next/image';

interface VariantCardProps {
  variant: Variant;
  productName: string;
  onClick: () => void;
  onUpdateStock: (variantId: string, newStock: number) => Promise<any>;
}

function getCurrentStock(variant: Variant) {
  return variant.inventories?.[0]?.stock ?? variant.stock ?? 0;
}

export default function VariantCard({ variant, productName, onClick, onUpdateStock }: VariantCardProps) {
  const currentStock = getCurrentStock(variant);
  const [stockInput, setStockInput] = useState(String(currentStock));
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setStockInput(String(currentStock));
  }, [currentStock]);

  const parsedStock = Number.parseInt(stockInput, 10);
  const isStockModified = !Number.isNaN(parsedStock) && parsedStock !== currentStock && parsedStock >= 0;
  const showSaveButton = isStockModified || isUpdating || showSaved;

  const saveStock = async () => {
    const newStock = Number.parseInt(stockInput, 10);
    if (Number.isNaN(newStock) || newStock < 0) {
      setStockInput(String(currentStock));
      return;
    }

    if (newStock === currentStock) return;

    setIsUpdating(true);
    const res = await onUpdateStock(variant.variantId, newStock);
    setIsUpdating(false);

    if (res.success) {
      setShowSaved(true);
      window.setTimeout(() => setShowSaved(false), 1600);
    } else {
      setStockInput(String(currentStock));
    }
  };

  const handleStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveStock();
  };

  const primaryImage = variant.images?.find(image => image.isPrimary)?.content
    || variant.images?.[0]?.content
    || '/placeholder-product.png';

  return (
    <article
      onClick={onClick}
      className="group flex cursor-pointer flex-col justify-between rounded-3xl border border-primary/10 bg-background/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:rounded-4xl sm:p-6"
    >
      <header className="mb-3 flex items-start justify-end">
        <span className={`rounded-full px-2 py-0.5 text-base font-semibold leading-relaxed ${
          variant.isActive ? 'text-emerald-600' : 'text-primary/60'
        }`}>
          {variant.isActive ? 'Activo' : 'Pausado'}
        </span>
      </header>

      <div className="relative aspect-[4/3] w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
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
            <PackageIcon size={44} weight="light" />
            <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-1 flex-col justify-between border-t border-primary/10 pt-2">
        <div className="mb-4 space-y-1">
          <p className="text-sm font-medium leading-relaxed text-foreground/50">
            {variant.sku || 'Sin SKU'}
          </p>
          <h3 className="text-base font-medium leading-relaxed text-foreground/75 transition-colors group-hover:text-secondary sm:text-md">
            {productName} · {variant.name}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-foreground/50">
            Color {variant.color || 'N/A'} · Talla {variant.size || 'N/A'}
          </p>
        </div>

        <div className="mt-2 flex items-end justify-between gap-3 border-t border-primary/10 pt-2">
          <div>
            <h4 className="text-sm font-medium leading-relaxed text-foreground/50">
              Precio
            </h4>
            <p className="text-base font-bold leading-relaxed text-primary sm:text-lg md:text-2xl">
              {formatCurrency(Number(variant.price))}
            </p>
          </div>

          <form
            onSubmit={handleStockSubmit}
            onClick={event => event.stopPropagation()}
            className="flex items-center gap-2"
          >
            <label
              className="sr-only"
              htmlFor={`stock-${variant.variantId}`}
            >
              Stock de {variant.name}
            </label>
            <input
              id={`stock-${variant.variantId}`}
              type="number"
              min={0}
              value={stockInput}
              onChange={event => setStockInput(event.target.value)}
              onBlur={saveStock}
              onKeyDown={event => {
                if (event.key === 'Enter') event.currentTarget.blur();
              }}
              className="h-10 w-14 rounded-xl border border-primary/8 bg-primary/5 p-2 text-center font-mono text-sm font-bold text-primary outline-none transition-all hover:bg-background focus:border-primary/20 focus:bg-background"
              disabled={isUpdating}
            />
            {showSaveButton && (
              <button
                type="submit"
                onMouseDown={event => event.preventDefault()}
                disabled={isUpdating}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all disabled:opacity-50 cursor-pointer ${
                  showSaved
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-primary/8 bg-primary text-background hover:bg-secondary'
                }`}
                aria-label={`Guardar stock de ${variant.name}`}
              >
                {isUpdating ? (
              <SpinnerGapIcon size={16} className="animate-spin" />
                ) : (
              <CheckIcon size={16} weight="bold" />
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </article>
  );
}
