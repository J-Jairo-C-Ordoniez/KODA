'use client';

import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import { formatCurrency } from '@/lib/formatters';
import { AlertTriangle, TrendingUp, Clock, Package, Star } from 'lucide-react';

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
        badgeStyles: "bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-full text-xs"
    })) : [];

    const slowMovingItems: InventoryListItem[] = data ? data.stagnantItems.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `En stock: ${item.stock} uds.`,
        badgeText: `${item.daysWithoutSale} días sin salir`,
        badgeStyles: "bg-amber-50 text-amber-700 font-medium px-2.5 py-1 rounded-full text-xs"
    })) : [];

    const outOfStockItems: InventoryListItem[] = data ? data.outOfStockItems.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `SKU: ${item.sku}`,
        badgeText: "Pedir urgente",
        badgeStyles: "bg-red-50 text-red-600 font-bold uppercase text-[10px] tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1"
    })) : [];

    return (
        <section className="space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Rendimiento de Inventario
                </h2>
                <p className="text-gray-500 text-base mt-1 max-w-2xl">
                    Supervisa la rotación de tus productos.
                </p>
            </header>

            {isLoading && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <KPIs
                            title="Prendas en Stock"
                            value={data.metrics.totalPhysicalItems}
                            icon={Package}
                            iconClassName="bg-primary/5 text-primary/70"
                            badge={{ text: "Unidades Físicas", className: "text-primary/60 bg-transparent border-transparent px-0" }}
                        />

                        <KPIs
                            title="Capital Invertido"
                            value={formatCurrency(data.metrics.totalInvestedCapital)}
                            icon={TrendingUp}
                            iconClassName="bg-emerald-50 text-emerald-600"
                            badge={{ text: "Costo de inventario", className: "text-emerald-600 bg-transparent border-transparent px-0" }}
                        />

                        <KPIs
                            title="Stock Crítico"
                            value={data.metrics.criticalStockItems}
                            icon={AlertTriangle}
                            iconClassName={data.metrics.criticalStockItems > 0
                                ? "bg-amber-50 text-amber-500"
                                : "bg-primary/5 text-primary/70"
                            }
                            badge={data.metrics.criticalStockItems > 0
                                ? { text: "Necesitan reposición", className: "text-amber-600 bg-transparent border-transparent px-0" }
                                : { text: "Stock saludable", className: "text-emerald-600 bg-transparent border-transparent px-0" }
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <InventoryListCard
                            title="Top Ventas"
                            icon={<Star size={18} className="text-emerald-500" />}
                            items={topSalesItems}
                            emptyMessage="Aún no hay suficientes datos de ventas."
                        />

                        <InventoryListCard
                            title="Prendas Estancadas"
                            icon={<Clock size={18} className="text-amber-500" />}
                            items={slowMovingItems}
                            emptyMessage="¡Excelente! Todo tu inventario está rotando."
                        />

                        <InventoryListCard
                            title="Agotados (Stock 0)"
                            icon={<AlertTriangle size={18} className="text-red-500" />}
                            items={outOfStockItems}
                            emptyMessage="No tienes productos agotados."
                        />
                    </div>
                </>
            )}
        </section>
    );
}