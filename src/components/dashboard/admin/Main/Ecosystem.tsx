'use client';

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Store, Search } from "lucide-react";
import Header from "@/components/dashboard/admin/Main/ui/Header";
import Loader from "@/components/ui/Loader";
import Metric from "@/components/dashboard/admin/Main/ui/Metric";
import Table from "@/components/dashboard/admin/Main/ui/Table";

export default function Ecosystem() {
    const [countAllTenants, setCountAllTenants] = useState(0);
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const [countAllTenantsRes, getAllTenantsRes] = await Promise.all([
                    fetch("/api/tenants/counts?type=all"),
                    fetch("/api/tenants"),
                ]);

                const countAllTenantsData = await countAllTenantsRes.json();
                const getAllTenantsData = await getAllTenantsRes.json();

                if (countAllTenantsData.error || getAllTenantsData.error) {
                    redirect("/");
                }

                setCountAllTenants(countAllTenantsData.count);
                setTenants(getAllTenantsData);
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
            <Header title="Ecosistema Koda" />

            {loading && <Loader />}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <section className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Metric
                            stat={{
                                label: "Total Negocios",
                                value: `${countAllTenants}`.padStart(2, '0'),
                                icon: Store
                            }}
                        />
                    </div>

                    <header className="flex justify-between items-center">
                        <h3 className="text-md font-semibold text-primary tracking-wider">Negocios Registrados</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar negocio..."
                                className="pl-10 pr-4 py-2 bg-foreground/5 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy/20 outline-hidden"
                            />
                        </div>
                    </header>

                    <Table
                        columns={[
                            { accessorKey: "slug", header: "SLUG" },
                            { accessorKey: "businessName", header: "Negocio" },
                            { accessorKey: "plan", header: "Plan" },
                            { accessorKey: "status", header: "Estado" },
                            { accessorKey: "registeredAt", header: "Registro" },
                            { accessorKey: "actions", header: "Acciones" },
                        ]}
                        data={tenants}
                    />
                </section>
            )}
        </main>
    );
}