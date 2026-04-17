import StatCard from './StatCard';
import { ShoppingBag, DollarSign, Package } from 'lucide-react';

export default function SalesGlobalMetrics({ totalRevenue, salesCount, totalItems }) {
    const metrics = [
        {
            title: 'Ingresos Totales',
            value: `$${Number(totalRevenue).toLocaleString('es-CO')}`,
            sub: 'Acumulado histórico',
            icon: DollarSign
        },
        {
            title: 'Ventas Totales',
            value: `+${salesCount}`,
            sub: 'Transacciones exitosas',
            icon: ShoppingBag,
        },
        {
            title: 'Estado Inventario',
            value: totalItems,
            sub: 'Unidades en almacén',
            icon: Package,
        },
    ];

    return (
        <div className="grid gap-4 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {metrics.map((m) => (
                <StatCard key={m.title} {...m} />
            ))}
        </div>
    );
}
