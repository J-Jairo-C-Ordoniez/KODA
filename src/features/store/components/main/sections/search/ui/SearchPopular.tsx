'use client';

import ProductGrid from '@/features/store/components/main/sections/catalog/main/sections/ProductGrid';

interface Props {
  products: any[];
  slug: string;
  whatsApp?: string;
}

export default function SearchPopular({ products, slug, whatsApp }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <section aria-labelledby="popular-heading" className="space-y-8 pt-4">
      <header className="flex items-center gap-2 border-b border-primary/5 pb-4">
        <h2 id="popular-heading" className="text-sm font-medium text-primary/60">
          Recomendados de la Tienda
        </h2>
      </header>

      <ProductGrid
        products={products}
        slug={slug}
        whatsApp={whatsApp}
        error={null}
      />
    </section>
  );
}
