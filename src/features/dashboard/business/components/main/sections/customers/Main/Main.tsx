'use client';

import { useEffect, useState } from 'react';
import { Search, X, UserPlus, Users } from 'lucide-react';
import { Customer, CustomerHistoryData } from '@/features/dashboard/business/api/customers.api';
import type { ToastType } from '@/shared/components/Toast';
import { CustomerFilterType } from '@/features/dashboard/business/hooks/useCustomers';

import CustomerCard from './ui/CustomerCard';
import CustomerForm from './ui/CustomerForm';
import PaymentModal from './ui/PaymentModal';
import CustomerHistoryDrawer from './ui/CustomerHistoryDrawer';
import Loader from '@/shared/components/Loader';

type ToastHandler = (type: ToastType, message: string, description?: string) => void;
type ActiveView = 'grid' | 'create-customer' | 'edit-customer';

interface CustomersMainProps {
  showToast: ToastHandler;
  onNewCustomerRef?: React.MutableRefObject<(() => void) | null>;
  // All data & actions lifted from parent
  filteredCustomers: Customer[];
  customers: Customer[];
  isLoading: boolean;
  isSaving: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: CustomerFilterType;
  setFilterType: (f: CustomerFilterType) => void;
  totalWithDebt: number;
  totalPaid: number;
  saveCustomer: (data: any, customerId?: string) => Promise<any>;
  registerPayment: (customerId: string, data: any) => Promise<any>;
  deleteCustomer: (customerId: string) => Promise<any>;
  getCustomerHistory: (customerId: string) => Promise<CustomerHistoryData | null>;
}

export default function CustomersMain({
  showToast,
  onNewCustomerRef,
  filteredCustomers,
  customers,
  isLoading,
  isSaving,
  searchQuery,
  setSearchQuery,
  filterType,
  saveCustomer,
  registerPayment,
  deleteCustomer,
  getCustomerHistory,
}: CustomersMainProps) {
  const [activeView, setActiveView] = useState<ActiveView>('grid');
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedPaymentCustomer, setSelectedPaymentCustomer] = useState<Customer | null>(null);
  const [selectedHistoryCustomer, setSelectedHistoryCustomer] = useState<Customer | null>(null);

  // Register the "new customer" callback so the sidebar can trigger it
  useEffect(() => {
    if (onNewCustomerRef) {
      onNewCustomerRef.current = () => {
        setEditingCustomer(null);
        setActiveView('create-customer');
      };
    }
  }, [onNewCustomerRef]);

  const handleSaveCustomer = async (formData: any, customerId?: string) => {
    const res = await saveCustomer(formData, customerId);
    if (res.success) {
      showToast(
        'success',
        customerId ? 'Cliente actualizado' : 'Cliente registrado',
        'Los datos del cliente se guardaron correctamente.'
      );
      setActiveView('grid');
      setEditingCustomer(null);
    } else {
      showToast('error', 'Error al guardar cliente', res.error);
    }
    return res;
  };

  const handleConfirmPayment = async (data: any) => {
    if (!selectedPaymentCustomer) return { success: false, error: 'No hay cliente seleccionado' };
    const res = await registerPayment(selectedPaymentCustomer.customerId, data);
    if (!res.success) {
      showToast('error', 'Error en el abono', res.error);
    }
    return res;
  };

  const handleDeleteCustomer = async (customerId: string) => {
    const cust = customers.find((c) => c.customerId === customerId);
    if (!cust) return;
    if (confirm(`¿Estás seguro de que deseas eliminar al cliente "${cust.name}"?`)) {
      const res = await deleteCustomer(customerId);
      if (res.success) {
        showToast('success', 'Cliente eliminado', 'El cliente fue removido de tu lista.');
      } else {
        showToast('error', 'Error al eliminar', res.error);
      }
    }
  };

  if (isLoading && customers.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-7">
      {/* FORM VIEWS */}
      {(activeView === 'create-customer' || activeView === 'edit-customer') && (
        <CustomerForm
          editingCustomer={editingCustomer}
          onCancel={() => {
            setActiveView('grid');
            setEditingCustomer(null);
          }}
          onSave={handleSaveCustomer}
          isSaving={isSaving}
        />
      )}

      {/* GRID VIEW */}
      {activeView === 'grid' && (
        <section className="space-y-6 animate-in fade-in duration-500">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 flex-1">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary/40">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre o teléfono..."
                  className="w-full pl-9 pr-8 py-2.5 bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl text-xs font-medium text-primary outline-none transition-all placeholder:text-primary/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary/40 hover:text-primary cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Cards Grid */}
          {filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-primary/10 rounded-2xl p-8 max-w-2xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-xl bg-primary text-background flex items-center justify-center mb-5">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-bold text-primary">
                {searchQuery
                  ? 'No se encontraron clientes'
                  : filterType === 'with-debt'
                  ? 'No hay clientes con deuda pendiente'
                  : 'Lista de clientes vacía'}
              </h3>
              <p className="text-sm text-primary/55 leading-relaxed max-w-md mt-2">
                {searchQuery
                  ? `Ningún cliente coincide con "${searchQuery}".`
                  : filterType === 'with-debt'
                  ? '¡Excelente! Todos tus clientes están al día.'
                  : 'Registra clientes frecuentes para controlar deudas y fidelización.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setActiveView('create-customer')}
                  className="mt-6 flex items-center gap-2 py-2.5 px-4 bg-primary hover:bg-secondary text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  <UserPlus size={14} /> Registrar primer cliente
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer.customerId}
                  customer={customer}
                  onOpenPayment={(cust) => setSelectedPaymentCustomer(cust)}
                  onOpenHistory={(cust) => setSelectedHistoryCustomer(cust)}
                  onEdit={(cust) => {
                    setEditingCustomer(cust);
                    setActiveView('edit-customer');
                  }}
                  onDelete={handleDeleteCustomer}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Modals */}
      <PaymentModal
        isOpen={!!selectedPaymentCustomer}
        customer={selectedPaymentCustomer}
        onClose={() => setSelectedPaymentCustomer(null)}
        onConfirmPayment={handleConfirmPayment}
        isSaving={isSaving}
      />

      <CustomerHistoryDrawer
        isOpen={!!selectedHistoryCustomer}
        customer={selectedHistoryCustomer}
        onClose={() => setSelectedHistoryCustomer(null)}
        onFetchHistory={getCustomerHistory}
        onOpenPayment={(cust) => setSelectedPaymentCustomer(cust)}
      />
    </div>
  );
}
