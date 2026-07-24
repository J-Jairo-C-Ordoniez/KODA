'use client';

import { useState, useEffect } from 'react';
import { X, Banknote, Smartphone, User, Loader2 } from 'lucide-react';
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
        <div className="w-full max-w-sm bg-background border border-primary/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <header className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
            <div>
              <h3 className="text-lg font-medium text-primary tracking-tight">
                Procesar Cobro
              </h3>
              <p className="text-sm text-primary/40">
                Punto de Venta
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <X size={20} />
            </button>
          </header>

          <div className="px-5 py-4 text-center border-b border-primary/10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/50 block mb-0.5">
              Total a pagar
            </span>
            <span className="text-3xl font-bold text-primary tracking-tight">
              {formatCurrency(total)}
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 space-y-5"
          >
            {error && (
              <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                Método de Pago *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectPayment('cash')}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${paymentMethod === 'cash'
                    ? 'bg-primary text-background border-primary shadow-xs'
                    : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                    }`}
                >
                  <Banknote size={20} />
                  Efectivo
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPayment('transfer')}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${paymentMethod === 'transfer'
                    ? 'bg-primary text-background border-primary shadow-xs'
                    : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                    }`}
                >
                  <Smartphone size={20} />
                  Transf.
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPayment('debt')}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${paymentMethod === 'debt'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                    }`}
                >
                  <User size={20} />
                  Fiado
                </button>
              </div>
            </div>

            {paymentMethod === 'debt' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                  Cliente *
                </label>
                {isLoadingCustomers ? (
                  <div className="flex items-center justify-center gap-2 py-3 text-sm text-primary/60">
                    <Loader2 size={14} className="animate-spin" />
                    Cargando clientes...
                  </div>
                ) : (
                  <select
                    value={selectedCustomerId}
                    onChange={e => setSelectedCustomerId(e.target.value)}
                    className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl p-3 text-xs font-semibold text-primary outline-none transition-all cursor-pointer"
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
              <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                Nota (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Ej: descuento aplicado, cliente frecuente..."
                className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
              />
            </div>
          </form>

          <div className="px-5 pb-5 flex items-center justify-between gap-3 border-t border-primary/5 pt-4">
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
                ? <Loader2 size={14} className="animate-spin" />
                : `Confirmar · ${formatCurrency(total)}`
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
