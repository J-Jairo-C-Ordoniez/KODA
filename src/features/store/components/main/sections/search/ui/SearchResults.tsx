'use client';

import ProductGrid from '@/features/store/components/main/sections/catalog/main/sections/ProductGrid';

interface Props {
  query: string;
  results: any[];
  slug: string;
  whatsApp?: string;
}

export default function SearchResults({ query, results, slug, whatsApp }: Props) {
  return (
    <section
      aria-labelledby="search-results-heading"
      className="space-y-8"
    >
      <header className="flex items-center justify-between border-b border-primary/5 pb-4">
        <h2
          id="search-results-heading"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm font-medium text-primary/60"
        >
          {results.length > 0
            ? `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`
            : `Sin resultados para "${query}"`}
        </h2>
      </header>

      <ProductGrid
        products={results}
        slug={slug}
        whatsApp={whatsApp}
        error={null}
        currentCategory={query}
      />
    </section>
  );
}
