'use client';

import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import { formatCurrency } from '@/lib/formatters';
import { WarningCircleIcon, ChartLineIcon, ClockIcon, PackageIcon, StarIcon } from '@phosphor-icons/react';

import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import KPIs from "@/features/dashboard/business/components/main/sections/summary/Main/ui/KPIs";
import { InventoryListCard, InventoryListItem } from "@/features/dashboard/business/components/main/sections/summary/Main/ui/InventoryListCard";
import { InventoryStats } from "@/features/dashboard/business/api/dashboard.api";

export default function Inventory({ activeTab }: { activeTab: string }) {
    const { data, isLoading, error } = useTabStats<InventoryStats>(activeTab);

    const topSalesItems: InventoryListItem[] = data ? data.topSales.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `En stock: ${item.stock} uds.`,
        badgeText: `${item.totalSold} vendidos`,
        badgeStyles: "text-green-600 font-medium text-sm"
    })) : [];

    const slowMovingItems: InventoryListItem[] = data ? data.stagnantItems.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `En stock: ${item.stock} uds.`,
        badgeText: `${item.daysWithoutSale} días sin salir`,
        badgeStyles: "text-amber-600 font-medium text-sm"
    })) : [];

    const outOfStockItems: InventoryListItem[] = data ? data.outOfStockItems.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `SKU: ${item.sku}`,
        badgeText: "Pedir urgente",
        badgeStyles: "text-red-600 font-medium text-sm"
    })) : [];

    return (
        <section className="space-y-5 animate-in fade-in duration-500 py-4 px-2 md:px-4 xl:px-10">
            <header>
                <h2 className="text-2xl tracking-tight leading-tight font-bold">
                    Rendimiento de Inventario
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-foreground/75">
                    Supervisa la rotación de tus productos.
                </p>
            </header>

            {isLoading && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <KPIs
                            title="Prendas en Stock"
                            value={data.metrics.totalPhysicalItems}
                            icon={PackageIcon}
                            badge={{ text: "Unidades Físicas"}}
                        />

                        <KPIs
                            title="Capital Invertido"
                            value={formatCurrency(data.metrics.totalInvestedCapital)}
                            icon={ChartLineIcon}
                            iconClassName="text-green-600"
                            badge={{ text: "Costo de inventario", className: "text-green-600" }}
                        />

                        <KPIs
                            title="Stock Crítico"
                            value={data.metrics.criticalStockItems}
                            icon={WarningCircleIcon}
                            iconClassName={data.metrics.criticalStockItems > 0
                                ? "text-amber-600"
                                : "text-green-600"
                            }
                            badge={data.metrics.criticalStockItems > 0
                                ? { text: "Necesitan reposición", className: "text-amber-600" }
                                : { text: "Stock saludable", className: "text-green-600" }
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <InventoryListCard
                            title="Top Ventas"
                            icon={<StarIcon size={24} weight="fill" className="text-green-600" />}
                            items={topSalesItems}
                            emptyMessage="Aún no hay suficientes datos de ventas."
                        />

                        <InventoryListCard
                            title="Prendas Estancadas"
                            icon={<ClockIcon size={24} weight="fill" className="text-amber-600" />}
                            items={slowMovingItems}
                            emptyMessage="¡Excelente! Todo tu inventario está rotando."
                        />

                        <InventoryListCard
                            title="Agotados (Stock 0)"
                            icon={<WarningCircleIcon size={24} weight="fill" className="text-red-600" />}
                            items={outOfStockItems}
                            emptyMessage="No tienes productos agotados."
                        />
                    </div>
                </>
            )}
        </section>
    );
}