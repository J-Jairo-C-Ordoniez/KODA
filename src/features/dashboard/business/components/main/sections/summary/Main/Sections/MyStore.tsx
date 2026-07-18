'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Phone, Link2, CreditCard, Calendar, CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck, Save, X } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { StoreDataStats, StoreProfile, StoreSubscription } from '@/features/dashboard/business/api/dashboard.api';
import useTabStats from "@/features/dashboard/business/hooks/useTabStats";
import Loader from "@/shared/components/Loader";
import Error from "@/shared/components/Error";

// ============================================================================
// SUBCOMPONENTE: Tarjeta de Suscripción
// ============================================================================
function StoreSubscriptionCard({ subscription }: { subscription: StoreSubscription | null }) {
    const router = useRouter();

    const getStatusConfig = (status: StoreSubscription['status']) => {
        const configs = {
            active: { text: "Activa", styles: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            pastDue: { text: "Vencida", styles: "bg-amber-50 text-amber-700 border-amber-200" },
            mora: { text: "En Mora", styles: "bg-red-50 text-red-700 border-red-200" },
            suspended: { text: "Suspendida", styles: "bg-gray-50 text-gray-700 border-gray-200" },
            canceled: { text: "Cancelada", styles: "bg-gray-50 text-gray-700 border-gray-200" },
            noVerify: { text: "Sin Verificar", styles: "bg-blue-50 text-blue-700 border-blue-200" }
        };
        return configs[status] || configs.noVerify;
    };

    return (
        <aside className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Tu Plan KODA</h3>
            </div>

            {subscription ? (
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xl font-bold text-gray-900">{subscription.plan.name}</p>
                            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                {formatCurrency(subscription.plan.price)} / {subscription.plan.interval}
                            </p>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusConfig(subscription.status).styles}`}>
                            {getStatusConfig(subscription.status).text}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-6 flex items-center gap-3">
                        <Calendar className="text-gray-400" size={18} />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Próximo cobro</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {new Date(subscription.endDate).toLocaleDateString('es-CO', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 flex-1">
                        <p className="text-sm font-bold text-gray-900 mb-3">Incluye:</p>
                        <ul className="space-y-2.5">
                            {subscription.plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() => router.push('/help')}
                        className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <CreditCard size={16} /> Gestionar Facturación
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-8 opacity-70">
                    <AlertCircle className="text-gray-400 mb-3" size={32} />
                    <p className="text-sm text-gray-500">No hay información de suscripción activa.</p>
                </div>
            )}
        </aside>
    );
}

// ============================================================================
// SUBCOMPONENTE: Tarjeta de Perfil (Vista / Edición)
// ============================================================================
function StoreProfileCard({ profile, isEditing }: { profile: StoreProfile, isEditing: boolean }) {
    // Estado local para los inputs del formulario
    const [formData, setFormData] = useState({
        businessName: profile.businessName,
        description: profile.description || "",
        whatsApp: profile.whatsApp,
        slug: profile.slug
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <article className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition-all">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                    <Store size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Información Pública</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo y Nombre */}
                <div className="flex gap-4 md:col-span-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden relative group">
                        {profile.logo ? (
                            <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <Store className="text-gray-400" size={28} />
                        )}
                        {/* Overlay para editar imagen solo visible en modo edición */}
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-[10px] text-white font-bold uppercase tracking-wider">Cambiar</p>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-500 font-medium mb-1 block">Nombre Comercial</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        ) : (
                            <p className="text-lg font-bold text-gray-900">{profile.businessName}</p>
                        )}
                    </div>
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                    <label className="text-sm text-gray-500 font-medium mb-1 block">Descripción de la tienda</label>
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                            placeholder="Añade una descripción para tus clientes..."
                        />
                    ) : (
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {profile.description || "Aún no has agregado una descripción para tus clientes."}
                        </p>
                    )}
                </div>

                {/* WhatsApp */}
                <div className={`p-4 rounded-xl border ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50/50 border-gray-100'}`}>
                    <label className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
                        <Phone size={16} /> WhatsApp Ventas
                    </label>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">+57</span>
                            <input
                                type="text"
                                name="whatsApp"
                                value={formData.whatsApp}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    ) : (
                        <p className="font-semibold text-gray-900">+57 {profile.whatsApp}</p>
                    )}
                </div>

                {/* Link de la tienda (Slug) */}
                <div className={`p-4 rounded-xl border ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50/50 border-gray-100'}`}>
                    <label className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
                        <Link2 size={16} /> Enlace del Catálogo
                    </label>
                    {isEditing ? (
                        <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-sm hidden sm:inline">koda.app/</span>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-primary font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    ) : (
                        <a
                            href={`https://koda.app/${profile.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors break-all"
                        >
                            koda.app/{profile.slug} <ArrowUpRight size={14} />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

// ============================================================================
// COMPONENTE PRINCIPAL: Orquestador
// ============================================================================
export default function MyStore({ activeTab }: { activeTab: string }) {
    const { data, isLoading, error } = useTabStats<StoreDataStats>(activeTab);
    const [isEditing, setIsEditing] = useState(false);

    // Simulación de función de guardado
    const handleSave = async () => {
        // Aquí iría tu llamado a la API (ej. await fetchUpdateStoreProfile(...))
        console.log("Guardando cambios...");
        setIsEditing(false);
    };

    return (
        <section className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Mi Tienda
                    </h2>
                    <p className="text-gray-500 text-base mt-1 max-w-2xl">
                        Administra la identidad de tu marca, tu catálogo público y el estado de tu suscripción en la plataforma.
                    </p>
                </div>

                {/* Controles dinámicos según estado de edición */}
                {data && (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <X size={16} /> Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <Save size={16} /> Guardar Cambios
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                Editar Perfil
                            </button>
                        )}
                    </div>
                )}
            </header>

            {isLoading && <Loader />}
            {error && <Error message={error} />}

            {data && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <StoreProfileCard profile={data.profile} isEditing={isEditing} />
                    <StoreSubscriptionCard subscription={data.subscription} />
                </div>
            )}
        </section>
    );
}