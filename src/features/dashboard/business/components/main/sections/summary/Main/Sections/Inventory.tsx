'use client';

import { formatCurrency } from '@/lib/formatters';
import { AlertTriangle, TrendingUp, Clock, Package, Star } from 'lucide-react';
import KPIs from "@/features/dashboard/business/components/main/sections/summary/Main/ui/KPIs";
import { InventoryListCard, InventoryListItem } from "@/features/dashboard/business/components/main/sections/summary/Main/ui/InventoryListCard";

// 1. Interfaces basadas EXACTAMENTE en tu esquema de Prisma
export interface InventoryMetrics {
    totalPhysicalItems: number; // Suma de Inventory.stock
    totalInvestedCapital: number; // Suma de (Inventory.stock * Variant.cost)
    criticalStockItems: number; // Count de Inventory donde stock > 0 y stock <= 3
}

export interface TopVariant {
    variantId: string;
    productName: string; // Relación: Variant -> Product.name
    size: string; // Variant.size
    stock: number; // Relación: Variant -> Inventory.stock
    totalSold: number; // Suma de SaleItem.quantity
}

export interface StagnantVariant {
    variantId: string;
    productName: string;
    size: string;
    stock: number;
    daysWithoutSale: number; // Calculado comparando hoy con el último SaleItem.createdAt
}

export interface OutOfStockVariant {
    variantId: string;
    productName: string;
    size: string;
    sku: string; // Variant.sku
}

export default function Inventory({ activeTab }: { activeTab: string }) {
    // 2. Datos simulados listos para ser reemplazados por tu custom hook (ej. useTabStats)
    const metrics: InventoryMetrics = {
        totalPhysicalItems: 342,
        totalInvestedCapital: 9480000,
        criticalStockItems: 1
    };

    const dbTopSales: TopVariant[] = [
        { variantId: 'v1', productName: "Jean Cargo Negro", size: "M", stock: 12, totalSold: 24 },
        { variantId: 'v2', productName: "Camiseta Oversize Blanca", size: "L", stock: 9, totalSold: 18 },
        { variantId: 'v3', productName: "Gorra Special", size: "Única", stock: 25, totalSold: 15 },
    ];

    const dbStagnant: StagnantVariant[] = [
        { variantId: 'v4', productName: "Buzo Hilo Beige", size: "S", stock: 8, daysWithoutSale: 45 },
        { variantId: 'v5', productName: "Vestido Satin Rojo", size: "M", stock: 5, daysWithoutSale: 38 },
    ];

    const dbOutOfStock: OutOfStockVariant[] = [
        { variantId: 'v6', productName: "Crop Top Rib Fucsia", size: "S", sku: "CR-RIB-FUC-S" },
        { variantId: 'v7', productName: "Jogger Gris Oxford", size: "M", sku: "JG-GRS-OXF-M" },
    ];

    const topSalesItems: InventoryListItem[] = dbTopSales.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `En stock: ${item.stock} uds.`,
        badgeText: `${item.totalSold} vendidos`,
        badgeStyles: "text-emerald-600 font-semibold text-xs"
    }));

    const slowMovingItems: InventoryListItem[] = dbStagnant.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `En stock: ${item.stock} uds.`,
        badgeText: `${item.daysWithoutSale} días sin salir`,
        badgeStyles: "text-amber-600 font-semibold text-xs"
    }));

    const outOfStockItems: InventoryListItem[] = dbOutOfStock.map(item => ({
        id: item.variantId,
        title: `${item.productName} (${item.size})`,
        subtitle: `SKU: ${item.sku}`,
        badgeText: "Pedir urgente",
        badgeStyles: "text-red-600 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1"
    }));

    return (
        <section className="space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-xl font-bold text-primary tracking-tight">
                    Rendimiento de Inventario
                </h2>
                <p className="text-primary/50 text-sm font-medium mt-1 max-w-3xl">
                    Supervisa la rotación de tus productos. Identifica oportunidades de venta y prevé quiebres de stock antes de que afecten tus ingresos.
                </p>
            </header>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <KPIs
                    title="Prendas en Stock"
                    value={metrics.totalPhysicalItems}
                    icon={Package}
                    iconClassName="bg-primary/5 text-primary/70"
                    badge={{ text: "Unidades Físicas", className: "text-primary/60 bg-transparent border-transparent px-0" }}
                />

                <KPIs
                    title="Capital Invertido"
                    value={formatCurrency(metrics.totalInvestedCapital)}
                    icon={TrendingUp}
                    iconClassName="bg-emerald-50 text-emerald-600"
                    badge={{ text: "Costo de inventario", className: "text-emerald-600 bg-transparent border-transparent px-0" }}
                />

                <KPIs
                    title="Stock Crítico"
                    value={metrics.criticalStockItems}
                    icon={AlertTriangle}
                    iconClassName="bg-red-50 text-red-500"
                    badge={{ text: "Necesitan reposición", className: "text-red-500 bg-transparent border-transparent px-0" }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <InventoryListCard
                    title="Top Ventas"
                    icon={<Star size={18} className="text-emerald-500" />}
                    items={topSalesItems}
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
        </section>
    );
}