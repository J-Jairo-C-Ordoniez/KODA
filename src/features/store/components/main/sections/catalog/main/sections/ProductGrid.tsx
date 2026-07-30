'use client';

import ProductGridError from '@/features/store/components/main/sections/catalog/main/ui/ProductGridError';
import ProductGridEmpty from '@/features/store/components/main/sections/catalog/main/ui/ProductGridEmpty';
import ProductGridResults from '@/features/store/components/main/sections/catalog/main/ui/ProductGridResults';

interface Props {
  products: any[];
  slug: string;
  whatsApp?: string;
  error: string | null;
  currentCategory?: string;
}

export default function ProductGrid({ products, slug, whatsApp, error, currentCategory }: Props) {
  if (error) {
    return <ProductGridError message={error} />;
  }

  if (!products || products.length === 0) {
    return (
      <ProductGridEmpty
        hasActiveFilter={!!currentCategory}
        filterLabel={currentCategory}
      />
    );
  }

  return (
    <ProductGridResults
      products={products}
      slug={slug}
      whatsApp={whatsApp}
    />
  );
}
