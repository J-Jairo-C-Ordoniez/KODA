'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AlertTriangle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useDashboardStats } from '@/hooks/admin/useDashboardStats';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { StatsGrid } from './ui/StatsGrid';
import { SalesTrendCard } from './ui/SalesTrendCard';
import { PlanStatusCard } from './ui/PlanStatusCard';
import { DigitalStoreCTA } from './ui/DigitalStoreCTA';
import { ShareStoreModal } from './ui/ShareStoreModal';

export default function Overview() {
  const { data: session } = useSession();
  const { stats, isLoading, error, fetchStats } = useDashboardStats();
  const [shareOpen, setShareOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  useGSAP(() => {
    if (!isLoading && !error && stats) {
      gsap.fromTo(
        '.ov-stat',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.ov-chart',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      );
      gsap.fromTo(
        '.ov-side',
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', delay: 0.2, stagger: 0.05 }
      );
    }
  }, { scope: containerRef, dependencies: [isLoading, error, stats] });

  return (
    <main
      ref={containerRef}
      className="w-full min-h-full pt-7 px-4 sm:px-6 lg:px-10 pb-24 space-y-8 bg-background"
    >
      <SectionHeader
        title={`Bienvenido, ${session?.user?.name ?? 'tu negocio'}`}
        subtitle="Un vistazo rápido a la salud de tu negocio hoy."
      />

      {isLoading && (
        <div className="flex items-center justify-center h-[50vh]" role="status" aria-label="Cargando estadísticas">
          <Loader size="lg" />
        </div>
      )}

      {error && !isLoading && (
        <div role="alert" className="flex items-center gap-4 bg-red-500/5 border border-red-500/10 p-6 rounded-3xl">
          <AlertTriangle className="text-red-400 shrink-0" size={22} aria-hidden="true" />
          <p className="text-red-400 text-sm font-bold">{error}</p>
        </div>
      )}

      {!isLoading && !error && stats && (
        <>
          <StatsGrid stats={stats} />

          <section
            aria-label="Tendencia y acciones"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <SalesTrendCard salesTrend={stats.salesTrend} />

            <aside className="flex flex-col gap-4">
              <PlanStatusCard subscription={stats.subscription} />
              <DigitalStoreCTA
                tenantSlug={session?.user?.tenantSlug}
                onShare={() => setShareOpen(true)}
              />
            </aside>
          </section>
        </>
      )}

      <ShareStoreModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        tenantSlug={session?.user?.tenantSlug}
      />
    </main>
  );
}
