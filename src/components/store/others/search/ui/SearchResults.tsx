"use client";

import { ProductCard } from "../../../Main/ui/ProductCard";

export default function SearchResults({ query, products }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
        Mostrando resultados para: <span className="text-primary/90">{query}</span>
      </h2>
      <div className="pt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-center overflow-x-hidden">
        {products.map((product) => (
          <ProductCard
            key={product.variantId}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
