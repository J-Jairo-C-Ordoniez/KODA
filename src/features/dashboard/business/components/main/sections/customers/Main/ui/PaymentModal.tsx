'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageCircle, CheckCircle2, Banknote, Smartphone, Loader2 } from 'lucide-react';
import { Customer } from '@/features/dashboard/business/api/customers.api';
import { formatCurrency } from '@/lib/formatters';
import Button from '@/shared/components/Button';

interface PaymentModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onConfirmPayment: (data: { amount: number; paymentMethod: 'cash' | 'transfer'; note?: string }) => Promise<any>;
  isSaving: boolean;
}

export default function PaymentModal({ isOpen, customer, onClose, onConfirmPayment, isSaving }: PaymentModalProps) {
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
      <div
        onClick={onClose}
        className="fixed inset-0 z-999 bg-black/10 backdrop-blur-[1px] transition-opacity w-full h-full"
      />

      <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-background border border-primary/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <header className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
            <div>
              <h3 className="text-lg font-medium text-primary tracking-tight">
                Registrar Abono
              </h3>
              <p className="text-sm text-primary/40">
                {customer.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <X size={20} />
            </button>
          </header>

          {lastReceipt ? (
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
            <>
              <div className="px-5 py-4 text-center border-b border-primary/10 bg-amber-500/5">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-0.5">
                  Deuda Pendiente
                </span>
                <span className="text-3xl font-bold text-amber-700 tracking-tight">
                  {formatCurrency(customer.totalDebt)}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                    Monto a Abonar ($) *
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-sm text-primary font-bold outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setAmount(String(customer.totalDebt))}
                    className="text-xs text-primary/60 hover:text-primary underline mt-1 block cursor-pointer"
                  >
                    Pagar totalidad ({formatCurrency(customer.totalDebt)})
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                    Método de Ingreso *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
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
                      onClick={() => setPaymentMethod('transfer')}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${paymentMethod === 'transfer'
                        ? 'bg-primary text-background border-primary shadow-xs'
                        : 'bg-foreground-muted/30 border-primary/8 text-primary/70 hover:bg-foreground-muted/60'
                        }`}
                    >
                      <Smartphone size={20} />
                      Transferencia
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
                    Nota / Observación (Opcional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ej: Dejó el pago con el hermano..."
                    className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-xs text-primary font-medium outline-none transition-all"
                  />
                </div>
              </form>

              <div className="px-5 pb-5 flex items-center justify-between gap-3 border-t border-primary/5 pt-4">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isSaving || !amount || parseFloat(amount) <= 0}
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    `Confirmar · ${formatCurrency(parseFloat(amount) || 0)}`
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
