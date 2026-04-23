"use client";

import { useSearch } from "@/hooks/useSearch";
import useBreadcrumbsStore from "../../../../store/breadcrumbs.store";
import Breadcrumbs from "../../Main/ui/Breadcrumbs";
import SearchInitial from "./ui/SearchInitial";
import SearchResults from "./ui/SearchResults";
import SearchNoResults from "./ui/SearchNoResults";
import { X } from "lucide-react";

export default function SearchMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const {
    query,
    setQuery,
    results,
    popular,
    isLoading,
    hasSearched,
    clearSearch
  } = useSearch();

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8 flex flex-col">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />

        <section className="border-secondary/20 mx-auto w-full py-10">
          <div className="relative border-b border-secondary/20 pb-2 mb-16 group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en la Tienda"
              className="w-full bg-transparent text-xl md:text-2xl tracking-wider font-medium placeholder:text-secondary/40 focus:outline-none text-primary/90"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-primary transition-colors cursor-pointer"
              >
                <X
                  size={24}
                  strokeWidth={1.5}
                />
              </button>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center py-20">
              <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
                Buscando...
              </p>
            </div>
          )}

          {!hasSearched && (
            <SearchInitial
              popular={popular}
              setQuery={setQuery}
            />
          )}

          {results.length > 0 && (
            <SearchResults
              query={query}
              products={results}
            />
          )}

          {hasSearched && results.length === 0 && (
            <SearchNoResults
              query={query}
              popular={popular}
              setQuery={setQuery}
            />
          )}
        </section>
      </div>
    </main>
  );
}
