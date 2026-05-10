'use client';

import Breadcrumbs from "./ui/Breadcrumbs";
import FilterBar from "./ui/FilterBar";
import ProductGrid from "@/components/store/Main/ui/ProductGrid";
import Loader from "@/components/ui/Loader";
import { useCatalog } from "@/hooks/publicCatalog/useCatalog";


export default function Main({ tenantId }: { tenantId?: string }) {
    const { products, isLoading, error } = useCatalog(tenantId);

    return (
        <main className="bg-background w-full min-h-screen pt-8">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Breadcrumbs />
                </div>

                <div className="flex flex-col gap-12">
                    <FilterBar tenantId={tenantId} />
                    
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-6">
                            <Loader size="lg" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground-muted animate-pulse">
                                Descubriendo productos...
                            </p>
                        </div>
                    ) : (
                        <ProductGrid
                            error={error}
                            products={products}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}