'use client';

import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Search, X, Gift } from 'lucide-react';
import { SectionHeader } from '@/shared/components/SectionHeader';
import Loader from '@/shared/components/Loader';
import Metric from '@/features/super-admin/components/Main/ui/Metric';
import Table from '@/features/super-admin/components/Main/ui/Table';
import { useSubscriptions } from '@/features/super-admin/hooks/useSubscriptions';
import { useToast, Toaster } from '@/shared/components/Toaster';

export default function Subscriptions() {
  const { subscriptions, stats, plans, isLoading, error, fetchSubscriptions, registerPayment, assignPlan } = useSubscriptions();
  const { toasts, showToast, removeToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal State
  const [selectedTenant, setSelectedTenant] = useState<{ id: string, name: string, subscriptionId?: string, price: number } | null>(null);
  const [paymentData, setPaymentData] = useState({
    method: 'transfer',
    manualEndDate: '',
    selectedPlanId: '',
    isFreeTrial: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredSubs = subscriptions.filter(t =>
    t.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subscription?.plan?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (tenantId: string, subscriptionId: string | null | undefined, price: number, businessName: string) => {
    setSelectedTenant({ id: tenantId, name: businessName, subscriptionId: subscriptionId || undefined, price });

    // Si no tiene suscripción, pre-seleccionamos el primer plan por defecto
    const defaultPlanId = !subscriptionId && plans.length > 0 ? plans[0].planId : '';

    setPaymentData({
      method: 'transfer',
      manualEndDate: '',
      selectedPlanId: defaultPlanId,
      isFreeTrial: false
    });
    setIsModalOpen(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant) return;
    setIsSubmitting(true);

    try {
      if (selectedTenant.subscriptionId) {
        // MODO: RENOVACIÓN (Ya tiene plan)
        const res = await registerPayment({
          subscriptionId: selectedTenant.subscriptionId,
          amount: selectedTenant.price,
          method: paymentData.method,
          manualEndDate: paymentData.manualEndDate || undefined
        });

        if (res.success) {
          showToast('success', 'Pago Registrado', 'La vigencia de la suscripción se ha extendido exitosamente.');
          setIsModalOpen(false);
        } else {
          showToast('error', 'Error al registrar', res.error || 'Ocurrió un error inesperado');
        }
      } else {
        // MODO: ASIGNACIÓN INICIAL (No tiene plan)
        const selectedPlan = plans.find(p => p.planId === paymentData.selectedPlanId);
        if (!selectedPlan) {
          showToast('warning', 'Plan requerido', 'Debes seleccionar un plan para iniciar la suscripción.');
          setIsSubmitting(false);
          return;
        }

        const res = await assignPlan({
          tenantId: selectedTenant.id,
          planId: paymentData.selectedPlanId,
          amount: Number(selectedPlan.price),
          method: paymentData.method,
          manualEndDate: paymentData.manualEndDate || undefined,
          isFreeTrial: paymentData.isFreeTrial
        });

        if (res.success) {
          showToast('success', 'Plan Asignado', 'El negocio ahora tiene una suscripción activa.');
          setIsModalOpen(false);
        } else {
          showToast('error', 'Error al asignar', res.error || 'Ocurrió un error inesperado');
        }
      }
    } catch (err: any) {
      showToast('error', 'Error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dinámicamente calcular el precio a mostrar en el Modal
  const displayPrice = () => {
    if (paymentData.isFreeTrial) return 0;
    if (selectedTenant?.subscriptionId) return selectedTenant.price; // Renovación
    // Asignación Inicial
    const plan = plans.find(p => p.planId === paymentData.selectedPlanId);
    return plan ? Number(plan.price) : 0;
  };

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      <SectionHeader title="Suscripciones y Facturación" />

      {isLoading && <Loader />}
      {error && (
        <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl border border-red-100 w-fit">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Metric
              stat={{
                label: 'MRR (Mensual)',
                value: `$${stats.mrr.toLocaleString('en-US')}`,
                icon: DollarSign,
                color: 'bg-contrast/10 text-contrast'
              }}
            />
            <Metric
              stat={{
                label: 'Suscripciones Activas',
                value: `${stats.activeCount}`.padStart(2, '0'),
                icon: CheckCircle,
                color: 'bg-[#00C896]/10 text-[#00C896]'
              }}
            />
            <Metric
              stat={{
                label: 'En Mora / Vencidas',
                value: `${stats.pastDueCount}`.padStart(2, '0'),
                icon: AlertCircle,
                color: 'bg-red-500/10 text-red-500'
              }}
            />
          </div>

          <div className="bg-background-elevated border border-foreground/8 p-6 lg:p-8 rounded-[32px]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-black text-primary tracking-tight">Cobros y Vigencias</h3>
                <p className="text-foreground-muted text-sm font-medium mt-1">Administra los pagos y planes de los negocios.</p>
              </div>

              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-contrast transition-colors" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar negocio o plan..."
                  className="w-full pl-12 pr-4 py-3.5 bg-background border border-foreground/10 rounded-2xl focus:ring-2 focus:ring-contrast/20 focus:border-contrast outline-none transition-all font-medium placeholder:text-secondary/80 text-sm"
                />
              </div>
            </header>

            <Table
              columns={[
                { accessorKey: 'businessName', header: 'Negocio' },
                { accessorKey: 'plan', header: 'Plan' },
                { accessorKey: 'endDate', header: 'Vence' },
                { accessorKey: 'status', header: 'Estado' },
                { accessorKey: 'actions', header: 'Acciones' },
              ]}
              data={filteredSubs.map(t => ({
                tenantId: t.tenantId,
                subscriptionId: t.subscription?.subscriptionId,
                businessName: t.businessName || 'Desconocido',
                plan: t.subscription?.plan || null,
                subscription: t.subscription,
                endDate: t.subscription?.endDate || null,
                status: t.subscription?.status || t.status || 'noVerify',
              }))}
              isSearching={false}
              onPaymentClick={(row) => {
                handleOpenModal(
                  row.tenantId,
                  row.subscriptionId,
                  Number(row.plan?.price || 0),
                  row.businessName
                );
              }}
            />
          </div>
        </section>
      )}

      {isModalOpen && selectedTenant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background-elevated border border-foreground/10 rounded-[32px] p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-secondary hover:text-primary transition-colors bg-foreground/5 rounded-full hover:bg-foreground/10"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-primary mb-2">
              {selectedTenant.subscriptionId ? "Registrar Pago" : "Asignar Plan"}
            </h2>
            <p className="text-sm text-foreground-muted mb-6">
              {selectedTenant.subscriptionId
                ? `Confirma el pago de ${selectedTenant.name} para renovar.`
                : `Inicia la suscripción de ${selectedTenant.name}.`}
            </p>

            <form onSubmit={handlePaymentSubmit} className="space-y-5">

              {!selectedTenant.subscriptionId && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Seleccionar Plan</label>
                    <select
                      value={paymentData.selectedPlanId}
                      onChange={e => setPaymentData({ ...paymentData, selectedPlanId: e.target.value })}
                      className="w-full px-4 py-3.5 bg-background border border-foreground/10 rounded-2xl text-primary font-bold focus:border-contrast outline-none"
                    >
                      {plans.map(p => (
                        <option key={p.planId} value={p.planId}>{p.name} - ${Number(p.price)}/{p.interval}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-3 p-4 border border-foreground/10 rounded-2xl cursor-pointer hover:bg-foreground/2 transition-colors">
                    <input
                      type="checkbox"
                      checked={paymentData.isFreeTrial}
                      onChange={e => setPaymentData({ ...paymentData, isFreeTrial: e.target.checked })}
                      className="w-5 h-5 rounded accent-contrast"
                    />
                    <div>
                      <span className="font-bold text-primary flex items-center gap-2"><Gift size={16} className="text-contrast" /> Prueba Gratuita</span>
                      <p className="text-xs text-foreground-muted">El pago inicial será de $0</p>
                    </div>
                  </label>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Monto a registrar</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input
                    type="text"
                    disabled
                    value={displayPrice()}
                    className="w-full pl-12 pr-4 py-3.5 bg-foreground/5 border border-transparent rounded-2xl text-primary font-bold opacity-70 cursor-not-allowed"
                  />
                </div>
              </div>

              {!paymentData.isFreeTrial && (
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Método de Pago</label>
                  <select
                    value={paymentData.method}
                    onChange={e => setPaymentData({ ...paymentData, method: e.target.value })}
                    className="w-full px-4 py-3.5 bg-background border border-foreground/10 rounded-2xl text-primary font-bold focus:border-contrast outline-none"
                  >
                    <option value="transfer">Transferencia Bancaria</option>
                    <option value="cash">Efectivo</option>
                    <option value="online">Pasarela Online</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Vigencia Manual (Opcional)</label>
                <input
                  type="date"
                  value={paymentData.manualEndDate}
                  onChange={e => setPaymentData({ ...paymentData, manualEndDate: e.target.value })}
                  className="w-full px-4 py-3.5 bg-background border border-foreground/10 rounded-2xl text-secondary focus:text-primary font-bold focus:border-contrast outline-none"
                />
                <p className="text-xs text-secondary/60 mt-2">Si lo dejas vacío, se sumará el tiempo del plan automáticamente.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-contrast text-white font-bold rounded-2xl hover:bg-contrast-hover transition-colors shadow-lg shadow-contrast/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Procesando..." : <><CreditCard size={18} /> {selectedTenant.subscriptionId ? 'Confirmar Pago' : 'Asignar e Iniciar'}</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
