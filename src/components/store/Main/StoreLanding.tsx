'use client';

import { useEffect } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs.store";
import Breadcrumbs from "./ui/Breadcrumbs";
import FilterBar from "./ui/FilterBar";
import ProductGrid from "@/components/store/Main/ui/ProductGrid";
import { Pagination } from "./ui/Pagination";
import useFilterCatalogStore from "@/store/filterCatalog.store";

export default function Main({ tenantId }: { tenantId?: string }) {
    const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
    const { products, isLoading, error, fetchProducts } = useFilterCatalogStore();

    useEffect(() => {
        fetchProducts(tenantId);
    }, []);

    return (
        <main className="bg-background w-full min-h-screen">
            <div className="container mx-auto p-4 md:p-8 flex flex-col justify-between">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    setBreadcrumbsRoute={setBreadcrumbsRoute}
                />

                <div>
                    <FilterBar tenantId={tenantId} />
                    <ProductGrid
                        isLoading={isLoading}
                        error={error}
                        products={products}
                    />

                    {/* <Pagination /> */}
                </div>
            </div>
        </main>
    );
}