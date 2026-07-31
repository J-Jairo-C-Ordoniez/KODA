'use client';

import Loader from '@/shared/components/Loader';
import { useStoreSearch } from '@/features/store/hooks/useStoreSearch';

import SearchBar from '@/features/store/components/main/sections/search/ui/SearchBar';
import SearchResults from '@/features/store/components/main/sections/search/ui/SearchResults';
import SearchPopular from '@/features/store/components/main/sections/search/ui/SearchPopular';

interface Props {
  tenant: any;
  slug: string;
}

export default function SearchView({ tenant, slug }: Props) {
  const { query, setQuery, results, popular, isLoading, hasSearched, clearSearch } = useStoreSearch(tenant.tenantId);

  return (
    <main
      aria-label="Búsqueda en el catálogo de la tienda"
      className="w-full px-10 md:px-40 py-10 pb-24"
    >
      <SearchBar
        query={query}
        onChange={setQuery}
        onClear={clearSearch}
      />

      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Buscando coincidencias"
          className="flex flex-col items-center justify-center py-20 gap-4"
        >
          <Loader />
        </div>
      )}

      {!isLoading && hasSearched && (
        <SearchResults
          query={query}
          results={results}
          slug={slug}
          whatsApp={tenant.whatsApp}
        />
      )}

      {!isLoading && !hasSearched && (
        <SearchPopular
          products={popular}
          slug={slug}
          whatsApp={tenant.whatsApp}
        />
      )}
    </main>
  );
}
