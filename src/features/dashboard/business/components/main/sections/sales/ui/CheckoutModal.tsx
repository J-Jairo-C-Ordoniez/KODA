'use client';

import { useState, useEffect } from 'react';
import { X, Check, Banknote, Smartphone, User, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { CustomerOption } from '@/features/dashboard/business/api/dashboard.api';

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

export default function CheckoutModal({
  isOpen,
  total,
  customers,
  isLoadingCustomers,
  isProcessing,
  onClose,
  onLoadCustomers,
  onConfirmCheckout,
}: CheckoutModalProps) {
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

  // Load customers when Fiado is selected
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
        className="fixed inset-0 z-[140] bg-black/15 backdrop-blur-[2px]"
      />

      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-background border border-primary/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary/5 bg-background-card">
            <div>
              <h3 className="text-sm font-bold text-primary tracking-tight">Procesar Cobro</h3>
              <p className="text-xs font-semibold text-primary/40 uppercase tracking-wider mt-0.5">
                Punto de Venta
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Total Banner */}
          <div className="bg-primary/3 px-5 py-4 text-center border-b border-primary/5">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/50 block mb-0.5">
              Total a pagar
            </span>
            <span className="text-3xl font-bold text-primary tracking-tight">
              {formatCurrency(total)}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Método de Pago */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                Método de Pago *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectPayment('cash')}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'bg-primary text-background border-primary shadow-xs'
                      : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                  }`}
                >
                  <Banknote size={18} />
                  Efectivo
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPayment('transfer')}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'transfer'
                      ? 'bg-primary text-background border-primary shadow-xs'
                      : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                  }`}
                >
                  <Smartphone size={18} />
                  Transf.
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPayment('debt')}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'debt'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <User size={18} />
                  Fiado
                </button>
              </div>
            </div>

            {/* Customer selector — only for Fiado */}
            {paymentMethod === 'debt' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                  Cliente *
                </label>
                {isLoadingCustomers ? (
                  <div className="flex items-center justify-center gap-2 py-3 text-xs text-primary/50">
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

            {/* Optional notes */}
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

          {/* Footer */}
          <div className="px-5 pb-5 flex items-center justify-between gap-3 border-t border-primary/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="py-2.5 px-4 text-primary/60 hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing || (paymentMethod === 'debt' && !selectedCustomerId)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Procesando...
                </>
              ) : (
                <>
                  <Check size={14} /> Confirmar · {formatCurrency(total)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
