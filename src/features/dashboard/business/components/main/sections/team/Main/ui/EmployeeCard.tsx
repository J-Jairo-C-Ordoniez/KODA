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
      {/* Avatar area */}
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-xl bg-primary/5 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-primary/30 select-none">
              {getInitials(employee.name)}
            </span>
          )}
        </div>

        {/* Status badge */}
        <span className="absolute right-3 top-3 text-xs font-bold px-2.5 py-1 rounded-lg border backdrop-blur-xs text-emerald-700 bg-emerald-50 border-emerald-100">
          Activo
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between border-t border-primary/10 pt-4">
        <header className="mb-4 space-y-1.5">
          <p className="text-sm font-semibold uppercase text-primary/60">
            {employee.email}
          </p>
          <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
            {employee.name}
          </h3>
          <p className="text-sm text-primary/60">
            {employee._count.sales} {employee._count.sales === 1 ? 'venta' : 'ventas'} registradas
          </p>
        </header>

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
