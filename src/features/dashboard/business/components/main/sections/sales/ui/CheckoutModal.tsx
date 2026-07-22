'use client';

import { useState, useEffect } from 'react';
import { X, Check, CreditCard, Banknote, Smartphone, AlertCircle, User, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { CustomerSummary } from '@/features/dashboard/business/api/sales.api';

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  customers: CustomerSummary[];
  isProcessing: boolean;
  onClose: () => void;
  onConfirmCheckout: (data: {
    paymentMethod: 'cash' | 'transfer' | 'card' | 'debt';
    customerId?: string | null;
    notes?: string;
  }) => Promise<any>;
}

export default function CheckoutModal({
  isOpen,
  total,
  customers,
  isProcessing,
  onClose,
  onConfirmCheckout,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'card' | 'debt'>('cash');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('cash');
      setIsAnonymous(true);
      setSelectedCustomerId('');
      setNotes('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // If debt payment method selected, customer selection is required
    if (paymentMethod === 'debt' && (isAnonymous || !selectedCustomerId)) {
      setError('Para ventas a crédito (Fiado) debes seleccionar un cliente obligatoriamente.');
      return;
    }

    const res = await onConfirmCheckout({
      paymentMethod,
      customerId: !isAnonymous && selectedCustomerId ? selectedCustomerId : null,
      notes: notes.trim() || undefined,
    });

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Error al procesar el cobro');
    }
  };

  return (
    <>
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[140] bg-black/15 backdrop-blur-[2px] transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-background border border-primary/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-primary/5 bg-background-card">
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Procesar Cobro</h3>
              <p className="text-xs font-semibold text-primary/40 uppercase tracking-wider mt-0.5">
                Punto de Venta POS
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Amount Banner */}
          <div className="bg-primary/3 p-5 text-center border-b border-primary/5">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/50 block mb-1">
              Total a pagar
            </span>
            <span className="text-3xl font-bold text-primary tracking-tight">
              {formatCurrency(total)}
            </span>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
            {error && (
              <div className="p-3.5 bg-accent-red/5 border border-accent-red/20 text-accent-red text-xs rounded-xl font-medium flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Método de Pago */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                Método de Pago *
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'bg-primary text-background border-primary shadow-xs'
                      : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                  }`}
                >
                  <Banknote size={16} /> Efectivo
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'transfer'
                      ? 'bg-primary text-background border-primary shadow-xs'
                      : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                  }`}
                >
                  <Smartphone size={16} /> Transf. / Nequi
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-primary text-background border-primary shadow-xs'
                      : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                  }`}
                >
                  <CreditCard size={16} /> Tarjeta
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('debt');
                    setIsAnonymous(false);
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    paymentMethod === 'debt'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <User size={16} /> Fiado / Crédito
                </button>
              </div>
            </div>

            {/* Selección de Cliente */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                  Cliente
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (paymentMethod === 'debt') return; // Cannot be anonymous for debt
                      setIsAnonymous(true);
                      setSelectedCustomerId('');
                    }}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      isAnonymous
                        ? 'bg-foreground-muted/60 text-primary border-primary/20'
                        : 'text-primary/40 border-transparent hover:text-primary'
                    }`}
                  >
                    Venta Rápida (Anónimo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(false)}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      !isAnonymous
                        ? 'bg-foreground-muted/60 text-primary border-primary/20'
                        : 'text-primary/40 border-transparent hover:text-primary'
                    }`}
                  >
                    Seleccionar Cliente
                  </button>
                </div>
              </div>

              {!isAnonymous && (
                <select
                  value={selectedCustomerId}
                  onChange={e => setSelectedCustomerId(e.target.value)}
                  className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl p-3 text-xs font-semibold text-primary outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    -- Selecciona un cliente --
                  </option>
                  {customers.map(c => (
                    <option key={c.customerId} value={c.customerId}>
                      {c.name} {c.totalDebt > 0 ? `(Deuda: ${formatCurrency(c.totalDebt)})` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Notas opcionales */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                Notas de la venta (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Ej: Descuento aplicado por cliente frecuente..."
                className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
              />
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-primary/5 bg-background-card flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="py-2.5 px-4 bg-transparent hover:bg-foreground-muted/40 text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 active:scale-95"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Procesando...
                </>
              ) : (
                <>
                  <Check size={16} /> Confirmar Cobro · {formatCurrency(total)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
