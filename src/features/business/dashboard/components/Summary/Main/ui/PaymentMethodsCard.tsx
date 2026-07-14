import { TrendingUp, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

type PaymentMethodType = 'cash' | 'transfer' | 'online' | 'debt';

export interface PaymentStat {
    method: PaymentMethodType;
    amount: number;
    percentage: number;
}

interface PaymentMethodsCardProps {
    stats: PaymentStat[];
}

const METHOD_CONFIG: Record<PaymentMethodType, { label: string; colorClass: string }> = {
    transfer: { label: 'Transferencia', colorClass: 'bg-gray-800' },
    cash: { label: 'Efectivo', colorClass: 'bg-emerald-500' },
    online: { label: 'Pago en Línea', colorClass: 'bg-blue-500' },
    debt: { label: 'Crédito / Fiado', colorClass: 'bg-amber-500' },
};

export default function PaymentMethodsCard({ stats }: PaymentMethodsCardProps) {
    const sortedStats = [...stats].sort((a, b) => b.percentage - a.percentage);

    return (
        <article className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 flex flex-col h-full">
            <h3 className="text-lg font-bold text-primary tracking-tight mb-4 flex items-center gap-2">
                <TrendingUp
                    size={18}
                    aria-hidden="true"
                />
                Métodos de Pago
            </h3>

            <div className="space-y-5 flex-1">
                {sortedStats.length === 0 ? (
                    <p className="text-sm text-primary/60 text-center py-6">
                        No hay datos de pago aún.
                    </p>
                ) : (
                    sortedStats.map((stat) => {
                        const config = METHOD_CONFIG[stat.method];

                        return (
                            <div key={stat.method}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-primary/60 font-medium">
                                        {config.label} ({stat.percentage.toFixed(0)}%)
                                    </span>
                                    <span className="text-primary font-bold">
                                        {formatCurrency(stat.amount)}
                                    </span>
                                </div>
                                <div
                                    className="w-full bg-primary/5 h-3 rounded-full overflow-hidden"
                                    aria-hidden="true"
                                >
                                    <div
                                        className={`${config.colorClass} h-full rounded-full transition-all duration-500`}
                                        style={{ width: `${stat.percentage}%` }}
                                        role="progressbar"
                                        aria-valuenow={stat.percentage}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`Porcentaje de pagos con ${config.label}`}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <aside className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/10 flex gap-3">
                <Info
                    size={20}
                    className="text-primary/60 shrink-0 mt-1"
                    aria-hidden="true"
                />

                <p className="text-xs text-primary/60 leading-relaxed">
                    Distribución calculada automáticamente según el total de ventas registradas en el periodo actual.
                </p>
            </aside>
        </article>
    );
}