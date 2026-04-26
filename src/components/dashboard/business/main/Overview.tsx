'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Users, Package, TrendingUp, BarChart3, AlertTriangle, ArrowUpRight, Copy, Check, X, Share2 } from 'lucide-react';
import { useDashboardStats } from '@/hooks/admin/useDashboardStats';
import { StatCard } from '@/components/dashboard/business/ui/StatCard';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { SalesChart } from './ui/SalesChart';
import Modal from './categories/ui/Modal';

export default function Overview() {
  const { data: session } = useSession();
  const { stats, isLoading, error, fetchStats } = useDashboardStats();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleCopy = () => {
    const url = `${window.location.origin}/${session?.user?.tenantSlug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

            <article className="bg-navy text-white p-10 rounded-[40px] shadow-2xl shadow-navy/20 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110" />
              
              <div className="relative z-10 space-y-6">
                <div className="bg-white/10 w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                  <Package size={32} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight leading-tight">
                    Tu tienda está lista.
                  </h3>
                  <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[240px]">
                    Comparte tu catálogo público y empieza a recibir pedidos hoy mismo.
                  </p>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-3 mt-8">
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/5"
                >
                  <Share2 size={18} /> Compartir Link
                </button>
                <a 
                  href={`/${session?.user?.tenantSlug}`} 
                  target="_blank"
                  className="w-full py-4 rounded-2xl bg-white text-navy hover:bg-white/90 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10"
                >
                  <ArrowUpRight size={18} /> Ir a la tienda
                </a>
              </div>
            </article>
          </section>
        </>
      )}

      {/* Modal para compartir */}
      <Modal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        title="Compartir Catálogo"
        description="Atrae más clientes permitiendo que cualquiera vea tus productos y realice pedidos."
        icon={<Share2 size={32} className="text-navy" />}
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Enlace Público</label>
            <div className="flex flex-col gap-3">
              <input 
                readOnly
                className="w-full px-6 py-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] font-bold text-navy text-sm outline-none"
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/${session?.user?.tenantSlug}`}
              />
              <button 
                onClick={handleCopy}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl ${
                  copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-navy text-white hover:bg-navy/90 shadow-navy/20'
                }`}
              >
                {copied ? <><Check size={18} /> ¡Copiado con éxito!</> : <><Copy size={18} /> Copiar Enlace</>}
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
             <button 
              onClick={() => setIsShareModalOpen(false)}
              className="text-secondary text-xs font-black uppercase tracking-[0.15em] hover:text-navy transition-colors"
            >
              Cerrar Ventana
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
