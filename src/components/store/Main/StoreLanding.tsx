'use client';

import Breadcrumbs from "./ui/Breadcrumbs";
import FilterBar from "./ui/FilterBar";
import ProductGrid from "@/components/store/Main/ui/ProductGrid";
import Loader from "@/components/ui/Loader";
import { useCatalog } from "@/hooks/publicCatalog/useCatalog";

export default function Main({ tenantId }: { tenantId?: string }) {
    const { products, isLoading, error } = useCatalog(tenantId);

    return (
        <main className="bg-background w-full min-h-screen pt-4">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-8">
                <Breadcrumbs />

                <div className="flex flex-col gap-6">
                    <FilterBar tenantId={tenantId} />
                    
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader />
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