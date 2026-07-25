'use client';

import { ShoppingBag, TrendingUp, Clock, CreditCard } from 'lucide-react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import { formatCurrency } from '@/lib/formatters';

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const METHOD_LABEL: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  online: 'Online',
  debt: 'Fiado',
};

export default function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const totalAmount = employee.sales.reduce((sum, s) => sum + s.total, 0);
  const avgSale = employee._count.sales > 0 ? totalAmount / employee._count.sales : 0;

  // Most used payment method
  const methodCount: Record<string, number> = {};
  employee.sales.forEach((s) => {
    methodCount[s.paymentMethod] = (methodCount[s.paymentMethod] || 0) + 1;
  });
  const topMethod = Object.entries(methodCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  const lastSale = employee.sales[0];
  const lastSaleDate = lastSale
    ? new Date(lastSale.createdAt).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <article
      onClick={onClick}
      className="group relative bg-background border border-primary/8 rounded-2xl p-5 flex flex-col gap-5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Subtle top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-base font-bold text-primary shrink-0 overflow-hidden">
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            getInitials(employee.name)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-primary truncate">{employee.name}</h3>
          <p className="text-xs text-primary/45 truncate">{employee.email}</p>
        </div>
        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          Activo
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-foreground-muted/30">
          <ShoppingBag size={14} className="text-primary/50 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Ventas</p>
            <p className="text-sm font-bold text-primary">{employee._count.sales}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-foreground-muted/30">
          <TrendingUp size={14} className="text-primary/50 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Total</p>
            <p className="text-sm font-bold text-primary">{formatCurrency(totalAmount)}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-foreground-muted/30">
          <CreditCard size={14} className="text-primary/50 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Promedio</p>
            <p className="text-sm font-bold text-primary">{formatCurrency(avgSale)}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-foreground-muted/30">
          <Clock size={14} className="text-primary/50 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Última</p>
            <p className="text-sm font-bold text-primary">{lastSaleDate ?? '—'}</p>
          </div>
        </div>
      </div>

      {/* Top method badge */}
      {topMethod && (
        <div className="flex items-center justify-between border-t border-primary/5 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
            Método principal
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-foreground-muted/50 text-primary/70">
            {METHOD_LABEL[topMethod] ?? topMethod}
          </span>
        </div>
      )}
    </article>
  );
}
