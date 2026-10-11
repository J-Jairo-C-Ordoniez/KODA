'use client';

import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { Customer, CustomerHistoryData } from '@/features/dashboard/business/api/customers.api';
import type { ToastType } from '@/shared/hooks/useToast';
import { CustomerFilterType } from '@/features/dashboard/business/hooks/useCustomers';

import CustomerCard from '@/features/dashboard/business/components/main/sections/customers/Main/ui/CustomerCard';
import CustomerForm from '@/features/dashboard/business/components/main/sections/customers/Main/ui/CustomerForm';
import PaymentModal from '@/features/dashboard/business/components/main/sections/customers/Main/ui/PaymentModal';
import CustomerHistoryDrawer from '@/features/dashboard/business/components/main/sections/customers/Main/ui/CustomerHistoryDrawer';
import Loader from '@/shared/components/Loader';
import Button from '@/shared/components/Button';

type ToastHandler = (type: ToastType, message: string, description?: string) => void;
type ActiveView = 'grid' | 'create-customer' | 'edit-customer';

interface CustomersMainProps {
  showToast: ToastHandler;
  onNewCustomerRef?: React.MutableRefObject<(() => void) | null>;
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
  isSidebarOpen: boolean;
}

export default function CustomersMain({ showToast, onNewCustomerRef, filteredCustomers, customers, isLoading, isSaving, searchQuery, setSearchQuery, filterType, saveCustomer, registerPayment, deleteCustomer, getCustomerHistory, isSidebarOpen }: CustomersMainProps) {
  const [activeView, setActiveView] = useState<ActiveView>('grid');
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedPaymentCustomer, setSelectedPaymentCustomer] = useState<Customer | null>(null);
  const [selectedHistoryCustomer, setSelectedHistoryCustomer] = useState<Customer | null>(null);

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
    <main className="w-full space-y-8 px-2 py-8 md:px-4 md:py-10 xl:px-10">
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

      {activeView === 'grid' && (
        <section className="space-y-6 animate-in fade-in duration-500">
          <header className="border-b border-primary/10 pb-6">
            <div className="relative w-full max-w-xl">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary/40">
                <MagnifyingGlassIcon size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o teléfono..."
                className="w-full rounded-2xl border border-primary/10 bg-background py-3.5 pl-10 pr-10 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 hover:border-primary/20 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary/40 transition-colors hover:text-primary cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <XIcon size={18} />
                </button>
              )}
            </div>
          </header>

          {filteredCustomers.length === 0 ? (
            <div className="flex min-h-75 w-full flex-col items-center justify-center rounded-3xl border border-primary/10 bg-background/80 px-6 py-20 text-center shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-primary">
                {searchQuery
                  ? 'No se encontraron clientes'
                  : filterType === 'with-debt'
                    ? 'No hay clientes con deuda pendiente'
                    : 'Lista de clientes vacía'}
              </h3>
              <p className="my-2 max-w-md text-sm leading-relaxed text-foreground/65 sm:text-base">
                {searchQuery
                  ? `Ningún cliente coincide con "${searchQuery}".`
                  : filterType === 'with-debt'
                    ? '¡Excelente! Todos tus clientes están al día.'
                    : 'Registra clientes frecuentes para controlar deudas y fidelización.'}
              </p>
              {!searchQuery && (
                <Button
                  variant='primary'
                  onClick={() => setActiveView('create-customer')}
                >
                  Registrar primer cliente
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${isSidebarOpen ? 'xl:grid-cols-2' : 'xl:grid-cols-3'}`}>
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
      )
      }

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
    </main>
  );
}
