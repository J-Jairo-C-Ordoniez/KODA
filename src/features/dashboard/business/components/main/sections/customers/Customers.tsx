'use client';

import { useRef, useState } from 'react';
import { Sidebar as SidebarIcon } from 'lucide-react';
import Sidebar from '@/features/dashboard/business/components/main/sections/customers/Sidebar/Sidebar';
import CustomersMain from '@/features/dashboard/business/components/main/sections/customers/Main/Main';
import { Toaster, useToast } from '@/shared/components/Toaster';
import useCustomers from '@/features/dashboard/business/hooks/useCustomers';

export default function Customers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toasts, showToast, removeToast } = useToast();

  // Single source of truth — one hook instance for the entire page
  const {
    customers,
    filteredCustomers,
    isLoading,
    isSaving,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    totalWithDebt,
    totalPaid,
    totalDebtSum,
    saveCustomer,
    registerPayment,
    deleteCustomer,
    getCustomerHistory,
  } = useCustomers();

  // Ref to trigger "new customer" view from sidebar
  const newCustomerRef = useRef<(() => void) | null>(null);

  const handleNewCustomer = () => {
    if (newCustomerRef.current) {
      newCustomerRef.current();
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 left-2 z-110 p-2 text-primary hover:bg-foreground-muted/40 rounded-lg border border-transparent hover:border-primary/10 hover:shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
        title={isSidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
        aria-label="Alternar menú de clientes"
      >
        <SidebarIcon size={20} />
      </button>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`shrink-0 transition-all duration-300 border-r border-primary/5 bg-background fixed inset-y-0 left-0 z-100 w-[260px]
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'md:w-[18%] md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden'}
        `}
      >
        <Sidebar
          onCloseMobile={() => setIsSidebarOpen(false)}
          filterType={filterType}
          onFilterChange={setFilterType}
          onNewCustomer={handleNewCustomer}
          totalWithDebt={totalWithDebt}
          totalPaid={totalPaid}
          totalCustomers={customers.length}
          totalDebtSum={totalDebtSum}
        />
      </div>

      <div className="flex-1 min-w-0 h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8 custom-scrollbar bg-background relative">
        <CustomersMain
          showToast={showToast}
          onNewCustomerRef={newCustomerRef}
          // Pass all shared state down
          customers={customers}
          filteredCustomers={filteredCustomers}
          isLoading={isLoading}
          isSaving={isSaving}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          totalWithDebt={totalWithDebt}
          totalPaid={totalPaid}
          saveCustomer={saveCustomer}
          registerPayment={registerPayment}
          deleteCustomer={deleteCustomer}
          getCustomerHistory={getCustomerHistory}
        />
      </div>
    </div>
  );
}
