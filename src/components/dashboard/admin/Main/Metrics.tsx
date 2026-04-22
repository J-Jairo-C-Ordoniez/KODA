'use client';

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/admin/Main/ui/Header";
import Loader from "@/components/ui/Loader";
import Metric from "@/components/dashboard/admin/Main/ui/Metric";
import { Store, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function Metrics() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const [activeTenantRes, mrrRes, onboardingRes, monthlyChurnCountRes, churnRateRes] = await Promise.all(
                    [
                        fetch("/api/tenants/counts"),
                        fetch("/api/tenants/MRR"),
                        fetch("/api/tenants/onboarding"),
                        fetch("/api/tenants/churn?type=MonthlyChurnCount"),
                        fetch("/api/tenants/churn?type=ChurnRate"),
                    ]
                );

                const activeData = await activeTenantRes.json();
                const mrrData = await mrrRes.json();
                const onboardingData = await onboardingRes.json();
                const monthlyChurnCountData = await monthlyChurnCountRes.json();
                const churnRateData = await churnRateRes.json();

                if (activeData.error ||
                    mrrData.error ||
                    onboardingData.error ||
                    monthlyChurnCountData.error ||
                    churnRateData.error) {
                    redirect("/");
                }

                setMetrics([
                    {
                        label: "Negocios Activos",
                        value: `${activeData}`.padStart(2, '0'),
                        icon: Store,
                    },
                    {
                        label: "MRR (Ingresos Mensuales)",
                        value: `${new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0
                        }).format(mrrData)}`,
                        icon: DollarSign,
                        color: mrrData < 50000
                            ? 'bg-red-100 text-red-500'
                            : mrrData > 1000000
                                ? 'bg-green-100 text-green-500'
                                : 'bg-yellow-100 text-yellow-500',
                    },
                    {
                        label: "Tasa de Conversión",
                        value: `${new Intl.NumberFormat('es-CO', {
                            style: 'percent',
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1
                        }).format(onboardingData.percentage)}`,
                        icon: onboardingData.percentage < 30
                            ? TrendingDown
                            : TrendingUp,
                        color: onboardingData.percentage < 30
                            ? 'bg-red-100 text-red-500'
                            : 'bg-green-100 text-green-500',
                    },
                    {
                        label: "Churn (Bajas) Mensual",
                        value: `${monthlyChurnCountData}`.padStart(2, '0'),
                        icon: monthlyChurnCountData < 5
                            ? TrendingUp
                            : TrendingDown,
                        color: monthlyChurnCountData < 5
                            ? 'bg-green-100 text-green-500'
                            : monthlyChurnCountData > 10
                                ? 'bg-red-100 text-red-500'
                                : 'bg-yellow-100 text-yellow-500',
                    },
                    {
                        label: "Churn Rate (Bajas)",
                        value: `${new Intl.NumberFormat('es-CO', {
                            style: 'percent',
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1
                        }).format(churnRateData)}`,
                        icon: churnRateData < 5
                            ? TrendingUp
                            : TrendingDown,
                        color: churnRateData < 5
                            ? 'bg-green-100 text-green-500'
                            : churnRateData > 10
                                ? 'bg-red-100 text-red-500'
                                : 'bg-yellow-100 text-yellow-500',
                    }
                ]);

                setLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <main className="space-y-10 bg-background w-full pt-8 px-12">
            <Header />

            {loading && <Loader />}
            {error && <p className="text-red-500">Error</p>}

            {!loading && !error && (
                <section className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {metrics.map((metric: any, index: number) => (
                            <Metric
                                key={index}
                                stat={metric}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}