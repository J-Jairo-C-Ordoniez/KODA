'use client';

import Header from '@/features/store/components/header/Header';
import FilterBar from '@/features/store/components/main/sections/catalog/main/sections/FilterBar';
import ProductGrid from '@/features/store/components/main/sections/catalog/main/sections/ProductGrid';
import Footer from '@/features/store/components/footer/Footer';
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
    <div className="min-h-screen bg-background text-primary flex flex-col font-sans selection:bg-contrast/30 overflow-x-hidden">
      <Header
        businessName={tenant.businessName}
        slug={slug}
      />

      <main className="flex-1 w-full">
        <FilterBar
          categories={categories}
          currentCategory={currentCategory}
          onFilterChange={setFilter}
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
      </main>

      <Footer businessName={tenant.businessName} slug={slug} whatsApp={tenant.whatsApp} />
    </div>
  );
}
