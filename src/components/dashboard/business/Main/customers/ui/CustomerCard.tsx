'use client';

import { User, Phone, Wallet, History, ArrowRight } from 'lucide-react';

interface CustomerCardProps {
  customer: any;
  onViewHistory: (customer: any) => void;
  onRegisterPayment: (customer: any) => void;
}

export function CustomerCard({ customer, onViewHistory, onRegisterPayment }: CustomerCardProps) {
  const debt = Number(customer.totalDebt);

  return (
    <article className="group bg-background-elevated/40 border border-white/5 rounded-[40px] p-7 transition-all duration-500 hover:border-contrast/20 hover:bg-background-elevated/60 relative overflow-hidden flex flex-col h-full">
      {/* Top Section: Profile & Status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground-muted group-hover:text-contrast transition-colors shrink-0">
            <User size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[13px] font-black text-primary tracking-tight truncate uppercase leading-tight">
              {customer.name}
            </h3>
            <div className="flex items-center gap-1.5 text-foreground-muted mt-1 opacity-60">
              <Phone size={10} />
              <p className="text-[9px] font-black uppercase tracking-widest">{customer.phone}</p>
            </div>
          </div>
        </div>
        
        <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[8px] font-black text-red-400 uppercase tracking-widest shrink-0 mt-1">
          En Mora
        </span>
      </div>

      {/* Center Section: Debt - Clean and minimalist */}
      <div className="my-10 flex flex-col items-center justify-center text-center">
        <p className="text-[9px] font-black text-foreground-muted uppercase tracking-[0.3em] mb-3 opacity-40">Deuda Pendiente</p>
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-contrast tracking-tighter opacity-80">$</span>
          <span className="text-4xl font-black text-primary tracking-tighter group-hover:scale-105 transition-transform duration-500">
            {debt.toLocaleString('es-ES')}
          </span>
        </div>
      </div>

      {/* Bottom Section: Actions */}
      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={() => onViewHistory(customer)}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-foreground/5 text-foreground-muted hover:bg-foreground/10 transition-all text-[9px] font-black uppercase tracking-widest"
          title="Ver Historial"
        >
          <History size={14} /> Historial
        </button>
        <button
          onClick={() => onRegisterPayment(customer)}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-contrast text-white shadow-xl shadow-contrast/10 hover:bg-contrast-hover transition-all text-[9px] font-black uppercase tracking-widest active:scale-95"
        >
          <Wallet size={14} /> Abonar
        </button>
      </div>

      {/* Floating accent icon */}
      <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 pointer-events-none">
        <Wallet size={100} className="text-contrast" />
      </div>
    </article>
  );
}
