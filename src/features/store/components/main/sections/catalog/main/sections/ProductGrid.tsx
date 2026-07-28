'use client';

import ProductCard from '@/features/store/components/main/sections/catalog/main/ui/ProductCard';
import { Search, ShoppingBag } from 'lucide-react';

interface Props {
  products: any[];
  slug: string;
  whatsApp?: string;
  error: string | null;
}

export default function ProductGrid({ products, slug, whatsApp, error }: Props) {
  if (error) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center gap-6 text-center border border-dashed border-red-500/20 rounded-2xl bg-red-500/[0.02] my-8">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
          <Search size={32} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">Ocurrió un inconveniente</p>
          <p className="text-[11px] font-medium text-foreground-muted max-w-xs leading-relaxed uppercase tracking-widest opacity-60">
            {error || 'No se pudo cargar el catálogo de la tienda.'}
          </p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center gap-6 text-center border border-dashed border-foreground/10 rounded-2xl my-8">
        <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground-muted/40">
          <ShoppingBag size={32} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">Sin existencias</p>
          <p className="text-[11px] font-medium text-foreground-muted max-w-xs leading-relaxed uppercase tracking-widest opacity-60">
            No encontramos prendas disponibles en esta categoría.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product: any, index: number) => (
        <ProductCard
          key={product.variantId || index}
          product={product}
          slug={slug}
          whatsApp={whatsApp}
          itemIndex={index + 1}
        />
      ))}
    </section>
  );
}
