"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Users, LogOut } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { signOut } from "next-auth/react";

export default function EmployeeBottomNav() {
  const pathname = usePathname();

  const handleSignOut = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      signOut({ callbackUrl: "/" });
    }
  };

  const navItems = [
    { label: "Ventas", href: "/dashboard/employee/sales", icon: ShoppingCart },
    { label: "Clientes", href: "/dashboard/employee/customers", icon: Users },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 h-16 lg:hidden flex items-center justify-around bg-[#111111]/95 backdrop-blur-md border-t border-[#262626] px-4 pb-safe select-none"
      aria-label="Navegación móvil"
    >
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-[10px] font-medium tracking-wide",
              isActive ? "text-accent" : "text-foreground-muted hover:text-foreground"
            )}
          >
            <item.icon size={20} className={cn("transition-colors", isActive ? "text-accent" : "text-foreground-muted")} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={handleSignOut}
        className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-[10px] font-medium tracking-wide text-foreground-muted hover:text-red-400 cursor-pointer"
      >
        <LogOut size={20} />
        <span>Salir</span>
      </button>
    </nav>
  );
}
