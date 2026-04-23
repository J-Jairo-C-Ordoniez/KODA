'use client';

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Store, Search, ArrowRight } from "lucide-react";
import Header from "@/components/dashboard/admin/Main/ui/Header";
import Loader from "@/components/ui/Loader";
import Metric from "@/components/dashboard/admin/Main/ui/Metric";
import Table from "@/components/dashboard/admin/Main/ui/Table";

export default function Ecosystem() {
    const [countAllTenants, setCountAllTenants] = useState(0);
    const [tenants, setTenants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialMetrics = async () => {
            try {
                const res = await fetch("/api/tenants/counts?type=all");
                const data = await res.json();

                if (data.error) redirect("/");
                setCountAllTenants(data);
            } catch (err) {
                console.error("Error cargando métricas:", err);
            }
        };
        fetchInitialMetrics();
    }, []);

    useEffect(() => {
        const fetchFilteredTenants = async () => {
            setIsSearching(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append("search", searchQuery);
                if (status) params.append("status", status);

                const url = params.toString() ? `/api/tenants/search?${params.toString()}` : "/api/tenants";

                const response = await fetch(url);
                const data = await response.json();

                if (data.error) throw new Error(data.error);

                setTenants(Array.isArray(data) ? data : []);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsSearching(false);
                setLoading(false);
            }
        };

        const delayTimer = setTimeout(() => {
            fetchFilteredTenants();
        }, 300);

        return () => clearTimeout(delayTimer);
    }, [searchQuery, status]);

    return (
        <main className="space-y-10 bg-background w-full pt-8 px-12">
            <Header title="Ecosistema Koda" />

            {loading && <Loader />}
            {error && <p className="text-red-500 text-sm font-semibold">Error: {error}</p>}

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

                    {/* Controles de Búsqueda y Filtro */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="text-md font-semibold text-primary tracking-wider">
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
                                    className="w-full pl-12 pr-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium placeholder:text-secondary/80"
                                />
                            </div>

                            <div className="relative group">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mr-2 w-full px-4 py-4 bg-background/50 border border-foreground/5 rounded-2xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-hidden transition-all font-medium appearance-none"
                                >
                                    <option value="">Todos</option>
                                    <option value="active">Activos</option>
                                    <option value="noVerify">Pendientes</option>
                                    <option value="suspended">Suspendidos</option>
                                </select>
                                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary rotate-90" size={16} />
                            </div>
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
                        isSearching={isSearching}
                    />
                </section>
            )}
        </main>
    );
}