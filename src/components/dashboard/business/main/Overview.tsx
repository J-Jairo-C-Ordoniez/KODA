'use client';

import { useEffect } from 'react';
import { ShoppingCart, Users, Package, TrendingUp, BarChart3, AlertTriangle } from 'lucide-react';
import { useDashboardStats } from '@/hooks/admin/useDashboardStats';
import { StatCard } from '@/components/dashboard/business/ui/StatCard';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { SalesChart } from './ui/SalesChart';

export default function Overview() {
  const { data: session } = useSession();
  const { stats, isLoading, error, fetchStats } = useDashboardStats();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const user = session?.user?.name || 'tu negocio';

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto">
      <SectionHeader
        title={`Bienvenido, ${user}`}
        subtitle="Aquí tienes un resumen de tu negocio hoy."
      />

      {isLoading && <Loader />}

      {error && <p className="w-fit text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl border border-red-100">
        {error}
      </p>}

      {!isLoading && !error && stats && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Ventas Hoy"
              value={stats.salesToday.totalOrders ?? '0'}
              icon={ShoppingCart}
              change={new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(stats.salesToday.totalRevenue)}
              trend="up"
            />

            <StatCard
              label="Ventas del Mes"
              value={stats.salesMonth.totalOrders || 0}
              icon={TrendingUp}
              change={new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(stats.salesMonth.totalRevenue)}
              trend="up"
              color="bg-green-50 text-green-600"
            />

            <StatCard
              label="Clientes con Fiado"
              value={stats.debtCustomers.totalCustomersWithDebt ?? '0'}
              icon={Users}
              color="bg-yellow-50 text-yellow-600"
            />

            <StatCard
              label="Productos con Stock Bajo"
              value={stats.lowStockItems.totalLowStockItems ?? '0'}
              icon={AlertTriangle}
              color="bg-red-50 text-red-500"
            />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2 bg-background border border-foreground/5 p-8 rounded-3xl">
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-black text-primary tracking-tight">Tendencia de Ventas</h3>
                  <p className="text-secondary text-xs font-medium uppercase tracking-widest mt-1">Últimos 30 días</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                  <TrendingUp size={14} />
                  Mes Actual
                </div>
              </header>
              
              {stats.salesTrend && stats.salesTrend.length > 0 ? (
                <SalesChart data={stats.salesTrend} />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 opacity-40 space-y-3">
                  <BarChart3 size={40} className="text-secondary" />
                  <p className="font-bold text-secondary">No hay suficientes datos para el gráfico</p>
                </div>
              )}
            </article>

            <article className="bg-navy text-white p-8 rounded-3xl shadow-2xl shadow-navy/20 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-white/10 w-fit p-3 rounded-2xl">
                  <Package size={24} />
                </div>
                <h3 className="text-xl font-black tracking-tight leading-tight">
                  Gestiona tu catálogo y maximiza tus ventas.
                </h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                  Agrega productos, controla el stock y muéstralos en tu catálogo público.
                </p>
              </div>
            </article>
          </section>
        </>
      )}
    </main>
  );
}
