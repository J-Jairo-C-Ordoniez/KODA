"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Users, UserCog } from "lucide-react";
import { cn } from "@/shared/utils/cn";

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

export default function BusinessBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-primary">
      <div className="flex h-18 items-center justify-between px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
              className={cn(
                "flex items-center rounded-lg justify-center aspect-square transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent p-2 w-fit",
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
  );
}