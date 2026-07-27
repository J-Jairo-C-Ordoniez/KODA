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

export default function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const totalAmount = employee.sales.reduce((sum, s) => sum + s.total, 0);
  const avgSale = employee._count.sales > 0 ? totalAmount / employee._count.sales : 0;

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
      className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
    >
      {/* Header compacto */}
      <header className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/8 flex items-center justify-center text-sm font-bold text-primary overflow-hidden">
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            getInitials(employee.name)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors truncate">
            {employee.name}
          </h3>
          <p className="text-xs text-primary/45 truncate">{employee.email}</p>
        </div>
        <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg border text-emerald-700 bg-emerald-50 border-emerald-100">
          Activo
        </span>
      </header>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between border-t border-primary/10 pt-4">
        <p className="text-sm text-primary/60 mb-4">
          {employee._count.sales} {employee._count.sales === 1 ? 'venta' : 'ventas'} registradas
        </p>

        {/* Stats footer */}
        <div className="pt-4 border-t border-primary/10 flex items-end justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold uppercase text-primary/60">
              Total ventas
            </h4>
            <p className="text-2xl font-bold tracking-tight text-primary">
              {formatCurrency(totalAmount)}
            </p>
          </div>

          <div className="text-right">
            <h4 className="text-sm font-semibold uppercase text-primary/60">
              Promedio
            </h4>
            <p className="text-lg font-bold tracking-tight text-primary">
              {formatCurrency(avgSale)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
