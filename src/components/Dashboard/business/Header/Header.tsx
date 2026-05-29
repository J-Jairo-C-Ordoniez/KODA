'use client';

import Logo from '@/components/ui/Logo';
import useDashboardStore from '@/store/dashboard.store';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function Header() {
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  return (
    <header className="px-4 sm:px-6 h-16 w-full bg-background/80 backdrop-blur-xl flex items-center justify-between border-b border-foreground/5 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-foreground/5 rounded-xl lg:hidden text-foreground-muted hover:text-primary transition-colors"
          aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          aria-expanded={isSidebarOpen}
          aria-controls="business-sidebar"
        >
          {isSidebarOpen ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
        </button>
        <Logo type="light" />
      </div>
    </header>
  );
}