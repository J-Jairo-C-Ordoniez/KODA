'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Package, BarChart3, ShoppingCart, Users, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { signOut } from 'next-auth/react';
import Logo from '@/components/ui/Logo';

const navItems = [
  { label: 'Resumen', href: '/dashboard/business', icon: Home },
  { label: 'Categorías', href: '/dashboard/business/categories', icon: Tag },
  { label: 'Catálogo', href: '/dashboard/business/catalog', icon: Package },
  { label: 'Inventario', href: '/dashboard/business/inventory', icon: BarChart3 },
  { label: 'Ventas', href: '/dashboard/business/sales', icon: ShoppingCart },
  { label: 'Clientes / Fiados', href: '/dashboard/business/customers', icon: Users },
  { label: 'Mi Negocio', href: '/dashboard/business/settings', icon: Settings },
];

export default function BusinessSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-background border-r border-foreground/5 flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-foreground/5">
        <Logo type="light" />
      </div>

      <nav className="grow pt-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group',
                isActive
                  ? 'bg-navy/10 text-navy shadow-sm shadow-navy/10'
                  : 'text-secondary hover:bg-foreground/5 hover:text-primary'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={cn(isActive ? 'text-navy' : 'text-secondary group-hover:text-primary')} />
                <span className="text-sm font-semibold tracking-tight">{item.label}</span>
              </div>
              <ChevronRight size={14} className={cn('transition-transform', isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40')} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-foreground/5 mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/5 transition-colors text-sm font-semibold"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
