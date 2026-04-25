"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronRight, Home, Package, Settings, Tag, BarChart3, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { signOut } from "next-auth/react";

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
    roles: ["admin", "owner"] },
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
    label: 'Mi Negocio',
    href: '/dashboard/business/settings',
    icon: Settings,
    roles: ["admin", "owner"] 
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-74 bg-background border-r border-foreground/5 flex flex-col">
      <nav className="grow pt-8 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group",
                isActive
                  ? "bg-navy/20 text-navy shadow-lg shadow-navy/10"
                  : "text-secondary hover:bg-foreground/5 hover:text-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={20}
                  className={cn(isActive ? "text-navy" : "text-secondary group-hover:text-secondary")}
                />

                <span className="text-md font-medium tracking-tight">{item.label}</span>
              </div>
              <ChevronRight size={14} className={cn("transition-transform", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40")} />
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-foreground/5 mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer text-md font-medium tracking-tight w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/5 transition-colors text-sm"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}