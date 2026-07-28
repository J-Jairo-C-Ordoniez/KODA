'use client';

import Header from '../../../header/Header';
import Footer from '../../../footer/Footer';
import ProductGrid from '@/features/store/components/main/sections/catalog/main/sections/ProductGrid';
import SidebarLeft from '../../../header/ui/SidebarLeft';
import Loader from '@/shared/components/Loader';
import { useStoreSearch } from '../../../../hooks/useStoreSearch';
import { Search, X, Sparkles } from 'lucide-react';

interface Props {
  tenant: any;
  slug: string;
}

export default function SearchView({ tenant, slug }: Props) {
  const { query, setQuery, results, popular, isLoading, hasSearched, clearSearch } = useStoreSearch(
    tenant.tenantId
  );

  return (
    <div className="min-h-screen bg-background text-primary flex font-sans selection:bg-contrast/30">
      <SidebarLeft slug={slug} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header businessName={tenant.businessName} slug={slug} />

        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-10 pb-24">
          <div className="max-w-3xl mx-auto mb-16 space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-contrast">
                Catálogo Oficial
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-primary">
                Encuentra tu Prenda.
              </h1>
            </div>

            <div className="relative border-b-2 border-foreground/20 focus-within:border-contrast transition-colors pt-4 pb-2">
              <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground-muted/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Escribe el nombre, categoría o color..."
                className="w-full pl-10 pr-10 py-2 bg-transparent text-lg md:text-2xl font-bold tracking-wider placeholder:text-foreground-muted/30 focus:outline-none text-primary"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-primary transition-colors p-1"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader size="lg" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground-muted animate-pulse">
                Buscando coincidencias...
              </span>
            </div>
          )}

          {!isLoading && hasSearched && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-primary">
                  Resultados para &quot;{query}&quot; ({results.length})
                </h2>
              </div>

              <ProductGrid
                products={results}
                slug={slug}
                whatsApp={tenant.whatsApp}
                error={null}
              />
            </div>
          )}

          {!isLoading && !hasSearched && popular.length > 0 && (
            <div className="space-y-8 pt-8">
              <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
                <Sparkles size={18} className="text-contrast" />
                <h2 className="text-xs font-black uppercase tracking-widest text-primary">
                  Recomendados de la Tienda
                </h2>
              </div>

              <ProductGrid
                products={popular}
                slug={slug}
                whatsApp={tenant.whatsApp}
                error={null}
              />
            </div>
          )}
        </main>

        <Footer businessName={tenant.businessName} slug={slug} whatsApp={tenant.whatsApp} />
      </div>
    </div>
  );
}
