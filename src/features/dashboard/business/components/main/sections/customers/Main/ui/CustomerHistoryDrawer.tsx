'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  SidebarSimpleIcon,
  SpinnerGapIcon,
  WalletIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  BookOpenIcon,
} from '@phosphor-icons/react';
import { Customer, CustomerHistoryData } from '@/features/dashboard/business/api/customers.api';
import { formatCurrency } from '@/lib/formatters';
import Button from '@/shared/components/Button';

interface CustomerHistoryDrawerProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onFetchHistory: (customerId: string) => Promise<CustomerHistoryData | null>;
  onOpenPayment: (customer: Customer) => void;
}

export default function CustomerHistoryDrawer({
  isOpen,
  customer,
  onClose,
  onFetchHistory,
  onOpenPayment,
}: CustomerHistoryDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [historyData, setHistoryData] = useState<CustomerHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedCustomer, setDisplayedCustomer] = useState<Customer | null>(customer);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (customer) {
      setDisplayedCustomer(customer);
    }
  }, [customer]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const animationFrame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(animationFrame);
    }

    setIsVisible(false);
    const closeTimer = window.setTimeout(() => setShouldRender(false), 300);
    return () => window.clearTimeout(closeTimer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && customer) {
      setIsLoading(true);
      onFetchHistory(customer.customerId).then((data) => {
        setHistoryData(data);
        setIsLoading(false);
      });
    }
  }, [isOpen, customer, onFetchHistory]);

  if (!shouldRender || !mounted || !displayedCustomer) return null;

  return createPortal(
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
        aria-label="Cuaderno Digital"
        className={`fixed inset-y-0 right-0 z-10000 flex h-full w-full max-w-lg flex-col border-l border-primary/10 bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-primary">
              Cuaderno Digital
            </h3>
            <p className="mt-1 text-sm text-primary/60">
              {displayedCustomer.name} · {displayedCustomer.phone}
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-transparent p-2 text-primary transition-all duration-200 hover:border-primary/10 hover:bg-primary/5 hover:shadow-sm active:scale-95"
            aria-label="Cerrar cuaderno"
          >
            <SidebarSimpleIcon size={24} weight="regular" />
          </button>
        </header>

        {/* Current Debt Bar & Quick Action */}
        <div className="flex items-center justify-between border-b border-primary/10 bg-background-card px-5 py-4">
          <div>
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-primary/65">
              Deuda Actual
            </span>
            <p className={`text-xl font-bold tracking-tight ${
              displayedCustomer.totalDebt > 0 ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {formatCurrency(displayedCustomer.totalDebt)}
            </p>
          </div>

          {displayedCustomer.totalDebt > 0 && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenPayment(displayedCustomer);
              }}
              className="flex items-center gap-1.5"
            >
              <WalletIcon size={16} weight="bold" />
              <span>Registrar Abono</span>
            </Button>
          )}
        </div>

        {/* Kardex Timeline Content */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-primary/40">
              <SpinnerGapIcon size={28} className="animate-spin text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-primary/60">
                Cargando movimientos...
              </p>
            </div>
          ) : !historyData || historyData.timeline.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-background-card p-6 py-16 text-center shadow-xs">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary/50">
                <BookOpenIcon size={24} weight="regular" />
              </div>
              <h4 className="text-base font-medium tracking-tight text-primary">
                Sin movimientos registrados
              </h4>
              <p className="mt-1 max-w-xs text-sm text-primary/60">
                Este cliente no posee compras ni abonos registrados en el sistema.
              </p>
            </div>
          ) : (
            <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-0.5 before:bg-primary/10">
              {historyData.timeline.map((event) => {
                const isAbono = event.type === 'abono';
                const isDebtCharge = event.type === 'charge' && event.paymentMethod === 'debt';
                const dateFormatted = new Date(event.createdAt).toLocaleDateString('es-CO', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div key={event.id} className="group relative">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background shadow-xs ${
                        isAbono
                          ? 'bg-emerald-500 text-white'
                          : isDebtCharge
                          ? 'bg-amber-500 text-white'
                          : 'bg-primary/40 text-white'
                      }`}
                    >
                      {isAbono ? (
                        <MinusCircleIcon size={12} weight="bold" />
                      ) : (
                        <PlusCircleIcon size={12} weight="bold" />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="space-y-2 rounded-2xl border border-primary/10 bg-background-card p-4 shadow-xs transition-all duration-200 hover:border-primary/20">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isAbono
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : isDebtCharge
                                ? 'border-amber-200 bg-amber-50 text-amber-700'
                                : 'border-primary/8 bg-foreground-muted/40 text-primary/60'
                            }`}
                          >
                            {isAbono ? 'Abono Recibido' : isDebtCharge ? 'Compra a Crédito (Fiado)' : 'Compra al Contado'}
                          </span>
                          <p className="mt-1 text-xs font-medium text-primary/50">
                            {dateFormatted}
                          </p>
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-base font-bold tracking-tight ${
                              isAbono ? 'text-emerald-600' : isDebtCharge ? 'text-amber-800' : 'text-primary'
                            }`}
                          >
                            {isAbono ? '-' : '+'}{formatCurrency(event.amount)}
                          </p>
                          <p className="text-[10px] font-bold uppercase text-primary/40">
                            Saldo: {formatCurrency(event.balanceAfter)}
                          </p>
                        </div>
                      </div>

                      {/* Items breakdown if purchase */}
                      {event.items && event.items.length > 0 && (
                        <div className="space-y-1 border-t border-primary/10 pt-2">
                          <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary/45">
                            <ShoppingBagIcon size={12} weight="bold" /> Artículos:
                          </p>
                          <ul className="space-y-0.5 text-xs text-primary/75">
                            {event.items.map((it, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{it.quantity}x {it.name}</span>
                                <span className="font-mono font-medium">{formatCurrency(it.price * it.quantity)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Note */}
                      {event.note && (
                        <p className="border-t border-primary/10 pt-1 text-xs italic text-primary/60">
                          "{event.note}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 border-t border-primary/10 bg-background-card p-4 sm:p-5">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Cerrar
          </Button>
          {displayedCustomer.totalDebt > 0 && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenPayment(displayedCustomer);
              }}
            >
              Registrar Abono
            </Button>
          )}
        </footer>
      </aside>
    </>,
    document.body
  );
}
