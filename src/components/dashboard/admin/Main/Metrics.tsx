'use client';

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/admin/Main/ui/Header";
import Loader from "@/components/ui/Loader";
import Metric from "@/components/dashboard/admin/Main/ui/Metric";
import { Store, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function Metrics() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await fetch("/api/tenants");
                const data = await response.json();
                if (data.error) {
                    redirect("/");
                }

                setTenants(data);
                setLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTenants();
    }, []);

    return (
        <main className="space-y-10 bg-background w-full pt-8 px-12">
            <Header />

            {loading && <Loader />}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <section className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Metric
                            stat={{
                                label: "MRR (Ingresos Mensuales)",
                                value: `$${tenants.reduce((acc, tenant) => acc + tenant.amount, 0)}`.padStart(2, '0'),
                                icon: DollarSign,
                            }}
                        />

                        <Metric
                            stat={{
                                label: "Negocios Activos",
                                value: `${tenants.filter((tenant) => tenant.status === 'active').length}`.padStart(2, '0'),
                                icon: Store,
                            }}
                        />

                        <Metric
                            stat={{
                                label: "Tasa de Conversión",
                                value: `${tenants.filter((tenant) => tenant.status !== 'active').length}`.padStart(2, '0'),
                                icon: TrendingUp,
                            }}
                        />

                        <Metric
                            stat={{
                                label: "Churn (Bajas)",
                                value: `${tenants.filter((tenant) => tenant.status !== 'active').length}`.padStart(2, '0'),
                                icon: TrendingDown,
                            }}
                        />
                    </div>
                </section>
            )}
        </main>
    );
}

/*
Métrica,                       Origen de Datos (Prisma),                                   Por qué es importante
MRR (Ingresos Mensuales),      Suma de amount en saas_transactions (mes actual).,          Es tu ganancia real como dueño del software.
Negocios Activos,              Tenant.count({ where: { status: 'active' } }).,             Tu base de clientes saludable.
Tasa de Conversión,            Relación entre noVerify y active.,                          Qué tan bien está funcionando tu onboarding.
Churn (Bajas),                 Tenant.count({ where: { status: 'suspended' } }).,          Cuántos negocios están dejando de usar la app. 
 */