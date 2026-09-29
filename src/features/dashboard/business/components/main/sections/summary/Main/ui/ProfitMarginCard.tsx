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
    const costPercentage = totalRevenue > 0 ? Math.min(100, (totalCost / totalRevenue) * 100) : 0;
    const profitPercentage = totalRevenue > 0 ? Math.max(0, (totalProfit / totalRevenue) * 100) : 0;

    return (
        <section
            className="rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-4 sm:p-6 flex flex-col gap-4"
            aria-labelledby="margin-title"
        >
            <header className="flex flex-col gap-1">
                    <h3
                        id="margin-title"
                        className="text-base sm:text-md font-bold leading-relaxed text-foreground/75"
                    >
                        Estructura de Márgenes (Mes)
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-foreground/50">
                        Relación entre costos e ingresos netos
                    </p>
            </header>

            <div className="relative h-2 w-full bg-primary/5 rounded-full overflow-hidden flex">
                <div
                    className={`${isLoss ? 'bg-red-300' : 'bg-primary/15'} h-full transition-all duration-700 ease-out`}
                    style={{ width: `${costPercentage}%` }}
                    title={`Costos: ${formatPercentage(costPercentage)}`}
                />
                <div
                    className="bg-emerald-400 h-full transition-all duration-700 ease-out"
                    style={{ width: `${profitPercentage}%` }}
                    title={`Utilidad: ${formatPercentage(margin)}`}
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isLoss ? 'bg-red-400' : 'bg-primary/20'}`} aria-hidden="true" />
                        <span className="text-sm font-medium leading-relaxed text-foreground/60">
                            Costos
                        </span>
                    </div>
                    <span className="text-base font-bold leading-relaxed text-foreground/75 tabular-nums">
                        {formatCurrency(totalCost)}
                    </span>
                </div>

                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isLoss ? 'bg-red-500' : 'bg-emerald-400'}`} aria-hidden="true" />
                        <span className="text-sm font-medium leading-relaxed text-foreground/60">
                            {isLoss ? 'Pérdida neta' : 'Utilidad'}
                        </span>
                    </div>
                    <span className={`text-base font-bold leading-relaxed tabular-nums ${isLoss ? 'text-red-500' : 'text-emerald-500'}`}>
                        {formatCurrency(totalProfit)}
                    </span>
                </div>
            </div>

            <footer className="mt-2 pt-2 border-t border-primary/10 flex items-center justify-between">
                <span className="text-sm font-medium leading-relaxed text-foreground/50">
                    Ingreso Total (Ventas)
                </span>
                <span className="text-base font-bold leading-relaxed text-foreground/75 tabular-nums">
                    {formatCurrency(totalRevenue)}
                </span>
            </footer>
        </section>
    );
}