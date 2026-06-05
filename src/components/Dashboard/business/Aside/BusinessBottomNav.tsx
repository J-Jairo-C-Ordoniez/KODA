"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  MoreHorizontal, 
  Tag, 
  BarChart3, 
  UserCog, 
  Settings, 
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { signOut } from "next-auth/react";

export default function BusinessBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainItems = [
    { label: "Resumen", href: "/dashboard/business", icon: Home },
    { label: "Ventas", href: "/dashboard/business/sales", icon: ShoppingCart },
    { label: "Catálogo", href: "/dashboard/business/catalog", icon: Package },
    { label: "Clientes", href: "/dashboard/business/customers", icon: Users },
  ];

  const moreItems = [
    { label: "Categorías", href: "/dashboard/business/categories", icon: Tag },
    { label: "Inventario", href: "/dashboard/business/inventory", icon: BarChart3 },
    { label: "Empleados", href: "/dashboard/business/employees", icon: UserCog },
    { label: "Mi Negocio", href: "/dashboard/business/settings", icon: Settings },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isMoreActive = moreItems.some((item) => pathname === item.href);

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 h-16 lg:hidden flex items-center justify-around bg-[#111111]/95 backdrop-blur-md border-t border-[#262626] px-4 pb-safe select-none"
        aria-label="Navegación móvil"
      >
        {mainItems.map((item) => {
          // In next.js, the index route /dashboard/business matches exactly
          const isActive = item.href === "/dashboard/business" 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
            
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
          onClick={() => setIsMenuOpen(true)}
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-[10px] font-medium tracking-wide cursor-pointer",
            isMoreActive || isMenuOpen ? "text-accent" : "text-foreground-muted hover:text-foreground"
          )}
        >
          <MoreHorizontal size={20} className={cn("transition-colors", isMoreActive || isMenuOpen ? "text-accent" : "text-foreground-muted")} />
          <span>Más</span>
        </button>
      </nav>

      {/* Slide-up Drawer for "More" options */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="w-full bg-[#181818] border-t border-[#262626] rounded-t-2xl p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar animate-slide-up-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header drawer */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground-muted/70">
                Opciones adicionales
              </h3>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1 hover:bg-foreground/5 rounded-lg text-foreground-muted transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation options */}
            <div className="grid grid-cols-1 gap-1">
              {moreItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150",
                      isActive 
                        ? "bg-accent/8 text-accent" 
                        : "text-foreground-muted hover:bg-foreground/4 hover:text-foreground"
                    )}
                  >
                    <item.icon size={18} className={isActive ? "text-accent" : "text-foreground-muted"} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout button */}
            <div className="border-t border-[#262626] pt-4">
              <button
                onClick={handleSignOut}
                className="cursor-pointer text-sm font-medium w-full flex items-center gap-4 px-4 py-3 rounded-xl text-foreground-muted hover:bg-red-500/8 hover:text-red-400 transition-all duration-150"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
