'use client';

import { useState, useEffect } from 'react';
import { Store, Search, ArrowRight } from 'lucide-react';
import Header from '@/components/dashboard/admin/Main/ui/Header';
import Loader from '@/components/ui/Loader';
import Metric from '@/components/dashboard/admin/Main/ui/Metric';
import Table from '@/components/dashboard/admin/Main/ui/Table';
import { useTenants } from '@/hooks/superAdmin/useTenants';

export default function Ecosystem() {
  const { tenants, totalCount, isLoading, isSearching, error, fetchTenants, fetchTotalCount } = useTenants();
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchTotalCount();
  }, [fetchTotalCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTenants(searchQuery, status);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, status, fetchTenants]);

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto">
      <Header title="Ecosistema Koda" />

      {isLoading && <Loader />}
      {error && (
        <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl border border-red-100">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric
              stat={{
                label: 'Total Negocios',
                value: `${totalCount}`.padStart(2, '0'),
                icon: Store,
              }}
            />
          </div>

          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-base font-semibold text-primary tracking-wider">
              Negocios Registrados
            </h3>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar negocio..."
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all font-medium placeholder:text-secondary/80"
                />
              </div>

              <div className="relative group">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all font-medium appearance-none pr-10"
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
          />
        </section>
      )}
    </main>
  );
}