'use client';

import { Phone, MessageCircle, Wallet, History, Edit3, Trash2, CheckCircle2 } from 'lucide-react';
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
      `Hola ${customer.name}, te escribimos de KODA. Te recordamos amablemente tu saldo pendiente de ${formatCurrency(
        customer.totalDebt
      )}. ¡Muchas gracias!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <article className="bg-background-card border border-primary/8 hover:border-primary/20 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
                hasDebt ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
              }`}
            >
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                {customer.name}
              </h3>
              <a
                href={`tel:${customer.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-primary/55 hover:text-primary flex items-center gap-1.5 mt-0.5"
              >
                <Phone size={12} /> {customer.phone}
              </a>
            </div>
          </div>

          {/* Debt Badge */}
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${
              hasDebt
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {hasDebt ? (
              <>
                <Wallet size={13} /> Con Deuda
              </>
            ) : (
              <>
                <CheckCircle2 size={13} /> Al Día
              </>
            )}
          </span>
        </div>

        {/* Debt Amount Display */}
        <div className="my-4 p-3.5 rounded-xl bg-foreground-muted/20 border border-primary/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
              Saldo Pendiente
            </p>
            <p className={`text-xl font-bold tracking-tight ${hasDebt ? 'text-amber-800' : 'text-emerald-700'}`}>
              {formatCurrency(customer.totalDebt)}
            </p>
          </div>

          {/* Quick WhatsApp Reminder Button if has debt */}
          {hasDebt && (
            <button
              onClick={handleWhatsAppReminder}
              title="Enviar recordatorio de cobro por WhatsApp"
              className="flex items-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <MessageCircle size={14} /> Recordar
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-primary/8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          {/* Abonar Button */}
          <button
            onClick={() => onOpenPayment(customer)}
            disabled={!hasDebt}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 ${
              hasDebt
                ? 'bg-primary hover:bg-secondary text-white cursor-pointer'
                : 'bg-foreground-muted/30 text-primary/30 cursor-not-allowed border border-primary/5'
            }`}
          >
            <Wallet size={14} /> Abonar
          </button>

          {/* Historial (Cuaderno Digital) Button */}
          <button
            onClick={() => onOpenHistory(customer)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-foreground-muted/40 hover:bg-foreground-muted/70 text-primary rounded-xl text-xs font-bold transition-all cursor-pointer"
            title="Ver Cuaderno Digital e Historial"
          >
            <History size={14} /> Cuaderno
          </button>
        </div>

        {/* Edit & Delete actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-primary/50 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
            title="Editar cliente"
          >
            <Edit3 size={15} />
          </button>
          <button
            onClick={() => onDelete(customer.customerId)}
            disabled={hasDebt}
            className={`p-2 rounded-xl transition-colors ${
              hasDebt
                ? 'text-primary/20 cursor-not-allowed'
                : 'text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer'
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
