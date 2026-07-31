'use client';

import FilterBar from '@/features/store/components/main/sections/catalog/main/sections/FilterBar';
import ProductGrid from '@/features/store/components/main/sections/catalog/main/sections/ProductGrid';
import Loader from '@/shared/components/Loader';
import { useStoreCatalog } from '@/features/store/hooks/useStoreCatalog';

interface Props {
  tenant: any;
  slug: string;
}

export default function Catalog({ tenant, slug }: Props) {
  const {
    products,
    categories,
    isLoading,
    error,
    currentCategory,
    setFilter
  } = useStoreCatalog(tenant.tenantId);

  return (
    <>
      <FilterBar
        categories={categories}
        currentCategory={currentCategory}
        onFilterChange={setFilter}
        totalCount={isLoading ? undefined : products.length}
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader />
        </div>
      ) : (
        <ProductGrid
          products={products}
          slug={slug}
          whatsApp={tenant.whatsApp}
          error={error}
          currentCategory={currentCategory}
        />
      )}
    </>
  );
}
