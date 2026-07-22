'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Loader2, Package } from 'lucide-react';
import type { Variant } from '@/features/dashboard/business/api/products.api';
import { formatCurrency } from '@/lib/formatters';

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
      className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-foreground-muted/30 border border-primary/5 transition-transform duration-300 group-hover:scale-[1.01] mb-4">
        {primaryImage !== '/placeholder-product.png' ? (
          <Image
            src={primaryImage}
            alt={variant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-full w-full object-contain p-4"
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

      <div className="flex flex-1 flex-col justify-between">
        <header className="mb-4">
          <p className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
            {variant.sku || 'Sin SKU'}
          </p>
          <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
            {productName} · {variant.name}
          </h3>
          <p className="text-xs font-medium text-primary/60 mt-1">
            Color {variant.color || 'N/A'} · Talla {variant.size || 'N/A'}
          </p>
        </header>

        <div className="pt-4 border-t border-primary/8 flex items-end justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
              Precio
            </h4>
            <p className="text-2xl font-bold tracking-tight text-primary">
              {formatCurrency(Number(variant.price))}
            </p>
          </div>

          <form
            onSubmit={handleStockSubmit}
            onClick={event => event.stopPropagation()}
            className="flex items-center gap-2"
          >
            <label className="sr-only" htmlFor={`stock-${variant.variantId}`}>
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
              className="h-10 w-20 rounded-xl border border-primary/8 bg-foreground-muted/40 px-2 text-center font-mono text-sm font-bold text-primary outline-none transition-all hover:bg-foreground-muted/60 focus:border-primary/20 focus:bg-background"
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
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </article>
  );
}
