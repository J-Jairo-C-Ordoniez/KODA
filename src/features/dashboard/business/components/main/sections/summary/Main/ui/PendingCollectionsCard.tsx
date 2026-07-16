import { Wallet, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import Link from 'next/link';

export interface Debtor {
    id: string;
    name: string;
    phone: string;
    totalDebt: number;
    daysPending: number;
    isOverdue: boolean;
}

interface PendingCollectionsCardProps {
    debtors: Debtor[];
}

export default function PendingCollectionsCard({ debtors }: PendingCollectionsCardProps) {
    return (
        <article className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300">
            <header className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-primary tracking-tight flex items-center gap-2">
                    <Wallet
                        size={20}
                        className="text-amber-500"
                        aria-hidden="true"
                    />
                    Cuentas por Cobrar
                </h3>
                <span className="text-xs font-medium text-primary/60 bg-primary/5 px-2 py-1 rounded-md">
                    {debtors.length} activos
                </span>
            </header>

            {debtors.length === 0 ? (
                <p className="text-sm text-primary/60 text-center py-6">
                    No hay cuentas por cobrar pendientes. ¡Excelente!
                </p>
            ) : (
                <ul className="divide-y divide-primary/5">
                    {debtors.map((debtor) => (
                        <li 
                            key={debtor.id} 
                            className="flex justify-between items-center py-3 first:pt-0 last:pb-0 group"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold text-primary line-clamp-1">
                                    {debtor.name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-primary/60">
                                        Hace {debtor.daysPending} {debtor.daysPending === 1 ? 'día' : 'días'}
                                    </p>

                                    {debtor.phone && (
                                        <Link
                                            href={`https://wa.me/57${debtor.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary/30 hover:text-emerald-500 transition-colors"
                                            aria-label={`Contactar a ${debtor.name} por WhatsApp`}
                                        >
                                            <MessageCircle size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-end gap-1">
                                <p className="text-sm font-bold text-primary">
                                    {formatCurrency(debtor.totalDebt)}
                                </p>
                                {debtor.isOverdue && (
                                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                        Vencida
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}