'use client';

import { useEffect, useState } from 'react';
import { Users, Search, X } from 'lucide-react';
import { useCustomers } from '@/features/business/customers/hooks/useCustomers';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { EmptyState } from '@/features/business/dashboard/components/business-ui/EmptyState';
import Loader from '@/shared/components/Loader';
import { useSession } from 'next-auth/react';
import { Toaster, useToast } from '@/shared/components/Toast';
import { CustomerCard } from './ui/CustomerCard';
import { CustomerPaymentModal, CustomerHistoryModal } from './ui/CustomerModals';

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
      showToast('success', 'Abono registrado', `$${amount.toLocaleString()} han sido descontados de la deuda.`);
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
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Clientes y Deudas"
        subtitle="Gestiona las deudas pendientes y abonos de tus clientes recurrentes."
        action={
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200" size={18} />
              <input
                type="text"
                placeholder="Buscar por nombre o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3.5 rounded-2xl bg-background-elevated border border-foreground/8 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm w-full sm:min-w-[320px] text-primary"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-foreground/5 text-foreground-muted transition-all"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        }
      />

      {isLoading ? <Loader size="lg" className="h-[40vh]" /> : error ? (
        <p role="alert" className="text-red-400 text-sm font-medium bg-red-500/8 p-4 rounded-2xl border border-red-500/15">{error}</p>
      ) : filteredCustomers.length === 0 ? (
        <EmptyState
          icon={Users}
          title={searchTerm ? "Sin coincidencias" : "Sin deudas pendientes"}
          description={searchTerm ? "No pudimos encontrar clientes con deudas que coincidan con tu búsqueda." : "Ningún cliente tiene deudas activas en este momento."}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCustomers.map((customer: any) => (
            <CustomerCard
              key={customer.customerId}
              customer={customer}
              onViewHistory={setViewHistoryCustomer}
              onRegisterPayment={setSelectedCustomer}
            />
          ))}
        </div>
      )}

      <CustomerPaymentModal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
        onSubmit={handlePayment}
        isSaving={isSaving}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        paymentNote={paymentNote}
        setPaymentNote={setPaymentNote}
      />

      <CustomerHistoryModal
        isOpen={!!viewHistoryCustomer}
        onClose={() => setViewHistoryCustomer(null)}
        customer={viewHistoryCustomer}
        onRegisterPayment={() => {
          setSelectedCustomer(viewHistoryCustomer);
          setViewHistoryCustomer(null);
        }}
      />
    </main>
  );
}
