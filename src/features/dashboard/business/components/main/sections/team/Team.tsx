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
  const { toasts, showToast, removeToast } = useToast();

  const {
    employees,
    isLoading,
    isSaving,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useTeam();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 left-2 z-110 p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
        title={isSidebarOpen ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
        aria-label="Alternar menú lateral"
      >
        <SidebarIcon size={20} />
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`shrink-0 transition-all duration-300 border-r border-primary/5 bg-background fixed inset-y-0 left-0 z-100 w-65
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'md:w-[18%] md:opacity-100' : 'md:w-0 md:opacity-0 md:overflow-hidden'}
        `}
      >
        <Sidebar
          employees={employees}
          selectedEmployeeId={selectedEmployeeId}
          onSelectEmployee={setSelectedEmployeeId}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8 custom-scrollbar bg-background relative">
        <TeamMain
          showToast={showToast}
          selectedEmployeeId={selectedEmployeeId}
          employees={employees}
          isLoading={isLoading}
          isSaving={isSaving}
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
        />
      </div>
    </div>
  );
}
