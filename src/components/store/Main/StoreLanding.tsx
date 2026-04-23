'use client';

import useBreadcrumbsStore from "../../../store/breadcrumbs.store";
import Breadcrumbs from "./ui/Breadcrumbs";
import FilterBar from "./ui/FilterBar";
import { ProductGrid } from "./ui/ProductGrid";
import { Pagination } from "./ui/Pagination";

export default function Main({ tenantId }: { tenantId?: string }) {
    const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();

    return (
        <main className="bg-background w-full min-h-screen">
            <div className="container mx-auto p-4 md:p-8 flex flex-col justify-between">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    setBreadcrumbsRoute={setBreadcrumbsRoute}
                />

                <div>
                    <FilterBar tenantId={tenantId} />
                    {/* <ProductGrid />
                    <Pagination /> */}
                </div>
            </div>
        </main>
    );
}