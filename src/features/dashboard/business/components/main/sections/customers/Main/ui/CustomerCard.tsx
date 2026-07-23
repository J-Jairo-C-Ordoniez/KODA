'use client';

import { Phone, MessageCircle, Wallet, History, Edit3, Trash2 } from 'lucide-react';
import { Customer } from '@/features/dashboard/business/api/customers.api';
import { formatCurrency } from '@/lib/formatters';

interface CustomerCardProps {
  customer: Customer;
  onOpenPayment: (customer: Customer) => void;
  onOpenHistory: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

export default function CustomerCard({
  customer,
  onOpenPayment,
  onOpenHistory,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  const hasDebt = customer.totalDebt > 0;

  const handleWhatsAppReminder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = customer.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;
    const message = encodeURIComponent(
      `Hola ${customer.name}, te escribimos de KODA. Te recordamos amablemente tu saldo pendiente de ${formatCurrency(customer.totalDebt)}. ¡Muchas gracias!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <article
      className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between cursor-default"
    >
      {/* Header: nombre + teléfono */}
      <header className="mb-4">
        <p className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
          {hasDebt ? 'Con deuda' : 'Al día'}
        </p>
        <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
          {customer.name}
        </h3>
        <a
          href={`tel:${customer.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-medium text-primary/60 mt-1 flex items-center gap-1.5 hover:text-primary transition-colors w-fit"
        >
          <Phone size={12} /> {customer.phone}
        </a>
      </header>

      {/* Saldo pendiente */}
      <div className="pt-4 border-t border-primary/8 flex items-end justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
            Saldo pendiente
          </h4>
          <p className="text-2xl font-bold tracking-tight text-primary">
            {formatCurrency(customer.totalDebt)}
          </p>
        </div>

        {/* WhatsApp si tiene deuda */}
        {hasDebt && (
          <button
            onClick={handleWhatsAppReminder}
            title="Enviar recordatorio de cobro por WhatsApp"
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-primary/8 bg-foreground-muted/40 text-primary/60 hover:bg-foreground-muted/60 hover:text-primary transition-all cursor-pointer"
          >
            <MessageCircle size={16} />
          </button>
        )}
      </div>

      {/* Acciones */}
      <div className="pt-3 mt-3 border-t border-primary/8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={() => onOpenPayment(customer)}
            disabled={!hasDebt}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              hasDebt
                ? 'border border-primary/8 bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary cursor-pointer'
                : 'bg-foreground-muted/20 text-primary/25 cursor-not-allowed border border-primary/5'
            }`}
          >
            <Wallet size={14} /> Abonar
          </button>

          <button
            onClick={() => onOpenHistory(customer)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 border border-primary/8 bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <History size={14} /> Cuaderno
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-lg transition-colors cursor-pointer"
            title="Editar cliente"
          >
            <Edit3 size={15} />
          </button>
          <button
            onClick={() => onDelete(customer.customerId)}
            disabled={hasDebt}
            className={`p-2 rounded-lg transition-colors ${
              hasDebt
                ? 'text-primary/20 cursor-not-allowed'
                : 'text-primary/40 hover:text-red-500 hover:bg-foreground-muted/40 cursor-pointer'
            }`}
            title={hasDebt ? 'No puedes eliminar un cliente con deuda' : 'Eliminar cliente'}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
