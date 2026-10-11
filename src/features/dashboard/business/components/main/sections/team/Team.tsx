'use client';

import { useState, useRef } from 'react';
import { SidebarSimpleIcon } from '@phosphor-icons/react';
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

  // Soporte para gesto táctil (swipe desde la derecha para abrir/cerrar)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);

    if (diffY < 60) {
      if (diffX > 50 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      } else if (diffX < -50 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

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
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex w-full bg-background relative min-h-screen"
    >
      <Toaster toasts={toasts} removeToast={removeToast} />

      {/* Main content (Center) */}
      <div className="flex-1 min-w-0 px-[8vw] py-8 pt-20 md:pt-8 custom-scrollbar relative">
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
