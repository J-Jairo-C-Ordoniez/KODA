import { Calendar, User, CreditCard, FileText, ChevronRight, UserCircle } from 'lucide-react';

interface SalesTableRowProps {
  sale: any;
  isNew: boolean;
  onViewInvoice: (sale: any) => void;
  PAYMENT_LABELS: Record<string, string>;
}

export default function SalesTableRow({ sale, isNew, onViewInvoice, PAYMENT_LABELS }: SalesTableRowProps) {
  return (
    <article 
      className={`
        group relative bg-background-elevated/50 lg:bg-background-elevated border border-foreground/5 lg:border-foreground/8 rounded-[32px] p-5 lg:p-0 transition-all duration-300 hover:border-contrast/30
        ${isNew ? 'ring-2 ring-contrast shadow-2xl shadow-contrast/10 animate-in zoom-in-95' : ''}
      `}
    >
      <section className="hidden lg:grid lg:grid-cols-6 lg:items-center gap-4 lg:px-8 lg:py-5" aria-label={`Detalle de transacción ${sale.saleId}`}>
        <div className="flex items-center gap-3">
          <figure className="w-9 h-9 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground-muted group-hover:text-contrast transition-colors" aria-hidden="true">
            <Calendar size={16} />
          </figure>
          <div className="flex flex-col">
            <time dateTime={sale.createdAt} className="text-sm font-bold text-primary">{new Date(sale.createdAt).toLocaleDateString('es-ES')}</time>
            <time dateTime={sale.createdAt} className="text-xs font-semibold text-foreground-muted">{new Date(sale.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</time>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <figure className="w-6 h-6 rounded-full bg-contrast/10 flex items-center justify-center text-contrast" aria-hidden="true">
            <User size={12} />
          </figure>
          <span className="text-xs font-bold text-primary truncate">{sale.user?.name || '—'}</span>
        </div>

        <div className="flex items-center gap-2">
          <UserCircle size={14} className="text-foreground-muted" aria-hidden="true" />
          <span className="text-xs font-medium text-foreground-muted truncate">
            {sale.customer?.name || <span className="opacity-40 italic">Consumidor Final</span>}
          </span>
        </div>

        <div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2 w-fit border ${
            sale.paymentMethod === 'debt' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
            sale.paymentMethod === 'cash' ? 'bg-success/10 text-success border-success/20' :
            'bg-foreground/5 text-foreground-muted border-foreground/10'
          }`}>
            <CreditCard size={10} aria-hidden="true" />
            {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
          </span>
        </div>

        <div className="text-right">
          <strong className="text-base font-black text-primary">${Number(sale.total).toLocaleString('es-ES')}</strong>
        </div>

        <div className="flex justify-center">
          <button 
            type="button"
            onClick={() => onViewInvoice(sale)}
            className="w-10 h-10 rounded-xl bg-foreground/5 text-foreground-muted flex items-center justify-center hover:bg-contrast hover:text-white transition-all shadow-sm"
            aria-label="Ver Factura"
            title="Ver Factura"
          >
            <FileText size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="lg:hidden flex flex-col gap-4">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <time dateTime={sale.createdAt} className="text-xs font-black text-primary">{new Date(sale.createdAt).toLocaleDateString('es-ES')}</time>
            <span className="w-1 h-1 rounded-full bg-foreground/20" aria-hidden="true" />
            <time dateTime={sale.createdAt} className="text-xs font-semibold text-foreground-muted">{new Date(sale.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</time>
          </div>
          <strong className="text-sm font-black text-contrast tracking-tight">${Number(sale.total).toLocaleString('es-ES')}</strong>
        </header>

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-foreground/5" role="group" aria-label="Personas involucradas">
          <div className="flex items-center gap-2 min-w-0">
            <User size={12} className="text-foreground-muted shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary truncate tracking-tight">{sale.user?.name?.split(' ')[0] || 'Vendedor'}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0 justify-end">
            <UserCircle size={12} className="text-foreground-muted shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground-muted truncate tracking-tight">
              {sale.customer?.name?.split(' ')[0] || 'Final'}
            </span>
          </div>
        </div>

        <footer className="flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
            sale.paymentMethod === 'debt' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
            sale.paymentMethod === 'cash' ? 'bg-success/10 text-success border-success/20' :
            'bg-foreground/5 text-foreground-muted border-foreground/10'
          }`}>
            {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
          </span>
          <button 
            type="button"
            onClick={() => onViewInvoice(sale)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-foreground/5 text-foreground-muted font-bold text-xs active:bg-contrast active:text-white transition-all"
            aria-label="Ver Factura detallada"
          >
            Ver Factura <ChevronRight size={12} aria-hidden="true" />
          </button>
        </footer>
      </section>
    </article>
  );
}
