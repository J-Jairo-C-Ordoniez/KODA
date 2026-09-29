"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, ShoppingBagIcon, ReceiptIcon, UsersIcon, UsersThreeIcon, DotsThreeIcon } from "@phosphor-icons/react";
import { cn } from "@/shared/utils/cn";
import Logo from "@/shared/components/Logo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Resumen", href: "/dashboard/business", icon: HouseIcon },
  { label: "Productos", href: "/dashboard/business/products", icon: ShoppingBagIcon },
  { label: "Ventas", href: "/dashboard/business/sales", icon: ReceiptIcon },
  { label: "Clientes", href: "/dashboard/business/customers", icon: UsersIcon },
  { label: "Equipo", href: "/dashboard/business/team", icon: UsersThreeIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      role="navigation"
      className="hidden lg:flex flex-col w-80 h-screen py-4 px-3 md:px-6 lg:px-10 shrink-0 bg-background border-r border-primary/10"
    >
      <nav
        className="w-full h-full flex flex-col pt-4 pb-2"
        aria-label="Navegación principal"
      >
        <div className="mb-20 px-4 flex items-center">
          <Logo type="light" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={cn(
                  "group flex items-center gap-5 w-fit rounded-full px-5 py-3.5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "text-primary"
                    : "text-primary/80 hover:bg-primary/10 hover:text-primary"
                )}
              >
                <item.icon
                  size={28}
                  weight={isActive ? "fill" : "regular"}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span className={cn(
                  "text-xl tracking-tight leading-tight",
                  isActive ? "font-bold" : "font-medium"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-4">
          <button className="flex items-center gap-3 w-full rounded-full p-3 hover:bg-primary/10 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-accent group">
            <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden shrink-0 border border-primary/10">
              <img 
                src="https://ui-avatars.com/api/?name=Jhon+Jairo&background=random" 
                alt="Avatar del usuario" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-base font-bold text-primary truncate leading-tight tracking-tight">
                J Jairo C Ordoñez
              </p>
              <p className="text-sm font-medium text-primary/60 truncate leading-tight tracking-tight">
                @JhonJai99258979
              </p>
            </div>
            <DotsThreeIcon 
              size={24} 
              weight="bold" 
              className="text-primary shrink-0 transition-colors" 
            />
          </button>
        </div>
      </nav>
    </aside>
  );
}