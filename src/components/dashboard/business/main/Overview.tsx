'use client';

import { useEffect } from 'react';
import { ShoppingCart, Users, Package, TrendingUp, BarChart3, AlertTriangle } from 'lucide-react';
import { useDashboardStats } from '@/hooks/admin/useDashboardStats';
import { StatCard } from '@/components/dashboard/business/ui/StatCard';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';

export default function Overview() {
  const { data: session } = useSession();
  const { stats, isLoading, error, fetchStats } = useDashboardStats();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const businessName = session?.user?.name || 'tu negocio';

  return (
    <div className="space-y-10">
      <SectionHeader
        title={`Bienvenido, ${businessName} 👋`}
        subtitle="Aquí tienes un resumen de tu negocio hoy."
      />

      {isLoading && <Loader />}
      {error && (
        <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl border border-red-100">
          {error}
        </p>
      )}

      {!isLoading && !error && stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Ventas Hoy" value={stats.salesToday ?? '0'} icon={ShoppingCart} change={stats.salesTodayChange} trend="up" />
            <StatCard label="Ingresos del Mes" value={stats.monthlyRevenue ?? '$0'} icon={TrendingUp} color="bg-green-50 text-green-600" />
            <StatCard label="Clientes con Fiado" value={stats.debtCustomers ?? '0'} icon={Users} color="bg-yellow-50 text-yellow-600" />
            <StatCard label="Productos con Stock Bajo" value={stats.lowStock ?? '0'} icon={AlertTriangle} color="bg-red-50 text-red-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-background border border-foreground/5 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-primary tracking-tight">Ventas Recientes</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-16 opacity-40 space-y-3">
                <BarChart3 size={40} className="text-secondary" />
                <p className="font-bold text-secondary">Sin ventas recientes registradas</p>
              </div>
            </div>

            <div className="bg-navy text-white p-8 rounded-3xl shadow-2xl shadow-navy/20 flex flex-col justify-between">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}
