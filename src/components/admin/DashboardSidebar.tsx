"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Store, 
  Package, 
  Tag, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  Wallet
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { signOut } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles: string[];
}

const navItems: NavItem[] = [
  // SuperAdmin Items
  { label: "Ecosistema", href: "/admin/eco", icon: ShieldCheck, roles: ["superAdmin"] },
  { label: "Suscripciones", href: "/admin/eco/billing", icon: CreditCard, roles: ["superAdmin"] },
  
  // Admin Items
  { label: "Inicio", href: "/dashboard", icon: LayoutDashboard, roles: ["admin"] },
  { label: "Productos", href: "/dashboard/inventory", icon: Package, roles: ["admin"] },
  { label: "Categorías", href: "/dashboard/categories", icon: Tag, roles: ["admin"] },
  { label: "Empleados", href: "/dashboard/employees", icon: Users, roles: ["admin"] },
  { label: "Catálogo", href: "/dashboard/catalog", icon: Store, roles: ["admin"] },
  
  // Shared / Mixed
  { label: "Ventas", href: "/dashboard/sales", icon: ShoppingBag, roles: ["admin", "employee"] },
  { label: "Deudas / Fiados", href: "/dashboard/debts", icon: Wallet, roles: ["admin", "employee"] },
  { label: "Configuración", href: "/dashboard/settings", icon: Settings, roles: ["admin"] },
];

export default function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-72 bg-background border-r border-foreground/5 flex flex-col h-full">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-navy flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">K</span>
          </div>
          <span className="text-xl font-black text-primary tracking-tighter">KODA</span>
        </Link>
      </div>

      <nav className="grow px-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-navy text-white shadow-lg shadow-navy/10" 
                  : "text-secondary hover:bg-foreground/5 hover:text-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-secondary group-hover:text-navy")} />
                <span className="text-sm font-black tracking-tight">{item.label}</span>
              </div>
              <ChevronRight size={14} className={cn("transition-transform", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40")} />
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-foreground/5 mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/5 transition-colors font-black text-sm tracking-tight"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
