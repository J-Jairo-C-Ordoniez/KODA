'use client';

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Store, MoreVertical, Search } from "lucide-react";
import Header from "@/components/dashboard/admin/Main/ui/Header";
import Loader from "@/components/ui/Loader";
import Metric from "@/components/dashboard/admin/Main/ui/Metric";

export default function Ecosystem() {
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
                                label: "Total Negocios",
                                value: `${tenants.length}`.padStart(2, '0'),
                                icon: Store
                            }}
                        />

                        <Metric
                            stat={{
                                label: "Negocios Activos",
                                value: `${tenants.filter((tenant) => tenant.status === 'active').length}`.padStart(2, '0'),
                                icon: Store
                            }}
                        />

                        <Metric
                            stat={{
                                label: "Negocios Suspendidos",
                                value: `${tenants.filter((tenant) => tenant.status !== 'active').length}`.padStart(2, '0'),
                                icon: Store
                            }}
                        />
                    </div>

                    <div className="bg-background border border-foreground/5 rounded-[40px] overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-foreground/5 flex justify-between items-center">
                            <h3 className="text-md font-semibold text-primary tracking-wider">Negocios Registrados</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar negocio..."
                                    className="pl-10 pr-4 py-2 bg-foreground/5 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy/20 outline-hidden"
                                />
                            </div>
                        </div>

                        <table className="w-full text-left">
                            <thead className="bg-[#f8f9fa] border-b border-foreground/5">
                                <tr>
                                    <th className="px-8 py-4 text-xs font-medium uppercase text-secondary tracking-widest">Negocio</th>
                                    <th className="px-8 py-4 text-xs font-medium uppercase text-secondary tracking-widest">Plan / Estado</th>
                                    <th className="px-8 py-4 text-xs font-medium uppercase text-secondary tracking-widest">Actividad</th>
                                    <th className="px-8 py-4 text-xs font-medium uppercase text-secondary tracking-widest">Slug</th>
                                    <th className="px-8 py-4 text-xs font-medium uppercase text-secondary tracking-widest">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-foreground/5">
                                {tenants.map((tenant) => (
                                    <tr key={tenant.tenantId} className="hover:bg-[#f8f9fa] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <p className="font-black text-primary text-sm">{tenant.businessName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${tenant.status === 'active' ? 'bg-green-500' : 'bg-red-400'
                                                    }`} />
                                                <span className="text-xs font-bold text-primary uppercase">{tenant.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-xs uppercase text-secondary font-medium">
                                            {tenant._count.users} Usuarios | {tenant._count.products} Productos
                                        </td>
                                        <td className="px-8 py-6 text-xs uppercase text-secondary font-medium">
                                            {tenant.slug}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <button className="p-2 hover:bg-foreground/5 rounded-lg text-secondary">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </main>
    );
}