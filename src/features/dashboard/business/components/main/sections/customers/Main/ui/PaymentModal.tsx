'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Wallet, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Customer } from '@/features/dashboard/business/api/customers.api';
import { formatCurrency } from '@/lib/formatters';

interface PaymentModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onConfirmPayment: (data: { amount: number; paymentMethod: 'cash' | 'transfer'; note?: string }) => Promise<any>;
  isSaving: boolean;
}

export default function PaymentModal({
  isOpen,
  customer,
  onClose,
  onConfirmPayment,
  isSaving,
}: PaymentModalProps) {
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastReceipt, setLastReceipt] = useState<{
    customerName: string;
    phone: string;
    paidAmount: number;
    newBalance: number;
    date: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (customer) {
      setAmount(String(customer.totalDebt));
      setPaymentMethod('cash');
      setNote('');
      setError(null);
      setLastReceipt(null);
    }
  }, [customer, isOpen]);

  if (!isOpen || !customer || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return setError('Ingresa un monto válido mayor a 0');
    }
    if (numAmount > customer.totalDebt) {
      return setError(`El monto no puede superar la deuda actual (${formatCurrency(customer.totalDebt)})`);
    }

    const res = await onConfirmPayment({
      amount: numAmount,
      paymentMethod,
      note: note.trim() || undefined,
    });

    if (res.success) {
      const newBalance = Math.max(0, customer.totalDebt - numAmount);
      setLastReceipt({
        customerName: customer.name,
        phone: customer.phone,
        paidAmount: numAmount,
        newBalance,
        date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      });
    } else {
      setError(res.error || 'Error al registrar el abono');
    }
  };

  const handleSendWhatsAppReceipt = () => {
    if (!lastReceipt) return;
    const cleanPhone = lastReceipt.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;
    const text = encodeURIComponent(
      `¡Hola ${lastReceipt.customerName}! Confirmamos tu abono de ${formatCurrency(
        lastReceipt.paidAmount
      )} recibido el ${lastReceipt.date}.\n\nTu nuevo saldo pendiente es: ${formatCurrency(
        lastReceipt.newBalance
      )}.\n\n¡Gracias por tu pago!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
    onClose();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Card */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="bg-background border border-primary/10 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-primary/5 bg-background-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary tracking-tight">Registrar Abono</h3>
                <p className="text-xs font-medium text-primary/55">{customer.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          {lastReceipt ? (
            /* Success State with WhatsApp Receipt Option */
            <div className="p-6 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary">¡Abono registrado con éxito!</h4>
                <p className="text-xs text-primary/60 mt-1">
                  Se acreditó {formatCurrency(lastReceipt.paidAmount)} a la cuenta de {lastReceipt.customerName}.
                </p>
                <p className="text-sm font-bold text-emerald-700 mt-2">
                  Nuevo saldo: {formatCurrency(lastReceipt.newBalance)}
                </p>
              </div>

              <div className="pt-3 border-t border-primary/5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleSendWhatsAppReceipt}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={16} /> Enviar Recibo por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-bold text-primary/60 hover:text-primary cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              {/* Debt Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Deuda Pendiente
                </span>
                <span className="text-base font-bold text-amber-900">
                  {formatCurrency(customer.totalDebt)}
                </span>
              </div>

              {/* Monto Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/65 block mb-1">
                  Monto a Abonar ($) *
                </label>
                <input
                  type="number"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-4 py-3 text-base text-primary font-mono font-bold outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setAmount(String(customer.totalDebt))}
                  className="text-[11px] font-bold text-primary/55 hover:text-primary underline mt-1"
                >
                  Pagar totalidad ({formatCurrency(customer.totalDebt)})
                </button>
              </div>

              {/* Método de Pago */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/65 block mb-1">
                  Método de Ingreso
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'bg-primary text-background border-primary shadow-xs'
                        : 'bg-foreground-muted/40 border-primary/8 text-primary/70'
                    }`}
                  >
                    Efectivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      paymentMethod === 'transfer'
                        ? 'bg-primary text-background border-primary shadow-xs'
                        : 'bg-foreground-muted/40 border-primary/8 text-primary/70'
                    }`}
                  >
                    Transferencia
                  </button>
                </div>
              </div>

              {/* Nota opcional */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/65 block mb-1">
                  Nota / Observación (Opcional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ej: Dejó el pago con el hermano"
                  className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary outline-none transition-all"
                />
              </div>

              {/* Submit Actions */}
              <div className="pt-4 border-t border-primary/5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-primary cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="py-2.5 px-5 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Confirmar Abono'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
