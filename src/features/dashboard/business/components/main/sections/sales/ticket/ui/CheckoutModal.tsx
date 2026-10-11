'use client';

import { useState, useEffect } from 'react';
import { DeviceMobileIcon, MoneyIcon, SpinnerGapIcon, UserIcon, XIcon } from '@phosphor-icons/react';
import { formatCurrency } from '@/lib/formatters';
import type { CustomerOption } from '@/features/dashboard/business/api/dashboard.api';
import Button from '@/shared/components/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  customers: CustomerOption[];
  isLoadingCustomers: boolean;
  isProcessing: boolean;
  onClose: () => void;
  onLoadCustomers: () => void;
  onConfirmCheckout: (data: {
    paymentMethod: 'cash' | 'transfer' | 'debt';
    customerId?: string | null;
    notes?: string;
  }) => Promise<any>;
}

export default function CheckoutModal({ isOpen, total, customers, isLoadingCustomers, isProcessing, onClose, onLoadCustomers, onConfirmCheckout }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'debt'>('cash');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('cash');
      setSelectedCustomerId('');
      setNotes('');
      setError(null);
    }
  }, [isOpen]);

  const handleSelectPayment = (method: 'cash' | 'transfer' | 'debt') => {
    setPaymentMethod(method);
    setError(null);
    if (method === 'debt' && customers.length === 0) {
      onLoadCustomers();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (paymentMethod === 'debt' && !selectedCustomerId) {
      setError('Para ventas a crédito (Fiado) debes seleccionar un cliente.');
      return;
    }

    const res = await onConfirmCheckout({
      paymentMethod,
      customerId: paymentMethod === 'debt' ? selectedCustomerId : null,
      notes: notes.trim() || undefined,
    });

    if (!res.success) {
      setError(res.error || 'Error al procesar el cobro');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity w-full h-full"
      />

      <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" aria-label="Procesar cobro" className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-primary/10 bg-background/95 shadow-2xl backdrop-blur-sm md:rounded-4xl">
          <header className="flex items-center justify-between border-b border-primary/10 px-4 py-4 sm:px-6">
            <div>
              <h3 className="text-base font-medium leading-relaxed text-foreground/75 sm:text-md">
                Procesar Cobro
              </h3>
              <p className="text-sm font-medium leading-relaxed text-foreground/50">
                Punto de Venta
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-transparent p-2 text-primary transition-all duration-200 hover:border-primary/10 hover:bg-primary/5 hover:shadow-sm active:scale-95 cursor-pointer"
              aria-label="Cerrar modal de cobro"
            >
              <XIcon size={20} />
            </button>
          </header>

          <div className="border-b border-primary/10 px-4 py-4 text-center sm:px-6">
            <span className="mb-0.5 block text-sm font-medium leading-relaxed text-foreground/50">
              Total a pagar
            </span>
            <span className="text-2xl font-bold leading-relaxed text-primary sm:text-3xl">
              {formatCurrency(total)}
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-4 sm:p-6"
          >
            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium leading-relaxed text-foreground/75">
                Método de Pago *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectPayment('cash')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-sm font-medium leading-relaxed transition-all cursor-pointer ${paymentMethod === 'cash'
                    ? 'border-primary bg-primary text-background shadow-sm'
                    : 'border-primary/10 bg-background text-foreground/75 hover:bg-primary/2'
                    }`}
                >
                  <MoneyIcon size={20} weight="bold" />
                  Efectivo
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPayment('transfer')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-sm font-medium leading-relaxed transition-all cursor-pointer ${paymentMethod === 'transfer'
                    ? 'border-primary bg-primary text-background shadow-sm'
                    : 'border-primary/10 bg-background text-foreground/75 hover:bg-primary/2'
                    }`}
                >
                  <DeviceMobileIcon size={20} weight="bold" />
                  Transf.
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPayment('debt')}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-sm font-medium leading-relaxed transition-all cursor-pointer ${paymentMethod === 'debt'
                    ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                    : 'border-amber-200 bg-background text-amber-800 hover:bg-amber-50'
                    }`}
                >
                  <UserIcon size={20} weight="bold" />
                  Fiado
                </button>
              </div>
            </div>

            {paymentMethod === 'debt' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium leading-relaxed text-foreground/75">
                  Cliente *
                </label>
                {isLoadingCustomers ? (
                  <div className="flex items-center justify-center gap-2 py-3 text-sm font-medium leading-relaxed text-foreground/50">
                    <SpinnerGapIcon size={14} className="animate-spin" />
                    Cargando clientes...
                  </div>
                ) : (
                  <select
                    value={selectedCustomerId}
                    onChange={e => setSelectedCustomerId(e.target.value)}
                    className="w-full cursor-pointer rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                    required
                  >
                    <option value="" disabled>
                      -- Selecciona un cliente --
                    </option>
                    {customers.map(c => (
                      <option key={c.customerId} value={c.customerId}>
                        {c.name}
                        {c.totalDebt > 0 ? ` · Deuda: ${formatCurrency(c.totalDebt)}` : ''}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-sm font-medium leading-relaxed text-foreground/75">
                Nota (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Ej: descuento aplicado, cliente frecuente..."
                className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
              />
            </div>
          </form>

          <div className="flex items-center justify-between gap-3 border-t border-primary/10 px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
            <Button
              variant='secondary'
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              variant='primary'
              onClick={handleSubmit}
              disabled={isProcessing || (paymentMethod === 'debt' && !selectedCustomerId)}
            >
              {isProcessing
                ? <SpinnerGapIcon size={14} className="animate-spin" />
                : `Confirmar · ${formatCurrency(total)}`
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
