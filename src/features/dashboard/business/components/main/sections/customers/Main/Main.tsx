'use client';

import { useState } from 'react';
import { Search, X, UserPlus, Users, Wallet, CheckCircle2, Loader2 } from 'lucide-react';
import useCustomers, { CustomerFilterType } from '@/features/dashboard/business/hooks/useCustomers';
import { Customer } from '@/features/dashboard/business/api/customers.api';
import type { ToastType } from '@/shared/components/Toast';

import CustomerCard from './ui/CustomerCard';
import PaymentModal from './ui/PaymentModal';
import CustomerHistoryDrawer from './ui/CustomerHistoryDrawer';
import CustomerFormModal from './ui/CustomerFormModal';
import Loader from '@/shared/components/Loader';

type ToastHandler = (type: ToastType, message: string, description?: string) => void;

interface CustomersMainProps {
  showToast: ToastHandler;
}

export default function CustomersMain({ showToast }: CustomersMainProps) {
  const {
    filteredCustomers,
    isLoading,
    isSaving,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    totalWithDebt,
    totalPaid,
    customers,
    saveCustomer,
    registerPayment,
    deleteCustomer,
    getCustomerHistory,
  } = useCustomers();

  // Modals / Drawers state
  const [selectedPaymentCustomer, setSelectedPaymentCustomer] = useState<Customer | null>(null);
  const [selectedHistoryCustomer, setSelectedHistoryCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);

  const handleSaveCustomer = async (formData: any, customerId?: string) => {
    const res = await saveCustomer(formData, customerId);
    if (res.success) {
      showToast(
        'success',
        customerId ? 'Cliente actualizado' : 'Cliente registrado',
        'Los datos del cliente se guardaron correctamente.'
      );
      setIsCustomerFormOpen(false);
      setEditingCustomer(null);
    } else {
      showToast('error', 'Error al guardar cliente', res.error);
    }
    return res;
  };

  const handleConfirmPayment = async (data: any) => {
    if (!selectedPaymentCustomer) return { success: false, error: 'No hay cliente seleccionado' };
    const res = await registerPayment(selectedPaymentCustomer.customerId, data);
    if (res.success) {
      showToast(
        'success',
        'Abono registrado',
        `Se registró el pago de los ${data.amount} correctamente.`
      );
    } else {
      showToast('error', 'Error en el abonado', res.error);
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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header & Search Bar */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-primary tracking-tight">Cuaderno & Clientes</h2>
            <p className="text-xs text-primary/55 mt-0.5">
              Administra el historial de deudas, abonados y registros de lealtad de tu comercio.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingCustomer(null);
              setIsCustomerFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <UserPlus size={15} /> Nuevo Cliente
          </button>
        </div>

        {/* Search Bar & Pill Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary/40">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cliente por nombre o teléfono..."
              className="w-full pl-10 pr-10 py-3 bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-2xl text-xs font-medium text-primary outline-none transition-all placeholder:text-primary/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-primary/40 hover:text-primary transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            <button
              onClick={() => setFilterType('with-debt')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'with-debt'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
              }`}
            >
              <Wallet size={14} />
              <span>Con Deuda</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-[10px]">
                {totalWithDebt}
              </span>
            </button>

            <button
              onClick={() => setFilterType('paid')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'paid'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
              }`}
            >
              <CheckCircle2 size={14} />
              <span>Al Día</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-[10px]">
                {totalPaid}
              </span>
            </button>

            <button
              onClick={() => setFilterType('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'all'
                  ? 'bg-primary text-background shadow-xs'
                  : 'bg-foreground-muted/40 hover:bg-foreground-muted/60 text-primary/70'
              }`}
            >
              <Users size={14} />
              <span>Todos</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-foreground-muted/50 text-[10px]">
                {customers.length}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Customers Cards Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-background-card border border-primary/8 rounded-3xl p-8 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-foreground-muted/40 text-primary/40 flex items-center justify-center mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-base font-bold text-primary">
            {searchQuery
              ? 'No se encontraron clientes'
              : filterType === 'with-debt'
              ? 'No hay clientes con deuda pendiente'
              : 'Lista de clientes vacía'}
          </h3>
          <p className="text-xs text-primary/55 mt-1 max-w-md">
            {searchQuery
              ? `Ningún cliente coincide con "${searchQuery}".`
              : filterType === 'with-debt'
              ? '¡Excelente! Todos tus clientes están al día con sus pagos.'
              : 'Registra a tus clientes frecuentes para llevar el control de deudas y fidelización.'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setEditingCustomer(null);
                setIsCustomerFormOpen(true);
              }}
              className="mt-5 flex items-center gap-2 py-2.5 px-4 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <UserPlus size={14} /> Registrar primer cliente
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.customerId}
              customer={customer}
              onOpenPayment={(cust) => setSelectedPaymentCustomer(cust)}
              onOpenHistory={(cust) => setSelectedHistoryCustomer(cust)}
              onEdit={(cust) => {
                setEditingCustomer(cust);
                setIsCustomerFormOpen(true);
              }}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      )}

      {/* Modals & Drawers */}
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

      <CustomerFormModal
        isOpen={isCustomerFormOpen}
        editingCustomer={editingCustomer}
        onClose={() => {
          setIsCustomerFormOpen(false);
          setEditingCustomer(null);
        }}
        onSave={handleSaveCustomer}
        isSaving={isSaving}
      />
    </div>
  );
}
