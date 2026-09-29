"use client";

import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import { GeneralStats } from "@/features/dashboard/business/api/dashboard.api";
import { WalletIcon, WarningCircleIcon, ShoppingBagIcon } from "@phosphor-icons/react";
import { formatCurrency } from "@/lib/formatters";

import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import KPIs from "@/features/dashboard/business/components/main/sections/summary/Main/ui/KPIs";
import SalesTrendCard from "@/features/dashboard/business/components/main/sections/summary/Main/ui/SalesTrendCard";

export default function ViewGeneral({ activeTab }: { activeTab: string; }) {
    const { data, isLoading, error } = useTabStats<GeneralStats>(activeTab);

    return (
        <section className="space-y-5 animate-in fade-in duration-500 py-4 px-3 md:px-6 lg:px-10">
            <header>
                <h2 className="text-2xl tracking-tight leading-tight font-bold">
                    Resumen del día
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-foreground/75">
                    Métricas de ingresos, abonos y alertas operativas en tiempo real.
                </p>
            </header>

            {isLoading && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <KPIs
                            title="Ventas del día"
                            value={formatCurrency(data.salesToday.totalRevenue)}
                            icon={ShoppingBagIcon}
                            badge={{
                                text: `${data.salesToday.totalOrders} venta${data.salesToday.totalOrders !== 1 ? "s" : ""}`
                            }}
                            footer={
                                <p className="text-sm font-medium leading-relaxed text-foreground/50">
                                    Ingresos acumulados del período consultado
                                </p>
                            }
                        />

                        <KPIs
                            title="Abonos recibidos"
                            value={formatCurrency(data.paymentsToday.totalRevenue)}
                            icon={WalletIcon}
                            iconClassName="text-green-600"
                            badge={data.paymentsToday.totalPayments > 0
                                ? {
                                    text: `${data.paymentsToday.totalPayments} abono${data.paymentsToday.totalPayments !== 1 ? "s" : ""}`,
                                    className: "text-green-600",
                                }
                                : undefined
                            }
                            footer={
                                <p className="text-sm font-medium leading-relaxed text-foreground/50">
                                    {data.paymentsToday.totalPayments === 0
                                        ? "No se registraron abonos"
                                        : "Pagos realizados por clientes con deuda"}
                                </p>
                            }
                        />

                        <KPIs
                            title="Alertas críticas"
                            value={data.urgentAlerts.total}
                            icon={WarningCircleIcon}
                            iconClassName={data.urgentAlerts.total > 0
                                ? "text-amber-600"
                                : "text-primary"
                            }
                            valueClassName={data.urgentAlerts.total > 0
                                ? "text-amber-600"
                                : "text-primary"
                            }
                            badge={data.urgentAlerts.total > 0
                                ? { text: "Requiere atención", className: "text-amber-600" }
                                : undefined
                            }
                            footer={
                                <ul className="space-y-0.5">
                                    {data.urgentAlerts.zeroStockCount > 0 && (
                                        <li className="text-sm font-medium leading-relaxed text-amber-600">
                                            {data.urgentAlerts.zeroStockCount} producto
                                            {data.urgentAlerts.zeroStockCount !== 1 ? "s" : ""} sin stock
                                        </li>
                                    )}

                                    {data.urgentAlerts.severeDebtsCount > 0 && (
                                        <li className="text-sm font-medium leading-relaxed text-amber-600">
                                            {data.urgentAlerts.severeDebtsCount} deuda
                                            {data.urgentAlerts.severeDebtsCount !== 1 ? "s" : ""} crítica
                                            {data.urgentAlerts.severeDebtsCount !== 1 ? "s" : ""}
                                        </li>
                                    )}

                                    {data.urgentAlerts.total === 0 && (
                                        <li className="text-sm font-medium leading-relaxed text-primary/50">
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