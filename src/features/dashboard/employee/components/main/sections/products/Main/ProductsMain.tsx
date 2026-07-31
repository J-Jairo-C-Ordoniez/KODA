'use client';

import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useProductsStore } from '@/store/useProductsStore';
import type { Product, Variant } from '@/features/dashboard/business/api/products.api';
import ReadOnlyVariantCard from '@/features/dashboard/employee/components/main/sections/products/Main/ui/ReadOnlyVariantCard';
import Loader from '@/shared/components/Loader';

type VariantWithProductName = Variant & { productName?: string };

export default function ProductsMain() {
  const { selectedProductId, products, categories, isLoading } = useProductsStore();

  const selectedProduct = useMemo<Product | null>(() => {
    if (!selectedProductId) return null;
    return products.find(product => product.productId === selectedProductId) ?? null;
  }, [products, selectedProductId]);

  const selectedCategory = useMemo(() => {
    if (!selectedProduct) return null;
    return categories.find(category => category.categoryId === selectedProduct.categoryId) ?? null;
  }, [categories, selectedProduct]);

  const displayedVariants = useMemo<VariantWithProductName[]>(() => {
    if (selectedProduct) {
      return selectedProduct.variants ?? [];
    }

    return products.flatMap(product =>
      (product.variants ?? []).map(variant => ({
        ...variant,
        productName: product.name,
      })),
    );
  }, [products, selectedProduct]);

  if (isLoading && products.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-7">
      <section className="space-y-6 animate-in fade-in duration-500">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
          <nav
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary/60"
            aria-label="Ubicación del Productos"
          >
            <span className="rounded-md bg-foreground-muted/40 px-3 py-1 text-sm text-primary/80">
              Productos
            </span>
            <ChevronRight
              size={18}
              className="text-primary/25"
            />
            {selectedCategory && (
              <>
                <span className="text-sm text-primary/80">
                  {selectedCategory.name}
                </span>
                <ChevronRight
                  size={18}
                  className="text-primary/25"
                />
              </>
            )}
            <span className="p-1 text-sm text-primary/80">
              {selectedProduct ? selectedProduct.name : 'Todos los productos'}
            </span>
          </nav>
        </header>

        {displayedVariants.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 w-full h-full mx-auto">
            <h3 className="text-lg font-medium text-primary tracking-tight">
              {selectedProduct ? 'Sin variantes registradas' : 'Catálogo sin productos'}
            </h3>
            <p className="text-sm text-primary/60 leading-relaxed max-w-md my-2">
              {selectedProduct
                ? 'No hay variantes cargadas para este producto.'
                : 'Selecciona un producto del menú lateral para consultar sus características y prendas disponibles.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayedVariants.map(variant => (
              <ReadOnlyVariantCard
                key={variant.variantId}
                variant={variant}
                productName={variant.productName || selectedProduct?.name || 'Producto'}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
