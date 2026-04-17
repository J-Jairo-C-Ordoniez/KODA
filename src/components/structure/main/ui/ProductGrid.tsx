'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import useFilterCatalogStore from '../../../../store/filterCatalog.store';

export function ProductGrid() {
  const { products, isLoading, error, fetchProducts } = useFilterCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="pt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-center overflow-x-hidden">
      {isLoading && Array.from({ length: 3 }).map((_, index) => (
        <ProductCard
          key={index}
        />
      ))}

      {!isLoading && error && (
        <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
          <p className="text-md font-medium tracking-wider text-secondary">
            Ha ocurrido un error, intenta de nuevo
          </p>
          <button
            onClick={() => fetchProducts()}
            className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer"
          >
            Volver a Intentarlo
          </button>
        </div>
      )}

      {!isLoading && !error && products && products.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
          <p className="text-md font-medium tracking-wider text-secondary">
            No hay productos disponibles para tu búsqueda.
          </p>
          <button
            onClick={() => fetchProducts()}
            className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer"
          >
            Volver a Intentarlo
          </button>
        </div>
      )}

      {products.map((product) => (
        <ProductCard
          key={product.variantId || product.id}
          product={product}
        />
      ))}
    </section>
  );
}
