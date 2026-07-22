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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 lg:hidden">
      <nav className="flex items-center justify-around bg-background backdrop-blur-2xl border border-primary/10 p-2 rounded-4xl shadow-2xl shadow-background/20">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
              className="relative flex flex-col items-center justify-center p-3 rounded-2xl group outline-none"
            >
              <item.icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
                className={cn(
                  "transition-all duration-500 ease-out",
                  isActive
                    ? "text-primary scale-110"
                    : "text-primary/40 group-hover:text-primary group-hover:-translate-y-0.5"
                )}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}