'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  SidebarSimpleIcon,
  SpinnerGapIcon,
  ReceiptIcon,
} from '@phosphor-icons/react';
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

export default function EmployeeDrawer({
  isOpen,
  employee,
  onClose,
  onEdit,
  onDelete,
  isSaving,
}: EmployeeDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [displayedEmployee, setDisplayedEmployee] = useState<Employee | null>(employee);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (employee) {
      setDisplayedEmployee(employee);
    }
  }, [employee]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setConfirmDelete(false);
      const animationFrame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(animationFrame);
    }

    setIsVisible(false);
    const closeTimer = window.setTimeout(() => setShouldRender(false), 300);
    return () => window.clearTimeout(closeTimer);
  }, [isOpen]);

  if (!shouldRender || !mounted || !displayedEmployee) return null;

  const totalAmount = displayedEmployee.sales.reduce((sum, s) => sum + s.total, 0);
  const avgSale = displayedEmployee._count.sales > 0 ? totalAmount / displayedEmployee._count.sales : 0;

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    const res = await onDelete(displayedEmployee.userId);
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
        className={`fixed inset-0 z-9999 bg-black/10 backdrop-blur-[1px] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Detalle del Empleado"
        className={`fixed inset-y-0 right-0 z-10000 flex h-full w-full max-w-lg flex-col border-l border-primary/10 bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-primary">
              Detalle del Empleado
            </h3>
            <p className="mt-1 text-sm text-primary/60">
              {displayedEmployee.name} · {displayedEmployee.email}
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-transparent p-2 text-primary transition-all duration-200 hover:border-primary/10 hover:bg-primary/5 hover:shadow-sm active:scale-95"
            aria-label="Cerrar panel de empleado"
          >
            <SidebarSimpleIcon size={24} weight="regular" />
          </button>
        </header>

        {/* Current Summary Bar */}
        <div className="flex items-center justify-between border-b border-primary/10 bg-background-card px-5 py-4">
          <div>
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-primary/65">
              Total en Ventas
            </span>
            <p className="text-xl font-bold tracking-tight text-primary">
              {formatCurrency(totalAmount)}
            </p>
          </div>

          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            Activo
          </span>
        </div>

        {/* Scrollable body */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">
          {/* KPI strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-primary/10 bg-background-card p-3.5 shadow-xs">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-primary/45">
                Ventas
              </span>
              <p className="text-lg font-bold text-primary">
                {displayedEmployee._count.sales}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-background-card p-3.5 shadow-xs">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-primary/45">
                Total
              </span>
              <p className="text-lg font-bold text-primary">
                {formatCurrency(totalAmount)}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-background-card p-3.5 shadow-xs">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-primary/45">
                Promedio
              </span>
              <p className="text-lg font-bold text-primary">
                {formatCurrency(avgSale)}
              </p>
            </div>
          </div>

          {/* Sales history */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/65">
              Historial de ventas {displayedEmployee.sales.length > 0 && `(${displayedEmployee.sales.length})`}
            </h4>

            {displayedEmployee.sales.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-background-card p-6 py-16 text-center shadow-xs">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary/50">
                  <ReceiptIcon size={24} weight="regular" />
                </div>
                <h4 className="text-base font-medium tracking-tight text-primary">
                  Sin ventas registradas
                </h4>
                <p className="mt-1 max-w-xs text-sm text-primary/60">
                  Este empleado aún no ha registrado ventas en el sistema.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {displayedEmployee.sales.map((sale) => (
                  <div
                    key={sale.saleId}
                    className="space-y-2 rounded-2xl border border-primary/10 bg-background-card p-4 shadow-xs transition-all duration-200 hover:border-primary/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-md border border-primary/8 bg-foreground-muted/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary/60">
                          {sale.paymentMethod === 'cash'
                            ? 'Efectivo'
                            : sale.paymentMethod === 'transfer'
                            ? 'Transferencia'
                            : sale.paymentMethod === 'online'
                            ? 'Online'
                            : sale.paymentMethod === 'debt'
                            ? 'Fiado'
                            : sale.paymentMethod}
                        </span>
                        <p className="mt-1 text-xs font-medium text-primary/50">
                          {new Date(sale.createdAt).toLocaleDateString('es-CO', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-base font-bold tracking-tight text-primary">
                          {formatCurrency(sale.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <footer className="flex items-center justify-end gap-3 border-t border-primary/10 bg-background-card p-4 sm:p-5">
          {confirmDelete ? (
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-xs font-medium text-red-500">¿Confirmar eliminación?</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirmDelete(false)}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSaving ? <SpinnerGapIcon size={14} className="animate-spin" /> : 'Eliminar'}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setConfirmDelete(true)}
                disabled={isSaving}
              >
                Eliminar
              </Button>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => onEdit(displayedEmployee)}
              >
                Editar empleado
              </Button>
            </>
          )}
        </footer>
      </aside>
    </>
  );

  return createPortal(drawerContent, document.body);
}
