"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronRight, Home, Package, Settings, Tag, BarChart3, ShoppingCart, Users, UserCog, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { signOut } from "next-auth/react";
import useDashboardStore from "@/store/dashboard.store";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Resumen',
    href: '/dashboard/business',
    icon: Home,
    roles: ["admin", "owner"] 
  },
  {
    label: 'Categorías',
    href: '/dashboard/business/categories',
    icon: Tag,
    roles: ["admin", "owner"] 
  },
  { 
    label: 'Catálogo',
    href: '/dashboard/business/catalog',
    icon: Package, 
    roles: ["admin", "owner"] 
  },
  { 
    label: 'Inventario',
    href: '/dashboard/business/inventory',
    icon: BarChart3,
    roles: ["admin", "owner"] 
  },
  { 
    label: 'Ventas',
    href: '/dashboard/business/sales',
    icon: ShoppingCart,
    roles: ["admin", "owner"] 
  },
  { 
    label: 'Clientes / Fiados',
    href: '/dashboard/business/customers',
    icon: Users,
    roles: ["admin", "owner"] 
  },
  { 
    label: 'Empleados',
    href: '/dashboard/business/employees',
    icon: UserCog,
    roles: ["admin", "owner"] 
  },
  { 
    label: 'Mi Negocio',
    href: '/dashboard/business/settings',
    icon: Settings,
    roles: ["admin", "owner"] 
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useDashboardStore();

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
          onClick={closeSidebar}
        />
      )}

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-72 bg-background border-r border-foreground/5 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>

        <div className="lg:hidden flex justify-end p-4">
          <button 
            onClick={closeSidebar} 
            className="p-2 hover:bg-foreground/5 rounded-xl text-secondary"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="grow pt-4 lg:pt-8 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "bg-navy/10 text-navy"
                    : "text-secondary hover:bg-foreground/5 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    className={cn(isActive ? "text-navy" : "text-secondary")}
                  />
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </div>
                <ChevronRight size={12} className={cn("transition-transform", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40")} />
              </Link>
            );
          })}
        </nav>

        <footer className="p-6 border-t border-foreground/5 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer text-sm font-bold w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </footer>
      </aside>
    </>
  );
}