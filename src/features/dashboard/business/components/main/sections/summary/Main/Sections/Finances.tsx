import { Wallet, TrendingUp, PiggyBank } from 'lucide-react';
import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import { FinanceStats } from "@/features/dashboard/business/api/dashboard.api";
import { formatCurrency, formatPercentage } from '@/lib/formatters';

import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";
import KPIs from "@/features/dashboard/business/components/main/sections/summary/Main/ui/KPIs";
import PendingCollectionsCard from '@/features/dashboard/business/components/main/sections/summary/Main/ui/PendingCollectionsCard';
import ProfitMarginCard from '@/features/dashboard/business/components/main/sections/summary/Main/ui/ProfitMarginCard';


export default function Finances({ activeTab }: { activeTab: string; }) {
    const { data, isLoading, error } = useTabStats<FinanceStats>(activeTab);
    return (
        <section className="space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Finanzas y Cuentas por Cobrar
                </h2>
                <p className="text-gray-500 text-base mt-1 max-w-2xl">
                    Control de liquidez, dinero en la calle y utilidades estimadas.
                </p>
            </header>
            {isLoading && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <KPIs
                            title="Ventas Mes Actual"
                            value={formatCurrency(data.salesMonth.totalRevenue)}
                            icon={TrendingUp}
                            iconClassName="bg-blue-50 text-blue-600"
                            badge={{
                                text: `${data.salesMonth.totalOrders} ventas`,
                                className: "bg-emerald-50 text-emerald-700 border-emerald-100"
                            }}
                            footer={
                                <p className="text-xs text-primary/50">
                                    Ingresos acumulados del período consultado
                                </p>
                            }
                        />

                        <KPIs
                            title="Utilidad del Mes"
                            value={formatCurrency(data.profitMonth.totalProfit)}
                            icon={PiggyBank}
                            iconClassName={data.profitMonth.totalProfit >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}
                            valueClassName={data.profitMonth.totalProfit >= 0 ? "text-primary" : "text-red-600"}
                            badge={{
                                text: `${formatPercentage(data.profitMonth.margin)} ${data.profitMonth.totalProfit >= 0 ? 'margen' : 'pérdida'}`,
                                className: data.profitMonth.totalProfit >= 0
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                    : "bg-red-50 text-red-700 border-red-100 font-bold"
                            }}
                            footer={
                                <p className="text-xs text-primary/50">
                                    {data.profitMonth.totalProfit >= 0
                                        ? "Ganancia obtenida después del costo de los productos"
                                        : "Los costos declarados superaron los ingresos del mes"}
                                </p>
                            }
                        />

                        <KPIs
                            title="Dinero en la Calle"
                            value={formatCurrency(data.debtCustomers.totalDebt)}
                            icon={Wallet}
                            iconClassName="bg-amber-50 text-amber-600"
                            badge={{
                                text: `${data.debtCustomers.totalCustomersWithDebt} deudores`,
                                className: "bg-gray-100 text-gray-600 border-gray-200"
                            }}
                            footer={
                                <p className="text-xs text-primary/50">
                                    Dinero que no se ha cobrado
                                </p>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PendingCollectionsCard debtors={data.topDebtors} />
                        <ProfitMarginCard profitData={data.profitMonth} />
                    </div>
                </>
            )
            }
        </section >
    );
}