'use client';

import ProductCard from '@/features/store/components/main/sections/catalog/main/ui/ProductCard';

interface Props {
  products: any[];
  slug: string;
  whatsApp?: string;
}

export default function ProductGridResults({ products, slug, whatsApp }: Props) {
  return (
    <section className="w-full px-10 md:px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 animate-in fade-in duration-500">
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
