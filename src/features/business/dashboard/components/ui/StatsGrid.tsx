import { ShoppingCart, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/features/business/dashboard/components/Summary/Main/ui/StatCard';
import { DashboardStats } from '@/features/business/dashboard/hooks/useDashboardStats';
import { formatCurrency } from '@/lib/formatters';

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section aria-label="Métricas del negocio" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <article className="ov-stat">
        <StatCard
          label="Ventas hoy"
          value={stats.salesToday.totalOrders}
          icon={ShoppingCart}
          iconBg="bg-contrast/10"
          iconColor="text-contrast"
          change={formatCurrency(stats.salesToday.totalRevenue)}
          trend="up"
        />
      </article>
      <article className="ov-stat">
        <StatCard
          label="Ventas 30 días"
          value={stats.salesMonth.totalOrders}
          icon={TrendingUp}
          iconBg="bg-success/10"
          iconColor="text-success"
          change={formatCurrency(stats.salesMonth.totalRevenue)}
          trend="up"
        />
      </article>
      <article className="ov-stat">
        <StatCard
          label="Clientes con fiado"
          value={stats.debtCustomers.totalCustomersWithDebt}
          icon={Users}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />
      </article>
      <article className="ov-stat">
        <StatCard
          label="Stock bajo"
          value={stats.lowStockItems.totalLowStockItems}
          icon={AlertTriangle}
          iconBg="bg-amber-500/10"
          iconColor="text-amber-400"
        />
      </article>
    </section>
  );
}
