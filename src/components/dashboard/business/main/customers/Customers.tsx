'use client';

import { useEffect, useState } from 'react';
import { Users, Search } from 'lucide-react';
import { useCustomers } from '@/hooks/admin/useCustomers';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { Toaster, useToast } from '@/components/ui/Toast';
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
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader 
        title="Clientes y Deudas" 
        subtitle="Gestiona las deudas pendientes y abonos de tus clientes recurrentes." 
        action={
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
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
