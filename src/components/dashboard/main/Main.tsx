'use client';

import { useEffect } from 'react';
import Header from './ui/Header';
import SalesPeriodMetrics from './ui/SalesPeriodMetrics';
import SalesGlobalMetrics from './ui/SalesGlobalMetrics';
import TopProducts from './ui/TopProducts';
import LowStock from './ui/LowStock';
import useDashboardStore from '@/store/dashboard.store';

export default function Main() {
    const { stats, isLoading, error, fetchDashboardData } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
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
                                day={stats?.sales?.periods?.day}
                                week={stats?.sales?.periods?.week}
                                month={stats?.sales?.periods?.month}
                            />
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-primary/90 font-semibold leading-relaxed text-sm tracking-wider uppercase px-2 border-l-2 border-primary/90">Métricas Globales</h2>
                            <SalesGlobalMetrics
                                totalRevenue={stats?.sales?.periods?.month?.revenue}
                                salesCount={stats?.sales?.totalCount}
                                totalItems={stats?.inventory?.totalStock}
                            />
                        </section>

                        <section className="grid gap-6 lg:grid-cols-8">
                            <div className="col-span-8 lg:col-span-4">
                                <TopProducts products={stats?.topProducts} />
                            </div>

                            <div className="col-span-8 lg:col-span-4">
                                <LowStock items={stats?.inventory?.lowStockItems} />
                            </div>
                        </section>
                    </>
                }
            </div>
        </main>
    );
}