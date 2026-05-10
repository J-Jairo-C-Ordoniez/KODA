'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ShoppingCart, Users, Package, TrendingUp, BarChart3,
  AlertTriangle, ArrowUpRight, Copy, Check, Share2, Sparkles, Zap
} from 'lucide-react';
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
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  useGSAP(() => {
    if (!isLoading && !error && stats) {
      const tl = gsap.timeline();
      tl.fromTo('.overview-stats > *', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
      .fromTo('.overview-chart',
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' },
        '-=0.6'
      )
      .fromTo('.overview-cta',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      );
    }
  }, { scope: containerRef, dependencies: [isLoading, error, stats] });

  const handleCopy = () => {
    const url = `${window.location.origin}/${session?.user?.tenantSlug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const user = session?.user?.name || 'tu negocio';

  return (
    <main ref={containerRef} className="space-y-10 bg-background w-full min-h-full pt-8 px-4 sm:px-6 lg:px-10 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <SectionHeader
          title={`Bienvenido, ${user}`}
          subtitle="Esto es lo que está pasando en tu negocio hoy."
        />
        {!isLoading && !error && (
          <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-contrast/5 border border-contrast/10 rounded-2xl animate-pulse">
            <Zap size={14} className="text-contrast" />
            <p className="text-[10px] font-black uppercase tracking-widest text-contrast">Sistema Activo y Sincronizado</p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-[50vh]">
          <Loader size="lg" />
        </div>
      )}

      {error && (
        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[32px] flex items-center gap-4">
          <AlertTriangle className="text-red-400 shrink-0" size={24} />
          <p role="alert" className="text-red-400 text-sm font-bold uppercase tracking-tight">
            {error}
          </p>
        </div>
      )}

      {!isLoading && !error && stats && (
        <>
          {/* Stat cards */}
          <section aria-label="Estadísticas del negocio" className="overview-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Ventas Hoy"
              value={stats.salesToday.totalOrders ?? '0'}
              icon={ShoppingCart}
              iconBg="bg-contrast/10"
              iconColor="text-contrast"
              change={new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(stats.salesToday.totalRevenue)}
              trend="up"
            />
            <StatCard
              label="Ventas (30 días)"
              value={stats.salesMonth.totalOrders || 0}
              icon={TrendingUp}
              iconBg="bg-success/10"
              iconColor="text-success"
              change={new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(stats.salesMonth.totalRevenue)}
              trend="up"
            />
            <StatCard
              label="Clientes con Fiado"
              value={stats.debtCustomers.totalCustomersWithDebt ?? '0'}
              icon={Users}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-400"
            />
            <StatCard
              label="Stock Bajo"
              value={stats.lowStockItems.totalLowStockItems ?? '0'}
              icon={AlertTriangle}
              iconBg="bg-red-500/10"
              iconColor="text-red-400"
            />
          </section>

          {/* Charts + CTA */}
          <section aria-label="Gráficos y acciones" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales chart */}
            <article className="overview-chart lg:col-span-2 bg-background-elevated/50 lg:bg-background-elevated border border-white/5 lg:border-white/10 p-8 rounded-[40px] shadow-2xl shadow-black/10">
              <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground-muted">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary tracking-tight">Tendencia de Ventas</h2>
                    <p className="text-foreground-muted text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-60">Rendimiento de los últimos 30 días</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-xl text-[10px] font-black uppercase tracking-widest border border-success/20">
                  <TrendingUp size={12} aria-hidden="true" />
                  Crecimiento Positivo
                </div>
              </header>

              <div className="min-h-[300px]">
                {stats.salesTrend && stats.salesTrend.length > 0 ? (
                  <SalesChart data={stats.salesTrend} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 opacity-20 space-y-4" aria-label="Sin datos disponibles">
                    <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center">
                      <BarChart3 size={40} className="text-foreground-muted" aria-hidden="true" />
                    </div>
                    <p className="font-black text-foreground-muted text-[10px] uppercase tracking-widest">No hay datos suficientes para proyectar</p>
                  </div>
                )}
              </div>
            </article>

            {/* Catalog CTA */}
            <article className="overview-cta bg-background-elevated border border-white/10 hover:border-contrast/30 p-10 rounded-[40px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 group shadow-2xl shadow-black/20">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-contrast/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-contrast/20 transition-all duration-700" aria-hidden="true" />

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-contrast/10 border border-contrast/20 rounded-3xl flex items-center justify-center shadow-lg shadow-contrast/5 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles size={30} className="text-contrast" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-black text-primary tracking-tight leading-tight">
                    Tu tienda digital<br/><span className="text-contrast">está lista.</span>
                  </h2>
                  <p className="text-foreground-muted text-sm font-medium leading-relaxed opacity-80">
                    Tu catálogo ya es público. Compártelo para recibir pedidos por WhatsApp de forma automática.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-4 mt-12">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-full py-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-primary font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-white/5 active:scale-95"
                >
                  <Share2 size={16} aria-hidden="true" /> Compartir Catálogo
                </button>
                <a
                  href={`/${session?.user?.tenantSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-contrast text-white hover:bg-contrast-hover font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl shadow-contrast/20 active:scale-95"
                >
                  <ArrowUpRight size={18} aria-hidden="true" /> Ver mi tienda
                </a>
              </div>
            </article>
          </section>
        </>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <Modal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          title="Difundir mi Tienda"
        >
          <div className="space-y-8 px-1 py-2">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-contrast/10 rounded-3xl flex items-center justify-center text-contrast">
                <Share2 size={32} />
              </div>
              <div>
                <h3 className="text-lg font-black text-primary">Impulsa tus ventas</h3>
                <p className="text-xs font-medium text-foreground-muted">Cualquiera con este link podrá ver tus productos y comprarte.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted ml-1 opacity-60">Enlace de tu tienda</label>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    readOnly
                    className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-background-elevated font-bold text-contrast text-sm outline-none shadow-inner"
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/${session?.user?.tenantSlug}`}
                  />
                </div>
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-2xl ${
                    copied
                      ? 'bg-success text-white shadow-success/20'
                      : 'bg-contrast text-white hover:bg-contrast-hover shadow-contrast/20'
                  }`}
                >
                  {copied ? <><Check size={18} /> ¡Enlace Copiado!</> : <><Copy size={18} /> Copiar Enlace</>}
                </button>
              </div>
            </div>
            
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-8 py-3 text-foreground-muted text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors"
              >
                Volver al Resumen
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
