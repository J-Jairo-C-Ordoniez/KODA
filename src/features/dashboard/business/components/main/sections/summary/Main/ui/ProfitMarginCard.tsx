import { formatCurrency, formatPercentage } from '@/lib/formatters';

export interface ProfitPeriod {
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
    margin: number;
}

interface ProfitMarginCardProps {
    profitData: ProfitPeriod;
}

export default function ProfitMarginCard({ profitData }: ProfitMarginCardProps) {
    const { totalRevenue, totalCost, totalProfit, margin } = profitData;
    const isLoss = totalProfit < 0;

    // Normalize progress bar width safely (avoiding negative width values)
    const costPercentage = totalRevenue > 0 ? Math.min(100, (totalCost / totalRevenue) * 100) : 0;
    const profitPercentage = totalRevenue > 0 ? Math.max(0, (totalProfit / totalRevenue) * 100) : 0;

    return (
        <section
            className="bg-background-card border border-primary/5 hover:shadow-sm rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col gap-5"
            aria-labelledby="margin-title"
        >
            <header className="flex flex-col gap-3">
                    <h3
                        id="margin-title"
                        className="text-base font-semibold text-primary tracking-tight"
                    >
                        Estructura de Márgenes (Mes)
                    </h3>
                    <p className="text-xs text-primary/60">
                        Relación entre costos e ingresos netos
                    </p>
            </header>

            <div className="relative h-2.5 w-full bg-primary/5 rounded-full overflow-hidden flex">
                <div
                    className={`${isLoss ? 'bg-red-300' : 'bg-primary/20'} h-full transition-all duration-700 ease-out`}
                    style={{ width: `${costPercentage}%` }}
                    title={`Costos: ${formatPercentage(costPercentage)}`}
                />
                <div
                    className="bg-emerald-400 h-full transition-all duration-700 ease-out"
                    style={{ width: `${profitPercentage}%` }}
                    title={`Utilidad: ${formatPercentage(margin)}`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isLoss ? 'bg-red-400' : 'bg-primary/20'}`} aria-hidden="true" />
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider">
                            Costos
                        </span>
                    </div>
                    <span className="text-sm font-bold text-primary tabular-nums">
                        {formatCurrency(totalCost)}
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isLoss ? 'bg-red-500' : 'bg-emerald-400'}`} aria-hidden="true" />
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider">
                            {isLoss ? 'Pérdida Neto' : 'Utilidad'}
                        </span>
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${isLoss ? 'text-red-600' : 'text-emerald-600'}`}>
                        {formatCurrency(totalProfit)}
                    </span>
                </div>
            </div>

            <footer className="mt-1 pt-4 border-t border-primary/5 flex items-center justify-between">
                <span className="text-xs font-medium text-primary/60">
                    Ingreso Total (Ventas)
                </span>
                <span className="text-sm font-bold text-primary tabular-nums">
                    {formatCurrency(totalRevenue)}
                </span>
            </footer>
        </section>
    );
}