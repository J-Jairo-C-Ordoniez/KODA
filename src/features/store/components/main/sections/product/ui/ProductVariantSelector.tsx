'use client';

import { Check } from 'lucide-react';
import Button from '@/shared/components/Button';

interface Props {
  variants: any[];
  selectedVariantId: string;
  onSelectVariant: (variant: any) => void;
}

export default function ProductVariantSelector({ variants, selectedVariantId, onSelectVariant, }: Props) {
  if (!variants || variants.length <= 1) return null;

  return (
    <section
      aria-labelledby="variant-selector-heading"
      className="space-y-3 pt-2"
    >
      <h2
        id="variant-selector-heading"
        className="text-sm font-medium text-primary/60"
      >
        Variantes disponibles
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="variant-selector-heading"
        className="flex flex-wrap gap-2"
      >
        {variants.map((v: any) => {
          const isSelected = v.variantId === selectedVariantId;
          const label = v.color
            ? v.color.charAt(0).toUpperCase() + v.color.slice(1).toLowerCase()
            : v.name;

          return (
            <Button
              key={v.variantId}
              variant="secondary"
              aria-checked={isSelected}
              onClick={() => onSelectVariant(v)}
              className={isSelected
                ? 'border-primary bg-primary/5 text-primary font-semibold'
                : 'border-primary/8 text-primary/60 hover:border-primary/20'
              }
            >
              {isSelected && <Check size={18} aria-hidden="true" />}
              <span>{label}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
