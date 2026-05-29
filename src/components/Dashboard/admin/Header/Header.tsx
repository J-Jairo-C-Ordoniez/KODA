'use client';

import Logo from '@/components/ui/Logo';
import { Menu } from 'lucide-react';
import useDashboardStore from '@/store/dashboard.store';

export default function Header() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="px-4 sm:px-6 h-16 w-full bg-background/80 backdrop-blur-xl flex items-center justify-between border-b border-foreground/5 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-foreground/5 rounded-xl lg:hidden text-foreground-muted hover:text-primary transition-colors"
          aria-label="Abrir menú de navegación"
          aria-expanded="false"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <Logo type="light" />
      </div>
    </header>
  );
}