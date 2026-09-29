import { WalletIcon, WhatsappLogoIcon } from '@phosphor-icons/react';
import { formatCurrency } from '@/lib/formatters';
import { Debtor } from '@/features/dashboard/business/api/dashboard.api';
import Link from 'next/link';

interface PendingCollectionsCardProps {
    debtors: Debtor[];
}

export default function PendingCollectionsCard({ debtors }: PendingCollectionsCardProps) {
    return (
        <section
            className="rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-4 sm:p-6"
            aria-labelledby="collections-title"
        >
            <header className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0 text-amber-500">
                    <WalletIcon
                        size={24}
                        weight="fill"
                        aria-hidden="true"
                    />
                </div>
                <h2
                    id="collections-title"
                    className="text-base sm:text-md font-bold leading-relaxed text-foreground/75"
                >
                    Cuentas por Cobrar
                </h2>
            </header>

            {debtors.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm font-medium leading-relaxed text-foreground/50">
                        No hay cuentas pendientes.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col divide-y divide-primary/10">
                    {debtors.map((debtor) => (
                        <li
                            key={debtor.id}
                            className="group flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                        >
                            <div className="flex flex-col gap-0.5">
                                <p className="text-base sm:text-md font-medium leading-relaxed text-foreground/75 line-clamp-1">
                                    {debtor.name}
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium leading-relaxed text-foreground/50">
                                        Hace {debtor.daysPending} {debtor.daysPending === 1 ? 'día' : 'días'}
                                    </span>

                                    {debtor.isOverdue && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-red-400" aria-hidden="true"></span>
                                            <span className="text-red-400 font-semibold">
                                                Vencida
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold leading-relaxed text-foreground/75 tabular-nums">
                                    {formatCurrency(debtor.totalDebt)}
                                </span>

                                {debtor.phone && (
                                    <Link
                                        href={`https://wa.me/57${debtor.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200"
                                        aria-label={`Enviar mensaje de WhatsApp a ${debtor.name}`}
                                        title="Contactar por WhatsApp"
                                    >
                                        <WhatsappLogoIcon size={22} weight="fill" />
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