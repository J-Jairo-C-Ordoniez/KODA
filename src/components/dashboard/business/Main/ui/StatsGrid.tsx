import { ShoppingCart, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/business/ui/StatCard';
import { DashboardStats } from '@/hooks/admin/useDashboardStats';

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(n);

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
          change={COP(stats.salesToday.totalRevenue)}
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
          change={COP(stats.salesMonth.totalRevenue)}
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
