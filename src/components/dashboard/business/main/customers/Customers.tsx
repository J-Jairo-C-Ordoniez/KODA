'use client';

import { useEffect, useState } from 'react';
import { Users, Plus, CreditCard, Clock, Search, ChevronRight, Phone, Wallet, X, Check } from 'lucide-react';
import { useCustomers } from '@/hooks/admin/useCustomers';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { Toaster, useToast } from '@/components/ui/Toast';

export default function Customers() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { customers, isLoading, isSaving, error, fetchCustomers, registerPayment } = useCustomers(tenantId);
  const { toasts, showToast, removeToast } = useToast();

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [viewHistoryCustomer, setViewHistoryCustomer] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      showToast('error', 'Monto inválido', 'Por favor ingresa un valor mayor a cero.');
      return;
    }

    const result = await registerPayment(selectedCustomer.customerId, {
      amount,
      paymentMethod: 'cash',
      note: paymentNote,
    });

    if (result.success) {
      showToast('success', 'Abono registrado', `Se descontaron $${amount.toLocaleString()} de la deuda.`);
      setSelectedCustomer(null);
      setPaymentAmount('');
      setPaymentNote('');
      fetchCustomers();
    } else {
      showToast('error', 'Error al registrar', result.error || 'No se pudo procesar el pago.');
    }
  };

  const filteredCustomers = customers.filter((c: any) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(search) || c.phone.includes(search);
    return matchesSearch && Number(c.totalDebt) > 0;
  });

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader 
        title="Clientes y Fiados" 
        subtitle="Gestiona las deudas pendientes y abonos de tus clientes habituales." 
        action={
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Nombre o teléfono..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[280px]"
              />
            </div>
          </div>
        }
      />

      {isLoading ? <Loader size="lg" className="h-[40vh]" /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredCustomers.length === 0 ? (
        <EmptyState 
          icon={Users} 
          title={searchTerm ? "Sin coincidencias" : "Sin fiados pendientes"} 
          description={searchTerm ? "No encontramos clientes con deuda que coincidan con tu búsqueda." : "Ningún cliente tiene deudas activas en este momento."} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCustomers.map((customer: any) => (
            <article 
              key={customer.customerId} 
              onClick={() => setViewHistoryCustomer(customer)}
              className="bg-background border border-foreground/5 rounded-[28px] p-5 space-y-4 hover:shadow-xl hover:shadow-navy/5 hover:border-navy/10 transition-all group relative overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.03] rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
                  <Users size={18} className="text-navy group-hover:text-white" />
                </div>
                <div className="text-right">
                  <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-red-400 mb-0.5">Deuda Pendiente</span>
                  <span className="text-sm font-black text-red-600">
                    ${Number(customer.totalDebt).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="space-y-0.5 relative z-10">
                <h3 className="text-sm font-black text-primary group-hover:text-navy transition-colors truncate uppercase tracking-tight">{customer.name}</h3>
                <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold">
                  <Phone size={12} className="text-navy/40" />
                  {customer.phone}
                </div>
              </div>

              <div className="pt-4 border-t border-foreground/5 flex flex-col gap-3 relative z-10">
                <div className="flex items-center justify-between text-[9px] text-secondary font-black uppercase tracking-widest opacity-60">
                  <span className="flex items-center gap-1"><Clock size={10} /> {new Date(customer.updatedAt).toLocaleDateString('es-CO')}</span>
                  <span>Ver historial</span>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); }}
                  className="w-full py-3 rounded-xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10"
                >
                  <CreditCard size={14} />
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
          <div className="bg-background rounded-[40px] w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-foreground/5 bg-foreground/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <Wallet size={24} className="text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary">Registrar Abono</h3>
                  <p className="text-secondary text-xs font-medium truncate max-w-[200px]">Cliente: {selectedCustomer.name}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="p-6 rounded-3xl bg-red-50/50 border border-red-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">Deuda actual</p>
                  <p className="text-2xl font-black text-red-600">${Number(selectedCustomer.totalDebt).toLocaleString('es-CO')}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                   <CreditCard size={24} />
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Monto a abonar (COP)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-navy">$</span>
                    <input
                      autoFocus
                      type="number"
                      required
                      min="1"
                      max={selectedCustomer.totalDebt}
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full pl-12 pr-6 py-5 rounded-[24px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-black text-2xl text-primary bg-foreground/[0.02]"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nota o Referencia</label>
                  <textarea
                    rows={2}
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary bg-foreground/[0.02] resize-none"
                    placeholder="Ej. Transferencia Bancolombia..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCustomer(null)}
                    className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !paymentAmount}
                    className="flex-[2] py-4 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                  >
                    {isSaving ? 'Procesando...' : <><Check size={16} /> Confirmar Abono</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de historial */}
      {viewHistoryCustomer && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] w-full max-w-lg shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300 flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-foreground/5 bg-foreground/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <Clock size={24} className="text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary">Historial de Abonos</h3>
                  <p className="text-secondary text-xs font-medium truncate max-w-[200px]">{viewHistoryCustomer.name}</p>
                </div>
              </div>
              <button onClick={() => setViewHistoryCustomer(null)} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {(!viewHistoryCustomer.payments || viewHistoryCustomer.payments.length === 0) ? (
                <div className="py-12 text-center space-y-4">
                  <p className="text-secondary font-medium italic opacity-50">No hay abonos registrados para este cliente.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {viewHistoryCustomer.payments.map((p: any) => (
                    <div key={p.paymentId} className="flex items-start gap-4 p-5 rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:bg-white transition-all group">
                       <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                          <Plus size={18} />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <p className="text-sm font-black text-primary tracking-tight">Abono Recibido</p>
                             <p className="text-sm font-black text-green-600">+${Number(p.amount).toLocaleString()}</p>
                          </div>
                          <p className="text-[10px] font-bold text-secondary flex items-center gap-1 uppercase tracking-widest">
                             <Clock size={10} /> {new Date(p.createdAt).toLocaleDateString('es-CO')} • {new Date(p.createdAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {p.note && (
                            <div className="mt-3 p-3 rounded-xl bg-background border border-foreground/5 text-[10px] font-medium text-secondary leading-relaxed">
                              {p.note}
                            </div>
                          )}
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 border-t border-foreground/5 bg-foreground/[0.01]">
               <button 
                onClick={() => { setSelectedCustomer(viewHistoryCustomer); setViewHistoryCustomer(null); }}
                className="w-full py-4 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2"
               >
                 <CreditCard size={16} /> Nuevo Abono
               </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
