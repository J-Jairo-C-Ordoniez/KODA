'use client';

import { Phone, MessageCircle, Edit2, Trash2 } from 'lucide-react';
import { Customer } from '@/features/dashboard/business/api/customers.api';
import { formatCurrency } from '@/lib/formatters';
import Link from 'next/link';
import Button from '@/shared/components/Button';

interface CustomerCardProps {
  customer: Customer;
  onOpenPayment: (customer: Customer) => void;
  onOpenHistory: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

export default function CustomerCard({ customer, onOpenPayment, onOpenHistory, onEdit, onDelete }: CustomerCardProps) {
  const hasDebt = customer.totalDebt > 0;
  const message = encodeURIComponent(
    `Hola ${customer.name}, te escribimos de KODA. Te recordamos amablemente tu saldo pendiente de ${formatCurrency(customer.totalDebt)}. ¡Muchas gracias!`
  );

  return (
    <article
      className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between cursor-default"
    >
      <header className="mb-4 relative">
        <span className={`absolute right-2 top-2 text-xs font-bold px-2.5 py-1 rounded-lg border backdrop-blur-xs ${hasDebt
          ? 'text-red-700 bg-red-50 border-red-100'
          : 'text-emerald-700 bg-emerald-50 border-emerald-100'
          }`}>
          {hasDebt ? 'Con deuda' : 'Al día'}
        </span>
        <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
          {customer.name}
        </h3>
        <Link
          href={`tel:${customer.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-primary/60 mt-1 flex items-center gap-2 hover:text-primary transition-colors w-fit"
        >
          <Phone size={18} /> {customer.phone}
        </Link>
      </header>

      <div className="pt-4 border-t border-primary/8 flex items-end justify-between gap-3">
        <div>
          <h4 className="text-xs font-semibold uppercase text-primary/60 mt-1">
            Saldo pendiente
          </h4>
          <p className="text-2xl font-bold tracking-tight text-primary">
            {formatCurrency(customer.totalDebt)}
          </p>
        </div>

        {hasDebt && (
          <Link
            href={`https://wa.me/57${customer.phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar recordatorio de cobro por WhatsApp"
            className="p-2 -mr-2 rounded-xl text-primary/50 hover:text-emerald-500 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200"
          >
            <MessageCircle size={18} strokeWidth={2.5} />
          </Link>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-primary/8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant='primary'
            onClick={() => onOpenPayment(customer)}
            disabled={!hasDebt}
          >
            Abonar
          </Button>

          <Button
            variant='secondary'
            onClick={() => onOpenHistory(customer)}
          >
            Cuaderno
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(customer)}
            className="text-primary/40 hover:text-primary transition-colors cursor-pointer"
            title="Editar cliente"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(customer.customerId)}
            disabled={hasDebt}
            className={`text-primary/40 transition-colors cursor-pointer ${hasDebt
              ? 'text-primary/20 cursor-not-allowed'
              : 'text-primary/40 hover:text-red-500 hover:bg-foreground-muted/40 cursor-pointer'
              }`}
            title={hasDebt ? 'No puedes eliminar un cliente con deuda' : 'Eliminar cliente'}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
