import StatCard from './StatCard';
import { ShoppingBag, TrendingUp, Calendar } from 'lucide-react';

export default function SalesPeriodMetrics({ day, week, month }) {
    const metrics = [
        {
            title: 'Últimas 24 Horas',
            value: `$${Number(day.revenue).toLocaleString('es-CO')} COP`,
            sub: `${day.count} venta${day.count !== 1 ? 's' : ''} hoy`,
            icon: TrendingUp
        },
        {
            title: 'Última Semana',
            value: `$${Number(week.revenue).toLocaleString('es-CO')}`,
            sub: `${week.count} venta${week.count !== 1 ? 's' : ''} registradas`,
            icon: Calendar
        },
        {
            title: 'Último Mes',
            value: `$${Number(month.revenue).toLocaleString('es-CO')}`,
            sub: `${month.count} venta${month.count !== 1 ? 's' : ''} en 30 días`,
            icon: ShoppingBag
        }
    ];

    return (
        <div className="grid gap-4 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {metrics.map((m) => (
                <StatCard key={m.title} {...m} />
            ))}
        </div>
    );
}
