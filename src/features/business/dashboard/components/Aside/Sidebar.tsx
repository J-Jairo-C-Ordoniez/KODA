"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Users, UserCog } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Logo from "@/shared/components/ui/Logo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Resumen", href: "/dashboard/business", icon: Home },
  { label: "Productos", href: "/dashboard/business/products", icon: Package },
  { label: "Ventas", href: "/dashboard/business/sales", icon: ShoppingCart },
  { label: "Clientes", href: "/dashboard/business/customers", icon: Users },
  { label: "Equipo", href: "/dashboard/business/team", icon: UserCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      role="navigation"
      className="hidden lg:flex w-25 h-screen p-4 shrink-0 bg-background"
    >
      <nav
        className="w-full h-full bg-primary flex flex-col items-center py-8 rounded-2xl"
        aria-label="Navegación principal"
      >
        <div className="mb-20">
          <Logo type="light" />
        </div>

        <div className="flex flex-col gap-6 w-full px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={cn(
                  "flex items-center rounded-lg justify-center w-full aspect-square transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent p-2",
                  isActive
                    ? "bg-background/20 text-foreground-muted"
                    : "text-foreground-muted/80 hover:bg-background/20 hover:text-foreground-muted"
                )}
              >
                <item.icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="shrink-0"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}