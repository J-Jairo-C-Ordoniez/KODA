import { formatCurrency } from '@/lib/formatters';
import { Wallet, TrendingUp, Percent, Info } from 'lucide-react';
import { DashboardStats } from '@/features/dashboard/business/hooks/useDashboardStats';
/* import KPIs from '@/features/business/dashboard/components/Summary/Main/ui/KPIs';
import PendingCollectionsCard, { Debtor } from '@/features/business/dashboard/components/Summary/Main/ui/PendingCollectionsCard';
import PaymentMethodsCard, { PaymentStat } from '@/features/business/dashboard/components/Summary/Main/ui/PaymentMethodsCard'; */


interface FinancesProps {
    stats: DashboardStats | null;
}

export default function Finances({ stats }: FinancesProps) {
    const totalRevenue = stats?.salesMonth?.totalRevenue ?? 0;

    // modificar por datos reales
    /* const mockDebtors: Debtor[] = [
        {
            id: "cuid1_maria",
            name: "Maria Camila Ortiz",
            phone: "3001234567",
            totalDebt: 180000,
            daysPending: 35,
            isOverdue: true
        },
        {
            id: "cuid2_andres",
            name: "Andrés Felipe Ramos",
            phone: "3159876543",
            totalDebt: 120000,
            daysPending: 8,
            isOverdue: false
        },
        {
            id: "cuid3_liliana",
            name: "Liliana Restrepo",
            phone: "3204567890",
            totalDebt: 95000,
            daysPending: 45,
            isOverdue: true
        }
    ]; */

    // modificar por datos reales
    /* const mockPaymentStats: PaymentStat[] = [
        { method: 'transfer', amount: 3250000, percentage: 65 },
        { method: 'cash', amount: 1250000, percentage: 25 },
        { method: 'debt', amount: 500000, percentage: 10 },
    ];
 */
    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Finanzas y Cuentas por Cobrar
                </h2>
                <p className="text-primary/50 text-lg font-medium mt-1">
                    Control de liquidez, dinero en la calle y utilidades estimadas.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <KPIs
                    title="Ventas Mes Actual"
                    value={formatCurrency(totalRevenue)}
                    icon={TrendingUp}
                    iconClassName="bg-blue-50 text-blue-600"
                    badge={{
                        text: `${stats?.salesMonth?.totalOrders ?? 0} ventas`,
                        className: "bg-emerald-50 text-emerald-700 border-emerald-100"
                    }}
                /> */}

                {/* revisarel valor de los abonos y el valor total adeudado en la calle */}
                {/* <KPIs
                    title="Dinero en la Calle"
                    value={formatCurrency(1820000)}
                    icon={Wallet}
                    iconClassName="bg-amber-50 text-amber-600"
                    badge={{
                        text: `${stats?.debtCustomers?.totalCustomersWithDebt ?? 0} deudores`,
                        className: "bg-gray-100 text-gray-600 border-gray-200"
                    }}
                /> */}

                {/* revisar traer los datos de la api para la utilidad y el margen de utilidad  */}
                {/* <KPIs
                    title="Utilidad Estimada"
                    value={formatCurrency(totalRevenue * 0.42)}
                    icon={Percent}
                    iconClassName="bg-emerald-50 text-emerald-600"
                    badge={{
                        text: "Margen est. 42%",
                        className: "bg-emerald-50 text-emerald-700 border-emerald-100"
                    }}
                /> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* <PendingCollectionsCard debtors={mockDebtors} />
                <PaymentMethodsCard stats={mockPaymentStats} /> */}
            </div>
        </section>
    );
}