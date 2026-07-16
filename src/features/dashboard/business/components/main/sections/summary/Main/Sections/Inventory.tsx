'use client';

import { formatCurrency } from '@/lib/formatters';
import { AlertTriangle, TrendingUp, Clock, Package, Star } from 'lucide-react';
// Asumiendo que StatCard es tu componente de KPIs original adaptado a estos colores
/* import KPIs from '@/features/business/dashboard/components/Summary/Main/ui/KPIs';
import { InventoryListCard, InventoryListItem } from '@/features/business/dashboard/components/Summary/Main/ui/InventoryListCard'; */
import { DashboardStats } from '@/features/dashboard/business/hooks/useTabStats';

interface InventoryProps {
    stats: DashboardStats | null;
}

export default function Inventory({ stats }: InventoryProps) {
    // ----------------------------------------------------------------------
    // MOCKS: Esta data la construirías en tu backend cruzando Product, Variant e Inventory
    // ----------------------------------------------------------------------
    /* const topSalesItems: InventoryListItem[] = [
        { id: 'v1', title: "Jean Cargo Negro (M)", subtitle: "En stock: 12 uds.", badgeText: "24 vendidos", badgeStyles: "text-emerald-700 bg-emerald-50 border-emerald-100" },
        { id: 'v2', title: "Camiseta Oversize Blanca (L)", subtitle: "En stock: 9 uds.", badgeText: "18 vendidos", badgeStyles: "text-emerald-700 bg-emerald-50 border-emerald-100" },
        { id: 'v3', title: "Gorra Special (Única)", subtitle: "En stock: 25 uds.", badgeText: "15 vendidos", badgeStyles: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    ];

    const slowMovingItems: InventoryListItem[] = [
        { id: 'v4', title: "Buzo Hilo Beige (S)", subtitle: "En stock: 8 uds.", badgeText: "45 días sin salir", badgeStyles: "text-amber-700 bg-amber-50 border-amber-200" },
        { id: 'v5', title: "Vestido Satin Rojo (M)", subtitle: "En stock: 5 uds.", badgeText: "38 días sin salir", badgeStyles: "text-amber-700 bg-amber-50 border-amber-200" },
    ];

    const outOfStockItems: InventoryListItem[] = [
        { id: 'v6', title: "Crop Top Rib Fucsia (S)", subtitle: "SKU: CR-RIB-FUC-S", badgeText: "Pedir urgente", badgeStyles: "text-red-700 bg-red-50 border-red-200 uppercase text-[10px] tracking-wider" },
        { id: 'v7', title: "Jogger Gris Oxford (M)", subtitle: "SKU: JG-GRS-OXF-M", badgeText: "Pedir urgente", badgeStyles: "text-red-700 bg-red-50 border-red-200 uppercase text-[10px] tracking-wider" },
    ]; */

    return (
        <section className="space-y-8">
            {/* Encabezado con Copywriting mejorado */}
            <header>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Rendimiento de Inventario
                </h2>
                <p className="text-primary/50 text-lg font-medium mt-1">
                    Supervisa la rotación de tus productos. Identifica rápidamente oportunidades de venta y prevé quiebres de stock antes de que afecten tus ingresos.
                </p>
            </header>

            {/* KPIs con colores semánticos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <KPIs
                    title="Prendas en Stock"
                    value={342}
                    icon={Package}
                    iconClassName="bg-gray-100 text-gray-700" // Neutro
                    badge={{ text: "Unidades Físicas", className: "text-gray-700 bg-gray-100 border-gray-200" }}
                />

                <KPIs
                    title="Capital Invertido"
                    value={formatCurrency(9480000)}
                    icon={TrendingUp}
                    iconClassName="bg-emerald-100 text-emerald-600" // Éxito/Dinero
                    badge={{ text: "Valor de inventario", className: "text-emerald-700 bg-emerald-50 border-emerald-100" }}
                />

                <KPIs
                    title="Stock Crítico"
                    value={stats?.lowStockItems?.totalLowStockItems ?? 1}
                    icon={AlertTriangle}
                    iconClassName="bg-red-100 text-red-600" // Alerta/Peligro
                    badge={{ text: "Necesitan reposición", className: "text-red-700 bg-red-50 border-red-100" }}
                /> */}
            </div>

            {/* Tarjetas de Listas Reutilizando el Componente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* <InventoryListCard
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
                /> */}
            </div>
        </section>
    );
}