'use client';

import { useRef, useState } from 'react';
import { SidebarSimpleIcon } from '@phosphor-icons/react';
import Sidebar from '@/features/dashboard/business/components/main/sections/customers/Sidebar/Sidebar';
import CustomersMain from '@/features/dashboard/business/components/main/sections/customers/Main/Main';
import Toaster from '@/shared/components/Toaster';
import useToast from '@/shared/hooks/useToast';
import useCustomers from '@/features/dashboard/business/hooks/useCustomers';

export default function Customers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toasts, showToast, removeToast } = useToast();
  const newCustomerRef = useRef<(() => void) | null>(null);

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


  const handleNewCustomer = () => {
    if (newCustomerRef.current) {
      newCustomerRef.current();
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  return (
    <div className="flex w-full bg-background relative min-h-screen">
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Main content (Center) */}
      <div className="flex-1 min-w-0 custom-scrollbar relative">
        <CustomersMain
          showToast={showToast}
          onNewCustomerRef={newCustomerRef}
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
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Sidebar toggle button (Right) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-4 lg:right-6 z-[110] flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-background text-primary shadow-sm transition-all duration-200 hover:border-primary/10 hover:bg-primary/5 hover:shadow-sm active:scale-95 cursor-pointer md:bg-transparent md:shadow-none"
        title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        aria-label="Alternar menú lateral"
      >
        <SidebarSimpleIcon size={24} weight="regular" className={isSidebarOpen ? "rotate-180" : ""} />
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar panel (Right) */}
      <div
        className={`shrink-0 transition-all duration-300 border-l border-primary/10 bg-background 
          fixed inset-y-0 right-0 z-50 w-65
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${isSidebarOpen ? 'md:w-80 md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden md:border-l-0'}
        `}
      >
        <Sidebar
          onCloseMobile={() => setIsSidebarOpen(false)}
          filterType={filterType}
          onFilterChange={setFilterType}
          onNewCustomer={handleNewCustomer}
          totalWithDebt={totalWithDebt}
          totalPaid={totalPaid}
          totalDebtSum={totalDebtSum}
        />
      </div>
    </div>
  );
}
