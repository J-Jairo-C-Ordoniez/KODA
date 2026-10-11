'use client';

import {
  PencilSimpleIcon,
  PhoneIcon,
  TrashIcon,
  UserCircleIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react';
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

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function CustomerCard({ customer, onOpenPayment, onOpenHistory, onEdit, onDelete }: CustomerCardProps) {
  const hasDebt = customer.totalDebt > 0;
  const message = encodeURIComponent(
    `Hola ${customer.name}, te escribimos de KODA. Te recordamos amablemente tu saldo pendiente de ${formatCurrency(customer.totalDebt)}. ¡Muchas gracias!`
  );

  return (
    <article className="group flex min-h-75 flex-col rounded-3xl border border-primary/10 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md sm:p-6 md:rounded-4xl">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold ${hasDebt
            ? 'border-amber-500/15 bg-amber-500/10 text-amber-700'
            : 'border-emerald-500/15 bg-emerald-500/10 text-emerald-700'
            }`}>
            {getInitials(customer.name) || <UserCircleIcon size={24} weight="fill" />}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold leading-tight tracking-tight text-primary sm:text-lg">
              {customer.name}
            </h3>
            <Link
              href={`tel:${customer.phone}`}
              onClick={(event) => event.stopPropagation()}
              className="mt-1 flex w-fit items-center gap-1.5 text-sm leading-relaxed text-foreground/60 transition-colors hover:text-primary"
            >
              <PhoneIcon size={16} weight="regular" />
              <span>{customer.phone}</span>
            </Link>
          </div>
        </div>

        <span className={`shrink-0 px-1 py-0.5 text-base font-semibold leading-relaxed ${hasDebt
          ? 'text-amber-600'
          : 'text-emerald-600'
          }`}>
          {hasDebt ? 'Con deuda' : 'Al día'}
        </span>
      </header>

      <div className="my-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium leading-tight text-foreground/60">Saldo pendiente</p>
          <p className="mt-1 text-2xl font-bold leading-tight tracking-tight text-primary">
            {formatCurrency(customer.totalDebt)}
          </p>
        </div>

        {hasDebt && (
          <Link
            href={`https://wa.me/57${customer.phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar recordatorio de cobro por WhatsApp"
            aria-label={`Enviar recordatorio de cobro a ${customer.name} por WhatsApp`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-emerald-700 transition-all hover:bg-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <WhatsappLogoIcon size={21} weight="fill" />
          </Link>
        )}
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          {hasDebt && (
            <Button variant="primary" onClick={() => onOpenPayment(customer)}>
              Abonar
            </Button>
          )}
          <Button variant={hasDebt ? 'secondary' : 'primary'} onClick={() => onOpenHistory(customer)}>
            Cuaderno
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(customer)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-primary/45 transition-colors hover:bg-primary/5 hover:text-primary cursor-pointer"
            title="Editar cliente"
            aria-label={`Editar a ${customer.name}`}
          >
            <PencilSimpleIcon size={20} weight="regular" />
          </button>
          <button
            onClick={() => onDelete(customer.customerId)}
            disabled={hasDebt}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${hasDebt
              ? 'cursor-not-allowed text-primary/20'
              : 'cursor-pointer text-primary/45 hover:bg-red-500/10 hover:text-red-600'
              }`}
            title={hasDebt ? 'No puedes eliminar un cliente con deuda' : 'Eliminar cliente'}
            aria-label={hasDebt ? `No puedes eliminar a ${customer.name} porque tiene deuda` : `Eliminar a ${customer.name}`}
          >
            <TrashIcon size={20} weight="regular" />
          </button>
        </div>
      </footer>
    </article>
  );
}
