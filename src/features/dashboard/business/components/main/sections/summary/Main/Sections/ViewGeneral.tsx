"use client";

import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import { GeneralStats } from "@/features/dashboard/business/api/dashboard.api";
import { Wallet, AlertTriangle, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import KPIs from "@/features/dashboard/business/components/main/sections/summary/Main/ui/KPIs";
import { SalesTrendCard } from "@/features/dashboard/business/components/main/sections/summary/Main/ui/SalesTrendCard";

export default function ViewGeneral({ activeTab }: { activeTab: string; }) {
    const { data, isLoading, error } = useTabStats<GeneralStats>(activeTab);

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

            {isLoading && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <KPIs
                            title="Ventas del día"
                            value={formatCurrency(data.salesToday.totalRevenue)}
                            icon={ShoppingCart}
                            badge={{ text: `${data.salesToday.totalOrders} venta${data.salesToday.totalOrders !== 1 ? "s" : ""}` }}
                            footer={
                                <p className="text-xs text-primary/50">
                                    Ingresos acumulados del período consultado
                                </p>
                            }
                        />

                        <KPIs
                            title="Abonos recibidos"
                            value={formatCurrency(data.paymentsToday.totalRevenue)}
                            icon={Wallet}
                            iconClassName="bg-emerald-50 text-emerald-600"
                            badge={data.paymentsToday.totalPayments > 0
                                ? {
                                    text: `${data.paymentsToday.totalPayments} abono${data.paymentsToday.totalPayments !== 1 ? "s" : ""}`,
                                    className: "text-emerald-700 bg-emerald-50 border-emerald-100",
                                }
                                : undefined
                            }
                            footer={
                                <p className="text-xs text-primary/50">
                                    {data.paymentsToday.totalPayments === 0
                                        ? "No se registraron abonos"
                                        : "Pagos realizados por clientes con deuda"}
                                </p>
                            }
                        />

                        <KPIs
                            title="Alertas críticas"
                            value={data.urgentAlerts.total}
                            icon={AlertTriangle}
                            iconClassName={data.urgentAlerts.total > 0
                                ? "bg-amber-100 text-amber-600"
                                : "bg-primary text-background"
                            }
                            valueClassName={data.urgentAlerts.total > 0
                                ? "text-amber-700"
                                : "text-primary"
                            }
                            badge={data.urgentAlerts.total > 0
                                ? { text: "REQUIERE ATENCIÓN", className: "text-amber-700 bg-amber-100 border-amber-200 animate-pulse" }
                                : undefined
                            }
                            footer={
                                <ul className="space-y-0.5">
                                    {data.urgentAlerts.zeroStockCount > 0 && (
                                        <li className="text-xs text-amber-600 font-medium">
                                            {data.urgentAlerts.zeroStockCount} producto
                                            {data.urgentAlerts.zeroStockCount !== 1 ? "s" : ""} sin stock
                                        </li>
                                    )}

                                    {data.urgentAlerts.severeDebtsCount > 0 && (
                                        <li className="text-xs text-amber-600 font-medium">
                                            {data.urgentAlerts.severeDebtsCount} deuda
                                            {data.urgentAlerts.severeDebtsCount !== 1 ? "s" : ""} crítica
                                            {data.urgentAlerts.severeDebtsCount !== 1 ? "s" : ""}
                                        </li>
                                    )}

                                    {data.urgentAlerts.total === 0 && (
                                        <li className="text-xs text-primary/80 font-medium">
                                            Todo está bajo control
                                        </li>
                                    )}
                                </ul>
                            }
                        />

                    </div>

                    <SalesTrendCard salesTrend={data.salesTrend} />
                </>
            )}
        </section>
    );
}