'use client';

import Image from 'next/image';
import Link from "next/link";
import { ArrowRight, Package } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatCurrency } from '@/lib/formatters';

export default function ProductCard({ product }: { product: any }) {
  const params = useParams();
  const slug = params?.slug as string;
  

  if (!product) {
    return (
      <article className="flex flex-col gap-6 animate-pulse">
        <div className="aspect-square w-full bg-background-elevated rounded-[40px]" />
        <div className="space-y-3 px-4">
          <div className="h-5 bg-background-elevated rounded-full w-2/3" />
          <div className="h-4 bg-background-elevated rounded-full w-1/2 opacity-50" />
        </div>
      </article>
    );
  }

  // Handle data structure carefully
  const variant = product;
  const parentProduct = variant.product || {};
  const mainImage = variant.images?.[0]?.content || null;
  const hoverImage = variant.images?.[1]?.content || mainImage;
  
  const productUrl = slug ? `/${slug}/product/${variant.variantId}` : `/product/${variant.variantId}`;

  return (
    <Link href={productUrl} className="flex flex-col group gap-6 relative">
      {/* Image Container */}
      <div className="aspect-square w-full relative overflow-hidden bg-background-elevated rounded-[40px] border border-white/5 transition-all duration-700 ease-out group-hover:border-contrast/30 group-hover:shadow-2xl group-hover:shadow-contrast/5 group-hover:-translate-y-2">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={variant.name}
            fill
            className="object-contain p-10 transition-transform duration-1000 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-10">
            <Package size={60} strokeWidth={1} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sin imagen</span>
          </div>
        )}
        
        {/* CTA Button */}
        <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="w-12 h-12 bg-contrast text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-contrast/20">
            <ArrowRight size={20} />
          </div>
        </div>

        {/* Stock badge if limited */}
        {variant.inventories?.[0]?.stock <= 5 && variant.inventories?.[0]?.stock > 0 && (
          <div className="absolute top-5 left-5 z-20">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-contrast/90 text-white px-4 py-2 rounded-xl backdrop-blur-md shadow-lg">
              Últimas {variant.inventories[0].stock} uni.
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2.5 px-2">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h3 className="text-[17px] font-black text-primary uppercase tracking-tight leading-tight group-hover:text-contrast transition-colors duration-300 truncate">
              {parentProduct.name || variant.name}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-black text-foreground-muted uppercase tracking-[0.2em] opacity-50 truncate">
                {parentProduct.category?.name || 'Colección'}
              </p>
              <span className="w-1 h-1 rounded-full bg-foreground-muted/20" />
              <p className="text-[10px] font-black text-contrast uppercase tracking-[0.2em]">
                {variant.color}
              </p>
            </div>
          </div>
          <div className="shrink-0 pt-0.5">
            <span className="text-lg font-black text-primary tracking-tighter">
            {formatCurrency(variant.price)}
            </span>
          </div>
        </div>

        {/* Size chips preview (Optional, let's keep it clean) */}
        {variant.size && (
           <div className="flex items-center gap-2 opacity-30">
              <div className="w-4 h-px bg-foreground-muted" />
              <p className="text-[9px] font-black uppercase tracking-widest text-foreground-muted">
                Talla {variant.size}
              </p>
           </div>
        )}
      </div>
    </Link>
  );
}
