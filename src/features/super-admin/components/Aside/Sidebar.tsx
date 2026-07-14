"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, LogOut, ShieldCheck, Home, Package, Building2, Scroll, Settings } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { signOut } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { label: "Dashboard",     href: "/dashboard/admin/metrics",  icon: Home       },
  { label: "Ecosistema",    href: "/dashboard/admin/eco",      icon: ShieldCheck },
  { label: "Suscripciones", href: "/dashboard/admin/billing",  icon: CreditCard  },
  { label: "Planes",        href: "/dashboard/admin/plans",    icon: Package     },
  { label: "Negocios",      href: "/dashboard/admin/business", icon: Building2   },
  { label: "Legal",         href: "/dashboard/admin/legal",    icon: Scroll      },
  { label: "Ajustes",       href: "/dashboard/admin/settings", icon: Settings    },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      role="navigation"
      aria-label="Menú principal"
      className="hidden lg:flex w-60 bg-background border-r border-border flex-col shrink-0 h-full"
    >
      {/* Nav links */}
      <nav className="flex-1 pt-6 px-2 space-y-0.5 overflow-y-auto custom-scrollbar" aria-label="Navegación principal">
        <p className="px-4 pb-3 text-[10px] font-bold tracking-[0.15em] uppercase text-foreground-muted/50">
          Principal
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150 group",
                isActive
                  ? "bg-accent/8 text-accent border-l-2 border-accent"
                  : "text-foreground-muted hover:bg-foreground/4 hover:text-foreground border-l-2 border-transparent"
              )}
            >
              <item.icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-accent" : "text-foreground-muted group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              <span className="text-xs font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <footer className="p-3 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer text-xs font-medium w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground-muted hover:bg-red-500/8 hover:text-red-400 transition-all duration-150 border-l-2 border-transparent"
        >
          <LogOut size={16} aria-hidden="true" />
          Cerrar Sesión
        </button>
      </footer>
    </aside>
  );
}