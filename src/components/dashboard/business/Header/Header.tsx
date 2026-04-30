import Logo from '@/components/ui/Logo';
import { Menu } from 'lucide-react';
import useDashboardStore from '@/store/dashboard.store';

export default function Header() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="px-4 sm:px-8 col-span-full h-18 w-full bg-background flex items-center justify-between border-b border-foreground/5 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-foreground/5 rounded-xl lg:hidden text-secondary hover:text-primary transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>
        <Logo type="light" />
      </div>
    </header>
  );
};