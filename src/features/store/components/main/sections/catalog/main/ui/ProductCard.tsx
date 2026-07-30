'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import Button from '@/shared/components/Button';

interface Props {
  product: any;
  slug: string;
  whatsApp?: string;
  itemIndex?: number;
}

export default function ProductCard({ product, slug, whatsApp }: Props) {
  if (!product) return null;

  const variant = product;
  const parentProduct = variant.product || {};
  const mainImage = variant.images?.[0]?.content || null;
  const productUrl = `/${slug}/product/${variant.variantId}`;

  const productName = parentProduct.name || variant.name || 'Producto';
  const colorLabel = variant.color
    ? variant.color.charAt(0).toUpperCase() + variant.color.slice(1).toLowerCase()
    : null;
  const sizeLabel = variant.size || null;
  const isLowStock =
    variant.inventories?.[0]?.stock <= 5 && variant.inventories?.[0]?.stock > 0;

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!whatsApp) return;
    const message = encodeURIComponent(
      `Hola! Me interesa:\n*${productName}*\n${colorLabel ? `Color: ${colorLabel}` : ''}${sizeLabel ? ` · Talla ${sizeLabel}` : ''}\nPrecio: ${formatCurrency(variant.price)}`
    );
    window.open(`https://wa.me/57${whatsApp}?text=${message}`, '_blank');
  };

  return (
    <article className="group flex flex-col">

      {/* Image — fixed height, generous padding so product breathes */}
      <Link
        href={productUrl}
        className="relative block w-full h-[420px] overflow-hidden"
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={productName}
            fill
            className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-primary/15">
            <Package size={40} strokeWidth={0.75} />
            <span className="text-xs font-medium text-primary/30">Sin imagen</span>
          </div>
        )}

        {/* Low stock badge */}
        {isLowStock && (
          <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-foreground border border-secondary px-3.5 py-2 rounded-xs bg-background/80 backdrop-blur-sm">
            Últimas unidades
          </span>
        )}
      </Link>

      {/* Info block */}
      <div className="flex flex-col gap-1 pt-4 pb-8">
        <p className="text-xl font-bold tracking-tight text-primary">
          {formatCurrency(variant.price)}
        </p>

        <Link href={productUrl} className="block">
          <h3 className="text-sm font-medium text-primary leading-snug tracking-tight hover:text-secondary transition-colors">
            {productName}
          </h3>
        </Link>

        {(colorLabel || sizeLabel) && (
          <p className="text-sm text-primary/50">
            {colorLabel}
            {colorLabel && sizeLabel && <span className="mx-1.5 text-primary/20">·</span>}
            {sizeLabel && <span>Talla {sizeLabel}</span>}
          </p>
        )}

        {whatsApp && (
          <div className="mt-4 overflow-hidden">
            <Button
              variant="primary"
              size="sm"
              onClick={handleWhatsAppBuy}
              className="w-full gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              <MessageCircle size={14} strokeWidth={1.5} />
              <span>Pedir por WhatsApp</span>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
