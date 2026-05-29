"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, LogOut, ChevronRight, ShieldCheck, Home, Package, Building2, Scroll, Settings, X } from "lucide-react";
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
    label: "Dashboard",
    href: "/dashboard/admin/metrics",
    icon: Home,
    roles: ["superAdmin"]
  },
  {
    label: "Ecosistema",
    href: "/dashboard/admin/eco",
    icon: ShieldCheck,
    roles: ["superAdmin"]
  },
  {
    label: "Suscripciones",
    href: "/dashboard/admin/billing",
    icon: CreditCard,
    roles: ["superAdmin"]
  },
  {
    label: "Planes",
    href: "/dashboard/admin/plans",
    icon: Package,
    roles: ["superAdmin"]
  },
  {
    label: "Negocios",
    href: "/dashboard/admin/business",
    icon: Building2,
    roles: ["superAdmin"]
  },
  {
    label: "Legal",
    href: "/dashboard/admin/legal",
    icon: Scroll,
    roles: ["superAdmin"]
  },
  {
    label: "Ajustes",
    href: "/dashboard/admin/settings",
    icon: Settings,
    roles: ["superAdmin"]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useDashboardStore();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        role="navigation"
        aria-label="Menú principal"
        className={cn(
          "fixed lg:static inset-y-0 left-0 w-72 bg-background border-r border-foreground/5 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={closeSidebar}
            className="p-2.5 hover:bg-foreground/5 rounded-xl text-foreground-muted hover:text-primary transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 pt-4 lg:pt-8 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-contrast/10 text-contrast border border-contrast/15"
                    : "text-foreground-muted hover:bg-foreground/5 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive ? "text-contrast" : "text-foreground-muted group-hover:text-primary"
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </div>
                <ChevronRight
                  size={12}
                  className={cn("transition-all", isActive ? "opacity-100 text-contrast" : "opacity-0 group-hover:opacity-40")}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <footer className="p-4 border-t border-foreground/5 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer text-sm font-bold w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/8 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={18} aria-hidden="true" />
            Cerrar Sesión
          </button>
        </footer>
      </aside>
    </>
  );
}