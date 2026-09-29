'use client';

import { useState } from 'react';
import { Sidebar as SidebarIcon } from 'lucide-react';
import useToast from '@/shared/hooks/useToast';
import useTeam from '@/features/dashboard/business/hooks/useTeam';
import Toaster from '@/shared/components/Toaster';

import Sidebar from '@/features/dashboard/business/components/main/sections/team/Sidebar/Sidebar';
import TeamMain from '@/features/dashboard/business/components/main/sections/team/Main/Main';

export default function Team() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [pendingNewEmployee, setPendingNewEmployee] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const {
    employees,
    isLoading,
    isSaving,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useTeam();

  const handleNewEmployeeFromSidebar = () => {
    setPendingNewEmployee(true);
  };

  return (
    <div className="flex w-full bg-background relative min-h-screen">
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Main content (Center) */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 md:pt-8 custom-scrollbar relative">
        <TeamMain
          showToast={showToast}
          selectedEmployeeId={selectedEmployeeId}
          employees={employees}
          isLoading={isLoading}
          isSaving={isSaving}
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
          pendingNewEmployee={pendingNewEmployee}
          onNewEmployeeHandled={() => setPendingNewEmployee(false)}
        />
      </div>

      {/* Sidebar toggle button (Right) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-4 lg:right-6 z-[110] p-2 text-primary hover:bg-primary/5 rounded-xl border border-transparent hover:border-primary/10 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer bg-background md:bg-transparent shadow-sm md:shadow-none"
        title={isSidebarOpen ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
        aria-label="Alternar menú lateral"
      >
        <SidebarIcon size={20} className={isSidebarOpen ? "rotate-180" : ""} />
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
          fixed inset-y-0 right-0 z-50 w-[280px]
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${isSidebarOpen ? 'md:w-[280px] md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden md:border-l-0'}
        `}
      >
        <Sidebar
          employees={employees}
          selectedEmployeeId={selectedEmployeeId}
          onSelectEmployee={setSelectedEmployeeId}
          onNewEmployee={handleNewEmployeeFromSidebar}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
}
