"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, ShoppingBagIcon, ReceiptIcon, UsersIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { cn } from "@/shared/utils/cn";

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

export default function BusinessBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("dashboard-scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          if (currentScrollY > lastScrollY.current) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 w-full z-40 lg:hidden bg-background border-t border-primary/10 pb-2 transition-all duration-300 ease-in-out",
        isVisible
          ? "bottom-0 translate-y-0"
          : "bottom-0 translate-y-full"
      )}
    >
      <nav className="flex items-center justify-around h-14 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
              className="relative flex items-center justify-center flex-1 h-full group outline-none"
            >
              <item.icon
                size={28}
                weight={isActive ? "fill" : "regular"}
                aria-hidden="true"
                className={cn(
                  "transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-primary/60 group-hover:text-primary/80"
                )}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}