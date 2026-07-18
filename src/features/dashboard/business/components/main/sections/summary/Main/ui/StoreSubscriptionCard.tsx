import { CreditCard, Calendar, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { formatCurrency, dateFormatter } from '@/lib/formatters';
import { StoreSubscription } from '@/features/dashboard/business/api/dashboard.api';
import Link from 'next/link';


export default function StoreSubscriptionCard({ subscription }: { subscription: StoreSubscription | null }) {
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
                                {dateFormatter(new Date(subscription.endDate))}
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

                    <Link
                        href="/help"
                        className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <CreditCard size={16} /> Gestionar Facturación
                    </Link>
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