'use client';

import { ShoppingBag, RefreshCw, AlertTriangle } from 'lucide-react';
import Button from '@/shared/components/Button';

interface Props {
  hasActiveFilter?: boolean;
  filterLabel?: string;
}

export default function ProductGridEmpty({ hasActiveFilter, filterLabel }: Props) {
  return (
    <div className="w-full py-24 my-8 flex flex-col items-center justify-center gap-5 text-center">
      <span className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-background">
        <ShoppingBag
          size={24}
          strokeWidth={1.5}
        />
      </span>

      <div className="space-y-2">
        <h3 className="text-base font-medium text-primary tracking-tight">
          {hasActiveFilter ? 'Sin resultados' : 'Sin existencias'}
        </h3>
        <p className="text-sm text-primary/60 leading-relaxed max-w-xs">
          {hasActiveFilter
            ? `No encontramos prendas en la categoría "${filterLabel}".`
            : 'No encontramos prendas disponibles en este momento.'}
        </p>
      </div>
    </div>
  );
}