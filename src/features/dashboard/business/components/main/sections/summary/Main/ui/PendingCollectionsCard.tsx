import { Wallet, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { Debtor } from '@/features/dashboard/business/api/dashboard.api';
import Link from 'next/link';

interface PendingCollectionsCardProps {
    debtors: Debtor[];
}

export default function PendingCollectionsCard({ debtors }: PendingCollectionsCardProps) {
    return (
        <section
            className="bg-background-card border border-primary/5 rounded-2xl p-5 md:p-6 transition-shadow hover:shadow-sm"
            aria-labelledby="collections-title"
        >
            <header className="mb-5 flex items-center gap-3 pb-4 border-b border-primary/5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 bg-amber-50 text-amber-600">
                    <Wallet
                        size={20}
                        aria-hidden="true"
                    />
                </div>
                <h2
                    id="collections-title"
                    className="text-base font-semibold text-primary tracking-tight"
                >
                    Cuentas por Cobrar
                </h2>
            </header>

            {debtors.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm font-medium text-primary/60">
                        No hay cuentas pendientes.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col">
                    {debtors.map((debtor) => (
                        <li
                            key={debtor.id}
                            className="group flex items-center justify-between py-3 border-b border-primary/5 last:border-0 last:pb-0 first:pt-0"
                        >
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm font-medium text-primary line-clamp-1">
                                    {debtor.name}
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-primary/50 font-medium">
                                        Hace {debtor.daysPending} {debtor.daysPending === 1 ? 'día' : 'días'}
                                    </span>

                                    {debtor.isOverdue && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-red-400" aria-hidden="true"></span>
                                            <span className="text-red-500 font-semibold tracking-wide">
                                                Vencida
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-primary tabular-nums">
                                    {formatCurrency(debtor.totalDebt)}
                                </span>

                                {debtor.phone && (
                                    <Link
                                        href={`https://wa.me/57${debtor.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 -mr-2 rounded-xl text-primary/20 hover:text-emerald-500 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200"
                                        aria-label={`Enviar mensaje de WhatsApp a ${debtor.name}`}
                                        title="Contactar por WhatsApp"
                                    >
                                        <MessageCircle size={18} strokeWidth={2.5} />
                                    </Link>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}