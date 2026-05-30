'use client';

import { DollarSign, ShoppingBag, CreditCard } from 'lucide-react';
import { StatCard } from '@/components/Dashboard/business/ui/StatCard';

interface SalesStatsProps {
  stats: any;
}

export function SalesStats({ stats }: SalesStatsProps) {
  if (!stats) return null;

  const totalRevenue = stats.salesMonth.totalRevenue;
  const totalOrders = stats.salesMonth.totalOrders;
  const averageValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Ingresos totales"
        value={`$${totalRevenue.toLocaleString('es-ES')}`}
        icon={DollarSign}
        iconBg="bg-contrast/10"
        iconColor="text-contrast"
        change="+12.5% este mes"
        trend="up"
      />
      <StatCard
        label="Ventas totales"
        value={totalOrders}
        icon={ShoppingBag}
        iconBg="bg-contrast/10"
        iconColor="text-contrast"
      />
      <StatCard
        label="Ticket promedio"
        value={`$${averageValue.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`}
        icon={CreditCard}
        iconBg="bg-contrast/10"
        iconColor="text-contrast"
      />
    </div>
  );
}
