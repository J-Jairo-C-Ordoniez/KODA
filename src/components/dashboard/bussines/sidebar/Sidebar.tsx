'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tags, Package, Boxes, TrendingUp, Settings } from 'lucide-react';

const navItems = [
  { name: 'Métricas', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Categorías', href: '/dashboard/categories', icon: Tags },
  { name: 'Catálogo', href: '/dashboard/catalog', icon: Package },
  { name: 'Inventario', href: '/dashboard/inventory', icon: Boxes },
  { name: 'Ventas', href: '/dashboard/sales', icon: TrendingUp },
  { name: 'Ajustes', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-16 lg:w-1/6 flex flex-col pt-4 transition-all duration-300 border-r border-secondary/10 shrink-0">
      <div className='container mx-auto px-1 md:px-2 flex flex-col h-full'>
        <article className="space-y-2 py-5 px-1 lg:px-3 overflow-y-auto overflow-x-hidden">
          <h3 className="text-primary/90 text-[10px] lg:text-xs tracking-wider font-semibold uppercase mb-4 text-center lg:text-left">
            <span className="hidden lg:inline">Navegación</span>
            <span className="lg:hidden">Menú</span>
          </h3>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-0 lg:gap-3 px-0 lg:px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 tracking-wider justify-center lg:justify-start ${isActive ? 'bg-secondary/10 text-primary/90' : 'text-secondary/90 hover:text-primary/90'}`}
              >
                <item.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="hidden lg:block">{item.name}</span>
                {isActive &&
                  <span className="hidden lg:block ml-auto h-2 w-2 rounded-full bg-primary/90"></span>
                }
              </Link>
            );
          })}
        </article>

        <div className="py-4 mt-auto border-t border-secondary/10">
          <Link
            href="/"
            title="Ir a Tienda"
            aria-label="Ir a Tienda Pública"
            className="border border-secondary/10 w-full flex items-center justify-center lg:block lg:text-center px-0 lg:px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 tracking-wider text-secondary/90 hover:text-primary/90 hover:bg-secondary/10"
          >
            <span className="hidden lg:block">Ir a Tienda</span>
            <span className="lg:hidden font-bold">T</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
