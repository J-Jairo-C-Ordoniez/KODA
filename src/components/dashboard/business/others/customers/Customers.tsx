'use client';

import { useEffect, useState } from 'react';
import { Users, Plus, CreditCard, Clock } from 'lucide-react';
import { useCustomers } from '@/hooks/admin/useCustomers';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';

export default function Customers() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { customers, isLoading, isSaving, error, fetchCustomers, registerPayment } = useCustomers(tenantId);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    const result = await registerPayment(selectedCustomer.customerId, {
      amount: parseFloat(paymentAmount),
      paymentMethod: 'cash',
      note: paymentNote,
    });
    if (result.success) {
      setFeedback({ type: 'success', msg: 'Abono registrado correctamente' });
      setSelectedCustomer(null);
      setPaymentAmount('');
      setPaymentNote('');
    } else {
      setFeedback({ type: 'error', msg: result.error || 'Error al registrar el abono' });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const debtCustomers = customers.filter((c: any) => Number(c.totalDebt) > 0);

  return (
    <div className="space-y-8">
      <SectionHeader title="Clientes y Fiados" subtitle="Gestiona las deudas pendientes de tus clientes." />

      {feedback && (
        <div className={`px-4 py-3 rounded-2xl text-sm font-semibold border ${
          feedback.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
        }`}>
          {feedback.msg}
        </div>
      )}

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : debtCustomers.length === 0 ? (
        <EmptyState icon={Users} title="Sin fiados pendientes" description="Ningún cliente tiene deudas activas en este momento." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {debtCustomers.map((customer: any) => (
            <article key={customer.customerId} className="bg-background border border-foreground/5 rounded-3xl p-6 space-y-4 hover:shadow-lg hover:shadow-navy/5 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-navy/10 flex items-center justify-center">
                    <Users size={18} className="text-navy" />
                  </div>
                  <div>
                    <p className="font-black text-primary text-sm">{customer.name}</p>
                    <p className="text-secondary text-xs font-medium">{customer.phone}</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full">
                  ${Number(customer.totalDebt).toLocaleString('es-CO')}
                </span>
              </div>

              <div className="text-xs text-secondary font-medium flex items-center gap-1.5">
                <Clock size={12} />
                Última actividad: {new Date(customer.updatedAt).toLocaleDateString('es-CO')}
              </div>

              <button
                onClick={() => setSelectedCustomer(customer)}
                className="w-full py-3 rounded-2xl bg-navy/5 text-navy font-bold text-sm hover:bg-navy hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <CreditCard size={16} />
                Registrar Abono
              </button>
            </article>
          ))}
        </div>
      )}

      {/* Modal de abono */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/20 space-y-6">
            <div>
              <h3 className="text-xl font-black text-primary">Registrar Abono</h3>
              <p className="text-secondary text-sm font-medium mt-1">
                Cliente: <span className="text-primary font-bold">{selectedCustomer.name}</span> — Deuda: <span className="text-red-600 font-bold">${Number(selectedCustomer.totalDebt).toLocaleString('es-CO')}</span>
              </p>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-secondary mb-2 block">Monto del Abono (COP)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedCustomer.totalDebt}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all font-medium"
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-secondary mb-2 block">Nota (opcional)</label>
                <input
                  type="text"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all font-medium"
                  placeholder="Pago parcial de marzo..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="flex-1 py-3 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all"
                >
                  {isSaving ? 'Guardando...' : 'Confirmar Abono'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
