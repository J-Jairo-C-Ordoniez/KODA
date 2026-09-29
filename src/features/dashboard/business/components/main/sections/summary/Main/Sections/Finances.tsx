import { WalletIcon, TrendUpIcon, PiggyBankIcon } from '@phosphor-icons/react';
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
        <section className="space-y-5 animate-in fade-in duration-500 py-4 px-10">
            <header>
                <h2 className="text-2xl tracking-tight leading-tight font-bold">
                    Finanzas y Cuentas por Cobrar
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-foreground/75">
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
                            icon={TrendUpIcon}
                            badge={{
                                text: `${data.salesMonth.totalOrders} ventas`,
                                className: "text-green-600"
                            }}
                            footer={
                                <p className="text-sm font-medium leading-relaxed text-foreground/50">
                                    Ingresos acumulados del período consultado
                                </p>
                            }
                        />

                        <KPIs
                            title="Utilidad del Mes"
                            value={formatCurrency(data.profitMonth.totalProfit)}
                            icon={PiggyBankIcon}
                            iconClassName={data.profitMonth.totalProfit >= 0 ? "text-green-600" : "text-red-500"}
                            valueClassName={data.profitMonth.totalProfit >= 0 ? "text-primary" : "text-red-500"}
                            badge={{
                                text: `${formatPercentage(data.profitMonth.margin)} ${data.profitMonth.totalProfit >= 0 ? 'margen' : 'pérdida'}`,
                                className: data.profitMonth.totalProfit >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }}
                            footer={
                                <p className="text-sm font-medium leading-relaxed text-foreground/50">
                                    {data.profitMonth.totalProfit >= 0
                                        ? "Ganancia obtenida después del costo de los productos"
                                        : "Los costos declarados superaron los ingresos del mes"}
                                </p>
                            }
                        />

                        <KPIs
                            title="Dinero en la Calle"
                            value={formatCurrency(data.debtCustomers.totalDebt)}
                            icon={WalletIcon}
                            iconClassName="text-amber-500"
                            badge={{
                                text: `${data.debtCustomers.totalCustomersWithDebt} deudores`,
                                className: "text-primary/60"
                            }}
                            footer={
                                <p className="text-sm font-medium leading-relaxed text-foreground/50">
                                    Dinero que no se ha cobrado
                                </p>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <PendingCollectionsCard debtors={data.topDebtors} />
                        <ProfitMarginCard profitData={data.profitMonth} />
                    </div>
                </>
            )
            }
        </section>
    );
}