'use client';

import { formatCurrency } from '@/lib/formatters';

interface Props {
  categoryName?: string;
  productName: string;
  price: number | string;
  color?: string;
  size?: string;
  description?: string | null;
}

export default function ProductHeaderInfo({ categoryName, productName, price, color, size, description, }: Props) {
  const colorFormatted = color
    ? color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()
    : null;

  return (
    <header className="flex flex-col gap-4 pb-2 border-b border-primary/5">
      <div className="space-y-1">
        {categoryName && (
          <span className="text-xs font-medium text-primary/60 uppercase tracking-wider">
            {categoryName}
          </span>
        )}

        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary leading-snug">
          {productName}
        </h1>
      </div>

      <p className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
        {formatCurrency(Number(price))}
      </p>

      {(colorFormatted || size) && (
        <div className="flex items-center gap-3 text-sm font-medium text-primary/60 pt-1 uppercase">
          {colorFormatted && (
            <span>
              Color: <strong className="text-primary font-semibold">{colorFormatted}</strong>
            </span>
          )}
          {colorFormatted && size && <span className="text-primary/20" aria-hidden="true">•</span>}
          {size && (
            <span>
              Talla: <strong className="text-primary font-semibold">{size}</strong>
            </span>
          )}
        </div>
      )}

      {description && (
        <p className="text-sm font-normal text-primary/60 leading-relaxed pt-2">
          {description}
        </p>
      )}
    </header>
  );
}
