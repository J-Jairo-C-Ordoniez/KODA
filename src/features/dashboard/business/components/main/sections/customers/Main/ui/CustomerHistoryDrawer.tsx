'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, History, PlusCircle, MinusCircle, Wallet, ShoppingBag, Loader2, MessageCircle } from 'lucide-react';
import { Customer, CustomerHistoryData } from '@/features/dashboard/business/api/customers.api';
import { formatCurrency } from '@/lib/formatters';

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
  const [historyData, setHistoryData] = useState<CustomerHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && customer) {
      setIsLoading(true);
      onFetchHistory(customer.customerId).then((data) => {
        setHistoryData(data);
        setIsLoading(false);
      });
    }
  }, [isOpen, customer, onFetchHistory]);

  if (!isOpen || !customer || !mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-[10000] w-full max-w-lg bg-background border-l border-primary/5 shadow-2xl flex flex-col animate-slide-in-right h-full">
        {/* Header */}
        <div className="p-5 border-b border-primary/5 bg-background-card flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary text-background flex items-center justify-center font-bold">
              <History size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Cuaderno Digital</h3>
              <p className="text-xs font-semibold text-primary/60">{customer.name} · {customer.phone}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Debt Bar & Quick Action */}
        <div className="p-4 bg-foreground-muted/20 border-b border-primary/5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
              Deuda Actual
            </p>
            <p className={`text-lg font-bold ${customer.totalDebt > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
              {formatCurrency(customer.totalDebt)}
            </p>
          </div>

          {customer.totalDebt > 0 && (
            <button
              onClick={() => {
                onClose();
                onOpenPayment(customer);
              }}
              className="flex items-center gap-1.5 py-2 px-3.5 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Wallet size={14} /> Registrar Abono
            </button>
          )}
        </div>

        {/* Kardex Timeline Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-primary/40">
              <Loader2 size={28} className="animate-spin" />
              <p className="text-xs font-bold uppercase tracking-wider">Cargando Kardex...</p>
            </div>
          ) : !historyData || historyData.timeline.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 p-6 rounded-2xl border border-primary/8 bg-background-card">
              <div className="w-12 h-12 rounded-2xl bg-foreground-muted/40 text-primary/40 flex items-center justify-center mb-3">
                <History size={24} />
              </div>
              <h4 className="text-sm font-bold text-primary">Sin movimientos registrados</h4>
              <p className="text-xs text-primary/55 mt-1 max-w-xs">
                Este cliente no posee compras ni abonos registrados en el sistema.
              </p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/10">
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
                  <div key={event.id} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background shadow-xs ${
                        isAbono
                          ? 'bg-emerald-500 text-white'
                          : isDebtCharge
                          ? 'bg-amber-500 text-white'
                          : 'bg-primary/40 text-white'
                      }`}
                    >
                      {isAbono ? (
                        <MinusCircle size={12} />
                      ) : (
                        <PlusCircle size={12} />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="bg-background-card border border-primary/8 hover:border-primary/20 rounded-2xl p-4 transition-all space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${
                              isAbono
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : isDebtCharge
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-primary/5 text-primary/60 border-primary/10'
                            }`}
                          >
                            {isAbono ? 'Abono Recibido' : isDebtCharge ? 'Compra a Crédito (Fiado)' : 'Compra al Contado'}
                          </span>
                          <p className="text-xs font-semibold text-primary/50 mt-1">
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
                          <p className="text-[10px] font-bold text-primary/40 uppercase">
                            Saldo: {formatCurrency(event.balanceAfter)}
                          </p>
                        </div>
                      </div>

                      {/* Items breakdown if purchase */}
                      {event.items && event.items.length > 0 && (
                        <div className="pt-2 border-t border-primary/5 space-y-1">
                          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest flex items-center gap-1">
                            <ShoppingBag size={10} /> Artículos:
                          </p>
                          <ul className="text-xs text-primary/75 space-y-0.5">
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
                        <p className="text-xs italic text-primary/60 pt-1 border-t border-primary/5">
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
      </aside>
    </>,
    document.body
  );
}
