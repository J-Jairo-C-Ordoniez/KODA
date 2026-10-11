'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircleIcon,
  DeviceMobileIcon,
  MoneyIcon,
  SidebarSimpleIcon,
  SpinnerGapIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react';
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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!customer) return;
    setAmount(String(customer.totalDebt));
    setPaymentMethod('cash');
    setNote('');
    setError(null);
    setLastReceipt(null);
  }, [customer, isOpen]);

  if (!isOpen || !customer || !mounted) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const paidAmount = Number.parseFloat(amount);
    if (Number.isNaN(paidAmount) || paidAmount <= 0) {
      setError('Ingresa un monto válido mayor a 0.');
      return;
    }
    if (paidAmount > customer.totalDebt) {
      setError(`El monto no puede superar la deuda actual (${formatCurrency(customer.totalDebt)}).`);
      return;
    }

    const result = await onConfirmPayment({
      amount: paidAmount,
      paymentMethod,
      note: note.trim() || undefined,
    });

    if (!result.success) {
      setError(result.error || 'Error al registrar el abono.');
      return;
    }

    setLastReceipt({
      customerName: customer.name,
      phone: customer.phone,
      paidAmount,
      newBalance: Math.max(0, customer.totalDebt - paidAmount),
      date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
    });
  };

  const handleSendWhatsAppReceipt = () => {
    if (!lastReceipt) return;
    const phone = lastReceipt.phone.replace(/\D/g, '');
    const phoneWithCountry = phone.startsWith('57') ? phone : `57${phone}`;
    const text = encodeURIComponent(
      `¡Hola ${lastReceipt.customerName}! Confirmamos tu abono de ${formatCurrency(lastReceipt.paidAmount)} recibido el ${lastReceipt.date}.\n\nTu nuevo saldo pendiente es: ${formatCurrency(lastReceipt.newBalance)}.\n\n¡Gracias por tu pago!`,
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
    onClose();
  };

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-30 h-full w-full bg-black/10 backdrop-blur-[1px] transition-opacity" />

      <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" aria-label="Registrar abono" className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-primary/10 bg-background/95 shadow-2xl backdrop-blur-sm md:rounded-4xl">
          <header className="flex items-center justify-between border-b border-primary/10 px-4 py-4 sm:px-6">
            <div>
              <h3 className="text-base font-medium leading-relaxed text-foreground/75 sm:text-md">Registrar abono</h3>
              <p className="text-sm font-medium leading-relaxed text-foreground/50">{customer.name}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-transparent p-2 text-primary transition-all duration-200 hover:border-primary/10 hover:bg-primary/5 hover:shadow-sm active:scale-95 cursor-pointer"
              aria-label="Cerrar registro de abono"
            >
              <SidebarSimpleIcon size={20} weight="regular" />
            </button>
          </header>

          {lastReceipt ? (
            <div className="space-y-5 px-4 py-8 text-center sm:px-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
                <CheckCircleIcon size={32} weight="fill" />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-primary">Abono registrado</h4>
                <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/60">
                  Se acreditó {formatCurrency(lastReceipt.paidAmount)} a la cuenta de {lastReceipt.customerName}.
                </p>
                <p className="mt-3 text-lg font-bold leading-tight text-emerald-700">
                  Nuevo saldo: {formatCurrency(lastReceipt.newBalance)}
                </p>
              </div>
              <div className="flex flex-col gap-3 border-t border-primary/10 pt-5">
                <button
                  type="button"
                  onClick={handleSendWhatsAppReceipt}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium leading-relaxed text-white transition-all hover:bg-emerald-700 active:scale-[.98] cursor-pointer"
                >
                  <WhatsappLogoIcon size={18} weight="fill" />
                  Enviar recibo por WhatsApp
                </button>
                <Button type="button" variant="secondary" onClick={onClose}>Cerrar</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="border-b border-primary/10 px-4 py-4 text-center sm:px-6">
                <span className="mb-0.5 block text-sm font-medium leading-relaxed text-foreground/50">Deuda pendiente</span>
                <span className="text-2xl font-bold leading-relaxed text-primary sm:text-3xl">{formatCurrency(customer.totalDebt)}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
                {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-600">{error}</div>}

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium leading-relaxed text-foreground/75">Monto a abonar *</label>
                    <button type="button" onClick={() => setAmount(String(customer.totalDebt))} className="text-sm font-medium leading-relaxed text-primary/60 underline transition-colors hover:text-primary cursor-pointer">
                      Pagar totalidad
                    </button>
                  </div>
                  <input
                    type="number"
                    step="100"
                    min="0"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="0"
                    className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium leading-relaxed text-foreground/75">Método de ingreso *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setPaymentMethod('cash')} className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-sm font-medium leading-relaxed transition-all cursor-pointer ${paymentMethod === 'cash' ? 'border-primary bg-primary text-background shadow-sm' : 'border-primary/10 bg-background text-foreground/75 hover:bg-primary/2'}`}>
                      <MoneyIcon size={20} weight="bold" />
                      Efectivo
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('transfer')} className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-sm font-medium leading-relaxed transition-all cursor-pointer ${paymentMethod === 'transfer' ? 'border-primary bg-primary text-background shadow-sm' : 'border-primary/10 bg-background text-foreground/75 hover:bg-primary/2'}`}>
                      <DeviceMobileIcon size={20} weight="bold" />
                      Transferencia
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium leading-relaxed text-foreground/75">Nota (opcional)</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Ej: Dejó el pago con el hermano..."
                    className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                  />
                </div>
              </form>

              <div className="flex items-center justify-between gap-3 border-t border-primary/10 px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
                <Button variant="secondary" onClick={onClose} disabled={isSaving}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isSaving || !amount || Number.parseFloat(amount) <= 0}>
                  {isSaving ? <SpinnerGapIcon size={14} className="animate-spin" /> : `Confirmar · ${formatCurrency(Number.parseFloat(amount) || 0)}`}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
