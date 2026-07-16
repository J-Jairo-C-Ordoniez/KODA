'use client';

import { DashboardStats } from '@/features/dashboard/business/hooks/useDashboardStats';
import { SalesTrendCard } from '../ui/SalesTrendCard';
/* import KPIs from '@/features/business/dashboard/components/Summary/Main/ui/KPIs'; */
import { formatCurrency } from '@/lib/formatters';
import { ShoppingCart, Wallet, AlertTriangle } from 'lucide-react';

interface ViewGeneralProps {
    stats: DashboardStats | null;
}

export default function ViewGeneral({ stats }: ViewGeneralProps) {
    const alerts = stats?.urgentAlerts;
    const hasAlerts = (alerts?.total ?? 0) > 0;
    const paymentsCount = stats?.paymentsToday?.totalPayments ?? 0;

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Resumen del día
                </h2>
                <p className="text-primary/50 text-lg font-medium mt-1">
                    Métricas de ingresos, abonos y alertas operativas en tiempo real.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <KPIs
                    title="Ventas Hoy"
                    value={formatCurrency(stats?.salesToday?.totalRevenue ?? 0)}
                    icon={ShoppingCart}
                    badge={{ text: `${stats?.salesTodayItems?.totalItems ?? 0} prendas` }}
                    footer={
                        <p className="text-xs text-primary/50">
                            <strong className="text-primary">
                                {stats?.salesToday?.totalOrders ?? 0}
                            </strong> {stats?.salesToday?.totalOrders !== 1 ? 'transacciones registradas' : 'transacción registrada'}
                        </p>
                    }
                />

                <KPIs
                    title="Ingresos por Abonos"
                    value={formatCurrency(stats?.paymentsToday?.totalRevenue ?? 0)}
                    icon={Wallet}
                    iconClassName="bg-emerald-50 text-emerald-600"
                    badge={paymentsCount > 0 ? {
                        text: `${paymentsCount} abono${paymentsCount !== 1 ? 's' : ''}`,
                        className: "text-emerald-700 bg-emerald-50 border-emerald-100"
                    } : undefined}

                    footer={
                        <p className="text-xs text-primary/50">
                            {paymentsCount === 0
                                ? 'Sin pagos de fiados hoy'
                                : 'Recaudado de clientes con fiado'}
                        </p>
                    }
                />

                <KPIs
                    title="Alertas Urgentes"
                    value={alerts?.total ?? 0}
                    icon={AlertTriangle}
                    iconClassName={hasAlerts ? 'bg-amber-100 text-amber-600' : 'bg-primary text-background'}
                    valueClassName={hasAlerts ? 'text-amber-700' : 'text-primary'}
                    badge={hasAlerts ? {
                        text: "REQUIERE ATENCIÓN",
                        className: "text-amber-700 bg-amber-100 border-amber-200 animate-pulse"
                    } : undefined}
                    footer={
                        <ul className="space-y-0.5">
                            {(alerts?.zeroStockCount ?? 0) > 0 && (
                                <li className="text-xs text-amber-600 font-medium">
                                    {alerts!.zeroStockCount} variante{alerts!.zeroStockCount !== 1 ? 's' : ''} sin stock
                                </li>
                            )}
                            {(alerts?.severeDebtsCount ?? 0) > 0 && (
                                <li className="text-xs text-amber-600 font-medium">
                                    {alerts!.severeDebtsCount} deuda{alerts!.severeDebtsCount !== 1 ? 's' : ''} vencida{alerts!.severeDebtsCount !== 1 ? 's' : ''} (+30 días)
                                </li>
                            )}
                            {!hasAlerts && (
                                <li className="text-xs text-primary/80 font-medium">
                                    Sin alertas urgentes hoy
                                </li>
                            )}
                        </ul>
                    }
                /> */}
            </div>

            <SalesTrendCard salesTrend={stats?.salesTrend} />
        </section>
    );
}