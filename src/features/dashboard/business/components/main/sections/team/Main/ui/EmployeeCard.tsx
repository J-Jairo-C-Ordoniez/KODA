'use client';

import {
  EnvelopeSimpleIcon,
  PencilSimpleIcon,
  TrashIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import { formatCurrency } from '@/lib/formatters';
import Button from '@/shared/components/Button';

interface EmployeeCardProps {
  employee: Employee;
  onOpenDrawer: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: string) => void;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function EmployeeCard({ employee, onOpenDrawer, onEdit, onDelete }: EmployeeCardProps) {
  const totalAmount = employee.sales.reduce((sum, s) => sum + s.total, 0);

  return (
    <article className="group flex min-h-75 flex-col rounded-3xl border border-primary/10 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md sm:p-6 md:rounded-4xl">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold border-primary/10 bg-primary/5 text-primary overflow-hidden">
            {employee.avatar ? (
              <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
            ) : (
              getInitials(employee.name) || <UserCircleIcon size={24} weight="fill" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold leading-tight tracking-tight text-primary sm:text-lg">
              {employee.name}
            </h3>
            <a
              href={`mailto:${employee.email}`}
              onClick={(event) => event.stopPropagation()}
              className="mt-1 flex w-fit items-center gap-1.5 text-sm leading-relaxed text-foreground/60 transition-colors hover:text-primary"
            >
              <EnvelopeSimpleIcon size={16} weight="regular" />
              <span className="truncate">{employee.email}</span>
            </a>
          </div>
        </div>

        <span className="shrink-0 px-1 py-0.5 text-base font-semibold leading-relaxed text-emerald-600">
          Activo
        </span>
      </header>

      <div className="my-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium leading-tight text-foreground/60">Total ventas</p>
          <p className="mt-1 text-2xl font-bold leading-tight tracking-tight text-primary">
            {formatCurrency(totalAmount)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium leading-tight text-foreground/60">Ventas</p>
          <p className="mt-1 text-xl font-bold leading-tight tracking-tight text-primary">
            {employee._count.sales}
          </p>
        </div>
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <Button variant="primary" onClick={() => onOpenDrawer(employee)}>
            Detalles
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(employee)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-primary/45 transition-colors hover:bg-primary/5 hover:text-primary cursor-pointer"
            title="Editar empleado"
            aria-label={`Editar a ${employee.name}`}
          >
            <PencilSimpleIcon size={20} weight="regular" />
          </button>
          <button
            onClick={() => onDelete(employee.userId)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-primary/45 transition-colors hover:bg-red-500/10 hover:text-red-600 cursor-pointer"
            title="Eliminar empleado"
            aria-label={`Eliminar a ${employee.name}`}
          >
            <TrashIcon size={20} weight="regular" />
          </button>
        </div>
      </footer>
    </article>
  );
}
