'use client';

import { useState } from 'react';
import { X, ShoppingBag, TrendingUp, CreditCard, Banknote, Smartphone, Loader2, Trash2, Pencil } from 'lucide-react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import { formatCurrency } from '@/lib/formatters';
import Button from '@/shared/components/Button';

interface EmployeeDrawerProps {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: string) => Promise<{ success: boolean; error?: string }>;
  isSaving: boolean;
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

const METHOD_LABEL: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  online: 'Online',
  debt: 'Fiado',
};

const METHOD_ICON: Record<string, React.ReactNode> = {
  cash: <Banknote size={12} />,
  transfer: <Smartphone size={12} />,
  online: <CreditCard size={12} />,
  debt: <CreditCard size={12} />,
};

export default function EmployeeDrawer({
  isOpen,
  employee,
  onClose,
  onEdit,
  onDelete,
  isSaving,
}: EmployeeDrawerProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!isOpen || !employee) return null;

  const totalAmount = employee.sales.reduce((sum, s) => sum + s.total, 0);
  const avgSale = employee._count.sales > 0 ? totalAmount / employee._count.sales : 0;

  const methodBreakdown: Record<string, { count: number; amount: number }> = {};
  employee.sales.forEach((s) => {
    if (!methodBreakdown[s.paymentMethod]) {
      methodBreakdown[s.paymentMethod] = { count: 0, amount: 0 };
    }
    methodBreakdown[s.paymentMethod].count++;
    methodBreakdown[s.paymentMethod].amount += s.total;
  });

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    const res = await onDelete(employee.userId);
    if (res.success) {
      setConfirmDelete(false);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-primary/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-primary/10 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0 overflow-hidden">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(employee.name)
              )}
            </div>
            <div>
              <h3 className="text-base font-medium text-primary tracking-tight">{employee.name}</h3>
              <p className="text-xs text-primary/40">{employee.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <X size={18} />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* KPI strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-foreground-muted/30 border border-primary/5">
              <ShoppingBag size={14} className="text-primary/50" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Ventas</p>
              <p className="text-lg font-bold text-primary">{employee._count.sales}</p>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-foreground-muted/30 border border-primary/5">
              <TrendingUp size={14} className="text-primary/50" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Total</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-foreground-muted/30 border border-primary/5">
              <CreditCard size={14} className="text-primary/50" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Promedio</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(avgSale)}</p>
            </div>
          </div>

          {/* Payment method breakdown */}
          {Object.keys(methodBreakdown).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary/50">
                Métodos de pago
              </h4>
              <div className="space-y-2">
                {Object.entries(methodBreakdown)
                  .sort((a, b) => b[1].count - a[1].count)
                  .map(([method, stats]) => (
                    <div
                      key={method}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-foreground-muted/30 border border-primary/5"
                    >
                      <div className="flex items-center gap-2 text-primary/70">
                        {METHOD_ICON[method]}
                        <span className="text-xs font-semibold">{METHOD_LABEL[method] ?? method}</span>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <span className="text-[10px] text-primary/45 font-medium">{stats.count} ventas</span>
                        <span className="text-xs font-bold text-primary">{formatCurrency(stats.amount)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Sales history */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/50">
              Historial de ventas {employee.sales.length > 0 && `(${employee.sales.length})`}
            </h4>

            {employee.sales.length === 0 ? (
              <div className="text-center py-8 text-xs text-primary/40">
                Este empleado aún no ha registrado ventas.
              </div>
            ) : (
              <div className="space-y-1.5">
                {employee.sales.map((sale) => (
                  <div
                    key={sale.saleId}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-primary/5 hover:bg-foreground-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-foreground-muted/60 text-primary/60">
                        {METHOD_LABEL[sale.paymentMethod] ?? sale.paymentMethod}
                      </span>
                      <span className="text-xs text-primary/45">
                        {new Date(sale.createdAt).toLocaleDateString('es-CO', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">{formatCurrency(sale.total)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <footer className="px-5 py-4 border-t border-primary/5 flex items-center justify-between gap-3 shrink-0">
          {confirmDelete ? (
            <div className="flex items-center gap-2 w-full">
              <p className="text-xs text-red-500 font-medium flex-1">¿Confirmar eliminación?</p>
              <Button variant="secondary" onClick={() => setConfirmDelete(false)} disabled={isSaving}>
                Cancelar
              </Button>
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="flex items-center gap-1.5 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? <Loader2 size={13} className="animate-spin" /> : 'Eliminar'}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="flex items-center gap-1.5 py-2 px-3 text-red-500 hover:bg-red-50 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Trash2 size={13} />
                Eliminar
              </button>
              <Button
                variant="primary"
                onClick={() => onEdit(employee)}
              >
                <Pencil size={13} />
                Editar empleado
              </Button>
            </>
          )}
        </footer>
      </div>
    </>
  );
}
