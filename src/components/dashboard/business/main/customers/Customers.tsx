'use client';

import { useEffect, useState } from 'react';
import { Users, Plus, CreditCard, Clock, Search, ChevronRight, Phone, Wallet } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
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
      fetchCustomers();
    } else {
      setFeedback({ type: 'error', msg: result.error || 'Error al registrar el abono' });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredCustomers = customers.filter((c: any) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) && Number(c.totalDebt) > 0
  );

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20">
      <SectionHeader 
        title="Clientes y Fiados" 
        subtitle="Gestiona las deudas pendientes y abonos de tus clientes habituales." 
        action={
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[280px]"
              />
            </div>
          </div>
        }
      />

      {feedback && (
        <div className={`px-6 py-4 rounded-3xl text-sm font-bold border animate-in fade-in slide-in-from-top-4 duration-300 ${
          feedback.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
        }`}>
          {feedback.msg}
        </div>
      )}

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredCustomers.length === 0 ? (
        <EmptyState icon={Users} title={searchTerm ? "Sin coincidencias" : "Sin fiados pendientes"} description={searchTerm ? "No encontramos clientes con deuda que coincidan con tu búsqueda." : "Ningún cliente tiene deudas activas en este momento."} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCustomers.map((customer: any) => (
            <article key={customer.customerId} className="bg-background border border-foreground/5 rounded-[32px] p-8 space-y-6 hover:shadow-2xl hover:shadow-navy/10 hover:border-navy/10 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
                  <Users size={24} className="text-navy group-hover:text-white" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Deuda Total</span>
                  <span className="text-lg font-black text-red-600">
                    ${Number(customer.totalDebt).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="space-y-1 relative z-10">
                <h3 className="text-xl font-black text-primary group-hover:text-navy transition-colors">{customer.name}</h3>
                <div className="flex items-center gap-2 text-secondary text-sm font-medium">
                  <Phone size={14} className="text-navy/40" />
                  {customer.phone}
                </div>
              </div>

              <div className="pt-6 border-t border-foreground/5 space-y-4 relative z-10">
                <div className="flex items-center justify-between text-xs text-secondary font-bold">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> Última actividad</span>
                  <span className="text-primary">{new Date(customer.updatedAt).toLocaleDateString('es-CO')}</span>
                </div>

                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full py-4 rounded-2xl bg-navy text-white font-black text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-navy/20"
                >
                  <CreditCard size={18} />
                  Registrar Abono
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal de abono */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden">
            <div className="p-8 border-b border-foreground/5 bg-foreground/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <Wallet size={24} className="text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary">Registrar Abono</h3>
                  <p className="text-secondary text-xs font-medium">Gestiona el pago parcial o total.</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="p-6 rounded-3xl bg-red-50/50 border border-red-100 flex items-center justify-between">
                <p className="text-sm font-bold text-red-700">Deuda actual de {selectedCustomer.name}</p>
                <p className="text-lg font-black text-red-600">${Number(selectedCustomer.totalDebt).toLocaleString('es-CO')}</p>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Monto del Abono (COP)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={selectedCustomer.totalDebt}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-black text-xl text-primary bg-foreground/[0.02]"
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nota u Observación</label>
                  <textarea
                    rows={3}
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary bg-foreground/[0.02] resize-none"
                    placeholder="Ej. Pago parcial de cuota..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCustomer(null)}
                    className="flex-1 py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2"
                  >
                    {isSaving ? 'Guardando...' : <><Check size={18} /> Confirmar</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
