'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Edit2, MoreVertical, Package, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

interface POSVariant {
  variantId: string;
  productId: string;
  productName: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  isActive: boolean;
  primaryImage: string;
}

interface SalesVariantCardProps {
  variant: POSVariant;
  onAddToCart: (variantId: string) => void;
  onEditVariant?: (variant: POSVariant) => void;
  onDeleteVariant?: (variantId: string) => void;
}

export default function SalesVariantCard({
  variant,
  onAddToCart,
  onEditVariant,
  onDeleteVariant,
}: SalesVariantCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleCardClick = () => {
    setIsAdding(true);
    onAddToCart(variant.variantId);
    setTimeout(() => setIsAdding(false), 250);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    if (onEditVariant) onEditVariant(variant);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    if (onDeleteVariant) onDeleteVariant(variant.variantId);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between relative ${
        isAdding ? 'scale-95 shadow-sm' : ''
      }`}
    >
      {/* Top Image & 3-Dots Menu */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-foreground-muted/30 border border-primary/5 transition-transform duration-300 group-hover:scale-[1.01] mb-4">
        {variant.primaryImage !== '/placeholder-product.png' ? (
          <Image
            src={variant.primaryImage}
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

        {/* Status Badge */}
        <span className={`absolute left-3 top-3 text-xs font-bold px-2.5 py-1 rounded-lg border backdrop-blur-xs ${
          variant.isActive
            ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
            : 'text-primary/60 bg-primary/2 border-primary/8'
        }`}>
          {variant.isActive ? 'Activo' : 'Pausado'}
        </span>

        {/* 3-Dots Context Menu Button */}
        {(onEditVariant || onDeleteVariant) && (
          <div className="absolute right-2 top-2 z-10" onClick={e => e.stopPropagation()}>
            <button
              onClick={handleMenuClick}
              className="p-1.5 rounded-lg bg-background/80 hover:bg-background border border-primary/10 text-primary/60 hover:text-primary shadow-xs transition-colors cursor-pointer"
              title="Opciones"
              aria-label="Opciones de variante"
            >
              <MoreVertical size={16} />
            </button>

            {/* Context Dropdown Menu */}
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-primary/10 bg-background shadow-lg p-1.5 z-30 space-y-1 animate-in fade-in duration-200">
                  {onEditVariant && (
                    <button
                      onClick={handleEdit}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-primary hover:bg-foreground-muted/40 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="p-1 rounded-md bg-foreground-muted/50 text-primary">
                        <Edit2 size={12} />
                      </div>
                      Editar
                    </button>
                  )}
                  {onDeleteVariant && (
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-accent-red hover:bg-accent-red/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="p-1 rounded-md bg-accent-red/10 text-accent-red">
                        <Trash2 size={12} />
                      </div>
                      Eliminar
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main product info */}
      <div className="flex flex-1 flex-col justify-between">
        <header className="mb-4">
          <p className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
            {variant.sku || 'Sin SKU'}
          </p>
          <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
            {variant.productName} · {variant.name}
          </h3>
          <p className="text-xs font-medium text-primary/60 mt-1">
            Color {variant.color || 'N/A'} · Talla {variant.size || 'N/A'}
          </p>
        </header>

        {/* Price & Add to Cart Footer */}
        <div className="pt-4 border-t border-primary/8 flex items-end justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
              Precio
            </h4>
            <p className="text-2xl font-bold tracking-tight text-primary">
              {formatCurrency(Number(variant.price))}
            </p>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex items-center gap-1.5 py-2 px-3 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            title="Agregar al carrito"
          >
            <Plus size={16} /> Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
