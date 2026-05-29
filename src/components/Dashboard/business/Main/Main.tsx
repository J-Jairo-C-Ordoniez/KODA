'use client';

import { useEffect } from 'react';
import Header from './ui/Header';
import SalesPeriodMetrics from './ui/SalesPeriodMetrics';
import SalesGlobalMetrics from './ui/SalesGlobalMetrics';
import LowStock from './ui/LowStock';
import { useDashboardStats } from '@/hooks/admin/useDashboardStats';

export default function Main() {
    const { stats, isLoading, error, fetchStats } = useDashboardStats();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <main className="min-h-full flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <div className="container mx-auto space-y-8 pt-2">
                <Header
                    title="Dashboard"
                    description="Resumen analítico y control de operaciones."
                />

                {isLoading && (
                    <div className="flex justify-center py-20">
                        <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                            Cargando...
                        </p>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="flex justify-center py-20">
                        <p className="text-md font-medium tracking-wider text-secondary">
                            Ha ocurrido un error, intenta de nuevo
                        </p>
                    </div>
                )}

                {!isLoading && !error && !stats && (
                    <div className="flex justify-center py-20">
                        <p className="text-md font-medium tracking-wider text-secondary">
                            No hay estadísticas disponibles.
                        </p>
                    </div>
                )}

                {!isLoading && !error && stats &&
                    <>
                        <section className="space-y-4">
                            <h2 className="text-primary/90 font-semibold leading-relaxed text-sm tracking-wider uppercase px-2 border-l-2 border-primary/90">Rendimiento Reciente</h2>
                            <SalesPeriodMetrics
                                day={{ revenue: stats.salesToday.totalRevenue, count: stats.salesToday.totalOrders }}
                                week={{ revenue: stats.salesMonth.totalRevenue / 4, count: Math.floor(stats.salesMonth.totalOrders / 4) }}
                                month={{ revenue: stats.salesMonth.totalRevenue, count: stats.salesMonth.totalOrders }}
                            />
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-primary/90 font-semibold leading-relaxed text-sm tracking-wider uppercase px-2 border-l-2 border-primary/90">Métricas Globales</h2>
                            <SalesGlobalMetrics
                                totalRevenue={stats.salesMonth.totalRevenue}
                                salesCount={stats.salesMonth.totalOrders}
                                totalItems={stats.lowStockItems.totalLowStockItems}
                            />
                        </section>

                        <section className="grid gap-6 lg:grid-cols-8">
                            <div className="col-span-8 lg:col-span-4">
                                <LowStock items={[]} />
                            </div>
                        </section>
                    </>
                }
            </div>
        </main>
    );
}