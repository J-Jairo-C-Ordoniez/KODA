'use client';

import { useEffect } from 'react';
import Header from '@/components/dashboard/admin/Main/ui/Header';
import Loader from '@/components/ui/Loader';
import Metric from '@/components/dashboard/admin/Main/ui/Metric';
import { useTenantMetrics } from '@/hooks/superAdmin/useTenantMetrics';

export default function Metrics() {
  const { metrics, isLoading, error, fetchMetrics } = useTenantMetrics();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto">
      <Header title="Métricas Generales" />

      {isLoading && <Loader />}
      {error && (
        <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl border border-red-100">
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