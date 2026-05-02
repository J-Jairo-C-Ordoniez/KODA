'use client';

import Image from 'next/image';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductCard({ product }: { product: any }) {
  const params = useParams();
  const slug = params?.slug as string;
  
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  if (!product) {
    return (
      <article className="flex flex-col gap-5 animate-pulse">
        <div className="aspect-square w-full bg-foreground/5 rounded-[40px]" />
        <div className="space-y-3 px-2">
          <div className="h-5 bg-foreground/5 rounded-full w-2/3" />
          <div className="h-4 bg-foreground/5 rounded-full w-1/2" />
        </div>
      </article>
    );
  }

  const mainImage = product.images?.[0]?.content || null;
  const hoverImage = product.images?.[1]?.content || mainImage;
  
  const productUrl = slug ? `/${slug}/product/${product.variantId}` : `/product/${product.variantId}`;

  return (
    <Link href={productUrl} className="flex flex-col group gap-5">
      {/* Image Container */}
      <div className="aspect-square w-full relative overflow-hidden bg-[#F4F4F4] rounded-[40px] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/10 group-hover:scale-[1.01]">
        {mainImage ? (
          <>
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-contain p-8 mix-blend-multiply transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
            />
            <Image
              src={hoverImage}
              alt={product.name}
              fill
              className="object-contain p-8 mix-blend-multiply transition-all duration-700 ease-out scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={56} className="text-foreground/10" />
          </div>
        )}
        
        {/* CTA Button */}
        <div className="absolute bottom-5 right-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl text-navy border border-foreground/5">
            <ArrowRight size={22} />
          </div>
        </div>

        {/* Stock badge if limited */}
        {product.inventories?.[0]?.stock <= 5 && product.inventories?.[0]?.stock > 0 && (
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full">
              Últimas {product.inventories[0].stock} unidades
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[15px] font-black text-primary uppercase tracking-tight leading-tight group-hover:text-navy transition-colors duration-300">
              {product.product?.name || product.name}
            </h3>
            <p className="text-[11px] font-semibold text-secondary/70 uppercase tracking-widest">
              {product.product?.category?.name || 'Colección'} · {product.color}
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-[15px] font-black text-primary">
              {formatter.format(product.price).replace('$', '$ ')}
            </span>
          </div>
        </div>

        {/* Size indicator */}
        {product.size && (
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary/50 mt-0.5">
            Talla: {product.size}
          </p>
        )}
      </div>
    </Link>
  );
}

function Package({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
