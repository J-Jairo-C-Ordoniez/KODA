'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

interface Props {
  product: any;
  slug: string;
  whatsApp?: string;
  itemIndex?: number;
}

export default function ProductCard({ product, slug, whatsApp, itemIndex = 1 }: Props) {
  if (!product) return null;

  const variant = product;
  const parentProduct = variant.product || {};
  const mainImage = variant.images?.[0]?.content || null;
  const productUrl = `/${slug}/product/${variant.variantId}`;

  // Format SKU / item number like reference (e.g., 40041, 40042...)
  const displaySku = variant.sku ? variant.sku : String(40040 + itemIndex);

  // Clean title in uppercase with trailing period if not already present
  const titleText = (parentProduct.name || variant.name || '').toUpperCase().trim();
  const formattedTitle = titleText.endsWith('.') ? titleText : `${titleText}.`;

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!whatsApp) return;

    const message = encodeURIComponent(
      `Hola! Me interesa comprar el producto:\n*${parentProduct.name || variant.name}*\nVariante: ${variant.color} (${variant.size || 'Única'})\nPrecio: ${formatCurrency(variant.price)}\nSKU: ${displaySku}`
    );
    window.open(`https://wa.me/57${whatsApp}?text=${message}`, '_blank');
  };

  return (
    <article className="group relative flex flex-col justify-between border-r border-b border-foreground/10 bg-background/50 hover:bg-foreground/[0.02] transition-colors min-h-[380px] p-6 sm:p-8">
      {/* Top row: SKU identifier */}
      <div className="flex items-center justify-between mb-4 z-10">
        <span className="text-xs font-mono font-bold tracking-widest text-primary/80">
          {displaySku}
        </span>
        {variant.inventories?.[0]?.stock <= 5 && variant.inventories?.[0]?.stock > 0 && (
          <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-contrast text-white px-2 py-0.5 rounded">
            Pocas uni.
          </span>
        )}
      </div>

      {/* Main Card Content: Split between Left Text & Right Portrait Image */}
      <div className="grid grid-cols-12 gap-4 flex-1 items-center">
        {/* Left Column: Product Info (Title & Price) */}
        <div className="col-span-6 flex flex-col justify-between h-full py-2 z-10">
          <div className="space-y-3">
            <Link href={productUrl} className="block group-hover:text-contrast transition-colors">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider leading-snug text-primary text-balance">
                {formattedTitle}
              </h3>
            </Link>

            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-muted/60">
              {variant.color} {variant.size ? `• Talla ${variant.size}` : ''}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="text-xs sm:text-sm font-bold font-mono tracking-tight text-primary/90">
              {formatCurrency(variant.price)}
            </div>

            {/* Quick Action Button on Hover */}
            {whatsApp && (
              <button
                onClick={handleWhatsAppBuy}
                className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-500 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-600 shadow-md"
              >
                <MessageCircle size={12} />
                <span>Pedir</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Full-Height Portrait Product Image */}
        <div className="col-span-6 h-full relative min-h-[240px] flex items-center justify-center">
          <Link href={productUrl} className="relative w-full h-full block">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={parentProduct.name || variant.name}
                fill
                className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-foreground-muted/20">
                <Package size={36} strokeWidth={1} />
              </div>
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}
