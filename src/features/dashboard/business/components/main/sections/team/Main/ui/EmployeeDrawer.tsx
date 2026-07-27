'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { SidebarIcon, LoaderCircle, Loader2 } from 'lucide-react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
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

export default function EmployeeDrawer({
  isOpen,
  employee,
  onClose,
  onEdit,
  onDelete,
  isSaving,
}: EmployeeDrawerProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [mounted] = useState(true);

  if (!isOpen || !employee || typeof document === 'undefined') return null;

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

  const drawerContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-9999 bg-black/10 backdrop-blur-[1px] transition-opacity"
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-10000 w-full max-w-md bg-background border-l border-primary/5 shadow-2xl flex flex-col animate-slide-in-right h-full">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-primary/5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0 overflow-hidden">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(employee.name)
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-primary tracking-tight">{employee.name}</h3>
              <p className="text-sm text-primary/60 mt-0.5">{employee.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            aria-label="Cerrar panel"
          >
            <SidebarIcon size={20} />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Role badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-emerald-50 border-emerald-100 text-emerald-700">
              Activo
            </span>
            <span className="text-xs font-medium text-primary/45">Empleado</span>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-foreground-muted/30 border border-primary/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Ventas</p>
              <p className="text-lg font-bold text-primary">{employee._count.sales}</p>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-foreground-muted/30 border border-primary/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Total</p>
              <p className="text-lg font-bold text-primary">
                {employee.sales.reduce((sum, s) => sum + s.total, 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-foreground-muted/30 border border-primary/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/45">Promedio</p>
              <p className="text-lg font-bold text-primary">
                {employee._count.sales > 0
                  ? (employee.sales.reduce((sum, s) => sum + s.total, 0) / employee._count.sales).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
                  : '$0'}
              </p>
            </div>
          </div>

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
                        {sale.paymentMethod === 'cash' ? 'Efectivo'
                          : sale.paymentMethod === 'transfer' ? 'Transferencia'
                          : sale.paymentMethod === 'online' ? 'Online'
                          : sale.paymentMethod === 'debt' ? 'Fiado'
                          : sale.paymentMethod}
                      </span>
                      <span className="text-xs text-primary/45">
                        {new Date(sale.createdAt).toLocaleDateString('es-CO', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {sale.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-primary/5 bg-background-card flex items-center justify-end gap-3">
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
              <Button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                variant="secondary"
              >
                Eliminar
              </Button>

              <Button
                type="button"
                onClick={() => onEdit(employee)}
              >
                Editar empleado
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );

  return createPortal(drawerContent, document.body);
}
