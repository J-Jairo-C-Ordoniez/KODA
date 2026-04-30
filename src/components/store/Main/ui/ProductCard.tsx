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
      <article className="flex flex-col gap-4 animate-pulse">
        <div className="aspect-4/5 w-full bg-foreground/5 rounded-3xl" />
        <div className="space-y-2">
          <div className="h-4 bg-foreground/5 rounded-full w-2/3" />
          <div className="h-3 bg-foreground/5 rounded-full w-1/2" />
        </div>
      </article>
    );
  }

  const mainImage = product.images?.[0]?.content || null;
  const hoverImage = product.images?.[1]?.content || mainImage;
  
  const productUrl = slug ? `/${slug}/product/${product.variantId}` : `/product/${product.variantId}`;

  return (
    <Link href={productUrl} className="flex flex-col group gap-5">
      <div className="aspect-4/5 w-full relative overflow-hidden bg-[#F6F6F6] rounded-[32px] transition-all group-hover:shadow-2xl group-hover:shadow-navy/5">
        {mainImage ? (
          <>
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-contain p-6 mix-blend-multiply transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
            />
            <Image
              src={hoverImage}
              alt={product.name}
              fill
              className="object-contain p-6 mix-blend-multiply transition-all duration-700 ease-out scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
          </>
        ) : (
          <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
            <Package size={40} className="text-foreground/10" />
          </div>
        )}
        
        <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl text-navy">
              <ArrowRight size={20} />
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-2">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[13px] font-black text-primary uppercase tracking-tight leading-tight group-hover:text-navy transition-colors">
              {product.product?.name || product.name}
            </h3>
            <p className="text-[11px] font-medium text-secondary/60 uppercase tracking-widest">
              {product.product?.category?.name || 'Colección'} • {product.color}
            </p>
          </div>
          <div className="text-[13px] font-black text-primary whitespace-nowrap">
            {formatter.format(product.price).replace('$', '$ ')}
          </div>
        </div>
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
