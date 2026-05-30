'use client';

import { useState, useEffect } from 'react';
import { Store, Search, ArrowRight, CheckCircle, XCircle, Plus } from 'lucide-react';
import { SectionHeader } from '@/components/Dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import Metric from '@/components/Dashboard/admin/Main/ui/Metric';
import Table from '@/components/Dashboard/admin/Main/ui/Table';
import { useTenants } from '@/hooks/superAdmin/useTenants';

export default function Ecosystem() {
  const { tenants, totalCount, activeCount, suspendedCount, isLoading, isSearching, error, fetchTenants, fetchCounts, updateStatus } = useTenants();
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTenants(searchQuery, status);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, status, fetchTenants]);

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24">
      <SectionHeader
        title="Ecosistema Koda"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Metric
              stat={{
                label: 'Total Negocios',
                value: `${totalCount}`.padStart(2, '0'),
                icon: Store,
                color: 'bg-foreground/5 text-secondary'
              }}
            />
            <Metric
              stat={{
                label: 'Activos',
                value: `${activeCount}`.padStart(2, '0'),
                icon: CheckCircle,
                color: 'bg-[#00C896]/10 text-[#00C896]'
              }}
            />
            <Metric
              stat={{
                label: 'Suspendidos',
                value: `${suspendedCount}`.padStart(2, '0'),
                icon: XCircle,
                color: 'bg-red-500/10 text-red-400'
              }}
            />
          </div>

          <div className="bg-background-elevated border border-foreground/8 p-6 lg:p-8 rounded-[32px]">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-black text-primary tracking-tight">Negocios Registrados</h3>
                  <p className="text-foreground-muted text-sm font-medium mt-1">Administra y revisa los negocios de la plataforma.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-contrast transition-colors" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar negocio..."
                      className="w-full pl-12 pr-4 py-3.5 bg-background border border-foreground/10 rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all font-medium placeholder:text-secondary/80 text-sm"
                    />
                  </div>

                  <div className="relative group">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-5 py-3.5 bg-background border border-foreground/10 rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all font-bold appearance-none pr-12 text-sm text-primary"
                    >
                      <option value="">Todos</option>
                      <option value="active">Activos</option>
                      <option value="noVerify">Pendientes</option>
                      <option value="suspended">Suspendidos</option>
                    </select>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary rotate-90 pointer-events-none" size={16} />
                  </div>
                </div>
              </header>

              <Table
                columns={[
                  { accessorKey: 'slug', header: 'SLUG' },
                  { accessorKey: 'businessName', header: 'Negocio' },
                  { accessorKey: 'plan', header: 'Plan' },
                  { accessorKey: 'status', header: 'Estado' },
                  { accessorKey: 'registeredAt', header: 'Registro' },
                  { accessorKey: 'actions', header: 'Acciones' },
                ]}
                data={tenants}
                isSearching={isSearching}
                onStatusChange={async (id, currentStatus) => {
                    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
                    await updateStatus(id, newStatus);
                }}
              />
          </div>
        </section>
      )}
    </main>
  );
}
