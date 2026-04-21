'use client';

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Plus, Store, CreditCard, Activity, MoreVertical, Search } from "lucide-react";

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

    const stats = [
        { label: "Negocios Activos", value: tenants.length + 120, icon: Store },
        { label: "Ingresos Mensuales", value: "$6.2M", icon: CreditCard },
        { label: "Salud del Sistema", value: "99.9%", icon: Activity },
    ];

    return (
        <main className="space-y-10 bg-background w-full pt-8 px-12">
            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-background border border-foreground/5 p-6 rounded-[32px] shadow-sm flex items-center gap-6">
                        <div className="p-4 bg-navy/5 rounded-2xl text-navy">
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-primary">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-background border border-foreground/5 rounded-[40px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-foreground/5 flex justify-between items-center">
                    <h3 className="text-xl font-black text-primary tracking-tight">Negocios Registrados</h3>
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
                            <th className="px-8 py-4 text-[10px] font-black uppercase text-secondary tracking-widest">Negocio</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase text-secondary tracking-widest">Plan / Estado</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase text-secondary tracking-widest">Actividad</th>
                            <th className="px-8 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                        {tenants.map((tenant) => (
                            <tr key={tenant.tenantId} className="hover:bg-[#f8f9fa] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center font-black text-navy uppercase">
                                            {tenant.businessName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-primary text-sm">{tenant.businessName}</p>
                                            <p className="text-xs text-secondary font-medium">{tenant.slug}</p>
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
                                <td className="px-8 py-6 text-xs text-secondary font-medium">
                                    {tenant._count.users} Usuarios | {tenant._count.products} Productos
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 hover:bg-foreground/5 rounded-lg text-secondary">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}