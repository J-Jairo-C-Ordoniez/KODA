'use client';

import { useEffect } from 'react';
import { SectionHeader } from '@/components/Dashboard/business/ui/SectionHeader';
import { Plus } from 'lucide-react';
import Loader from '@/components/ui/Loader';
import Metric from '@/components/Dashboard/admin/Main/ui/Metric';
import { useTenantMetrics } from '@/hooks/superAdmin/useTenantMetrics';

export default function Metrics() {
  const { metrics, isLoading, error, fetchMetrics } = useTenantMetrics();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24">
      <SectionHeader
        title="Métricas Generales"
        action={
          <button className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-contrast text-white font-bold text-sm hover:bg-contrast-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-contrast/20">
            <Plus size={16} aria-hidden="true" /> Nuevo Negocio
          </button>
        }
      />

      {isLoading && <Loader />}
      {error && (
        <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl border border-red-100 w-fit">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <Metric key={index} stat={metric} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
