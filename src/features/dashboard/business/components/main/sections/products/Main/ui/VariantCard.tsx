'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Package, Check, Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { Variant } from '@/features/dashboard/business/api/products.api';

interface VariantCardProps {
  variant: Variant & { productName?: string };
  productName: string;
  onClick: () => void;
  onUpdateStock: (variantId: string, newStock: number) => Promise<any>;
}

export default function VariantCard({ variant, productName, onClick, onUpdateStock }: VariantCardProps) {
  const currentStock = variant.inventories?.[0]?.stock ?? 0;
  const [stockInput, setStockInput] = useState(String(currentStock));
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    setStockInput(String(currentStock));
  }, [currentStock]);

  const handleStockSubmit = async (e: React.FormEvent | React.FocusEvent) => {
    e.preventDefault();
    const newStock = parseInt(stockInput);
    if (isNaN(newStock) || newStock < 0) {
      setStockInput(String(currentStock));
      return;
    }
    if (newStock === currentStock) return;

    setIsUpdating(true);
    const res = await onUpdateStock(variant.variantId, newStock);
    setIsUpdating(false);

    if (res.success) {
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 2000);
    } else {
      setStockInput(String(currentStock));
    }
  };

  const primaryImage =
    variant.images?.find(img => img.isPrimary)?.content ||
    variant.images?.[0]?.content ||
    null;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col bg-background border border-primary/5 hover:border-primary/15 transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-md"
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] w-full bg-primary/2 overflow-hidden border-b border-primary/5">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={variant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-primary/20 gap-2">
            <Package size={48} strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Sin Imagen</span>
          </div>
        )}
        {!variant.isActive && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
            Inactivo
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col p-4 flex-1 justify-between gap-3">
        <div className="space-y-1">
          {variant.sku && (
            <span className="text-[9px] font-semibold text-primary/30 uppercase tracking-widest block">
              {variant.sku}
            </span>
          )}
          <h4 className="text-xs font-bold text-primary tracking-tight leading-snug uppercase group-hover:text-accent transition-colors">
            {productName} — {variant.name}
          </h4>
          <div className="flex items-center gap-1.5 text-[10px] text-primary/45 font-medium">
            <span>Color: {variant.color}</span>
            <span>•</span>
            <span>Talla: {variant.size}</span>
          </div>
        </div>

        {/* Precio + Stock quick edit */}
        <div className="flex items-center justify-between pt-2 border-t border-primary/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-primary/35 uppercase tracking-widest">Precio</span>
            <span className="text-xs font-bold text-primary font-mono">
              ${Number(variant.price).toLocaleString()}
            </span>
          </div>

          <div onClick={e => e.stopPropagation()} className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-primary/35 uppercase tracking-widest mb-1">Stock</span>
            <div className="relative flex items-center">
              <input
                type="text"
                value={stockInput}
                onChange={e => setStockInput(e.target.value)}
                onBlur={handleStockSubmit}
                onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
                className={cn(
                  'w-12 bg-primary/3 hover:bg-primary/5 focus:bg-white text-center text-xs font-mono font-bold text-primary border border-transparent focus:border-accent rounded-lg py-1 px-1 outline-none transition-all',
                  isUpdating && 'text-primary/30',
                )}
                disabled={isUpdating}
              />
              {isUpdating && <Loader2 size={12} className="absolute -left-5 text-accent animate-spin" />}
              {showCheck && <Check size={12} className="absolute -left-5 text-success animate-bounce" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
