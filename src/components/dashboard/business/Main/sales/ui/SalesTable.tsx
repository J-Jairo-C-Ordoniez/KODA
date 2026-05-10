'use client';

import { Calendar, User, CreditCard, FileText, ChevronRight, Clock, UserCircle, ShoppingBag, Search, X } from 'lucide-react';

interface SalesTableProps {
  sales: any[];
  newSaleId: string | null;
  onViewInvoice: (sale: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  debt: 'Deuda',
  online: 'En Línea',
};

export function SalesTable({ sales, newSaleId, onViewInvoice, searchTerm, setSearchTerm }: SalesTableProps) {
  return (
    <div className="w-full space-y-6">
      {/* List Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast shrink-0">
            <ShoppingBag size={16} />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none">Listado de Transacciones</h4>
            <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest opacity-60 mt-1">Gestiona y revisa cada venta</p>
          </div>
        </div>

        <div className="relative group w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200" size={16} />
          <input 
            type="text" 
            placeholder="Buscar por vendedor o cliente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[280px] pl-11 pr-10 py-3 rounded-2xl bg-background-elevated border border-foreground/8 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-xs text-primary placeholder:text-foreground-muted/40"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-foreground/5 text-foreground-muted transition-all"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-8 py-4 bg-foreground/2 border-b border-foreground/5 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Fecha / Hora</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Vendedor</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Cliente</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Método</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted text-right">Total</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted text-center">Acciones</span>
      </div>

      <div className="space-y-3">
        {sales.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-background-elevated/30 rounded-[32px] border border-dashed border-foreground/10">
            <div className="w-16 h-16 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto text-foreground-muted/20">
              <Search size={32} />
            </div>
            <p className="text-xs font-bold text-foreground-muted uppercase tracking-widest">No se encontraron resultados</p>
          </div>
        ) : (
          sales.map((sale: any) => (
            <article 
              key={sale.saleId} 
              className={`
                group relative bg-background-elevated/50 lg:bg-background-elevated border border-foreground/5 lg:border-foreground/8 rounded-[32px] p-5 lg:p-0 transition-all duration-300 hover:border-contrast/30
                ${newSaleId === sale.saleId ? 'ring-2 ring-contrast shadow-2xl shadow-contrast/10 animate-in zoom-in-95' : ''}
              `}
            >
              {/* Desktop Row */}
              <div className="hidden lg:grid lg:grid-cols-6 lg:items-center gap-4 lg:px-8 lg:py-5">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground-muted group-hover:text-contrast transition-colors">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{new Date(sale.createdAt).toLocaleDateString('es-ES')}</p>
                    <p className="text-[10px] font-medium text-foreground-muted">{new Date(sale.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                {/* Seller */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-contrast/10 flex items-center justify-center text-contrast">
                    <User size={12} />
                  </div>
                  <p className="text-xs font-bold text-primary truncate">{sale.user?.name || '—'}</p>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-2">
                  <UserCircle size={14} className="text-foreground-muted" />
                  <p className="text-xs font-medium text-foreground-muted truncate">
                    {sale.customer?.name || <span className="opacity-40 italic">Consumidor Final</span>}
                  </p>
                </div>

                {/* Method */}
                <div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2 w-fit border ${
                    sale.paymentMethod === 'debt' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    sale.paymentMethod === 'cash' ? 'bg-success/10 text-success border-success/20' :
                    'bg-foreground/5 text-foreground-muted border-foreground/10'
                  }`}>
                    <CreditCard size={10} />
                    {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                  </span>
                </div>

                {/* Total */}
                <div className="text-right">
                  <p className="text-base font-black text-primary">${Number(sale.total).toLocaleString('es-ES')}</p>
                </div>

                {/* Invoice Button */}
                <div className="flex justify-center">
                  <button 
                    onClick={() => onViewInvoice(sale)}
                    className="w-10 h-10 rounded-xl bg-foreground/5 text-foreground-muted flex items-center justify-center hover:bg-contrast hover:text-white transition-all shadow-sm"
                    title="Ver Factura"
                  >
                    <FileText size={16} />
                  </button>
                </div>
              </div>

              {/* Mobile Card Layout - Simplified */}
              <div className="lg:hidden flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-black text-primary">{new Date(sale.createdAt).toLocaleDateString('es-ES')}</p>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest">{new Date(sale.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <p className="text-sm font-black text-contrast tracking-tight">${Number(sale.total).toLocaleString('es-ES')}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-foreground/5">
                  <div className="flex items-center gap-2 min-w-0">
                    <User size={12} className="text-foreground-muted shrink-0" />
                    <p className="text-[11px] font-bold text-primary truncate uppercase tracking-tight">{sale.user?.name?.split(' ')[0] || 'Vendedor'}</p>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 justify-end">
                    <UserCircle size={12} className="text-foreground-muted shrink-0" />
                    <p className="text-[11px] font-medium text-foreground-muted truncate uppercase tracking-tight">
                      {sale.customer?.name?.split(' ')[0] || 'Final'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg border ${
                    sale.paymentMethod === 'debt' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    sale.paymentMethod === 'cash' ? 'bg-success/10 text-success border-success/20' :
                    'bg-foreground/5 text-foreground-muted border-foreground/10'
                  }`}>
                    {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                  </span>
                  <button 
                    onClick={() => onViewInvoice(sale)}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-foreground/5 text-foreground-muted font-black text-[9px] uppercase tracking-widest active:bg-contrast active:text-white transition-all"
                  >
                    Ver Factura <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </article>
          )
        ))}
      </div>
    </div>
  );
}
