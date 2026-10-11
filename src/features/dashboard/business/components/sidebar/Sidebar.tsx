"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  HouseIcon,
  ShoppingBagIcon,
  ReceiptIcon,
  UsersIcon,
  UsersThreeIcon,
  DotsThreeIcon,
  SignOutIcon,
  StorefrontIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
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
  const { data: session } = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const userName = session?.user?.name ?? "Usuario";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image;
  const tenantSlug = session?.user?.tenantSlug;
  const storeUrl = tenantSlug ? `/${tenantSlug}` : "/";

  // Popover open/close lifecycle with animation
  useEffect(() => {
    if (isPopoverOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(t);
    }
  }, [isPopoverOpen]);

  // Close popover on outside click
  useEffect(() => {
    if (!isPopoverOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isPopoverOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isPopoverOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPopoverOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isPopoverOpen]);

  const handleSignOut = async () => {
    setIsPopoverOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const avatarInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside
      role="navigation"
      className="hidden lg:flex flex-col w-80 h-screen py-4 px-2 md:px-4 xl:px-10 shrink-0 bg-background border-r border-primary/10 relative"
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
                <span
                  className={cn(
                    "text-xl tracking-tight leading-tight",
                    isActive ? "font-bold" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Profile section */}
        <div className="mt-auto pt-4 relative">
          {/* Popover menu */}
          {shouldRender && (
            <div
              ref={popoverRef}
              className={cn(
                "absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-primary/10 bg-background shadow-lg overflow-hidden",
                "transition-all duration-200 origin-bottom",
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2"
              )}
            >
              {/* Popover items */}
              <div className="p-1.5 flex flex-col gap-0.5">
                <Link
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsPopoverOpen(false)}
                  className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-primary/80 hover:bg-primary/5 hover:text-primary transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <StorefrontIcon size={20} weight="regular" className="shrink-0 text-primary/60" />
                  <span>Ver tienda</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-red-400 text-left"
                >
                  <SignOutIcon size={20} weight="regular" className="shrink-0" />
                  <span>Cerrar sesión</span>
                </button>
              </div>

              {/* Divider + user mini info at bottom of popover */}
              <div className="border-t border-primary/10 px-4 py-3 flex items-center gap-2.5 bg-primary/[0.02]">
                <div className="w-7 h-7 rounded-full bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center border border-primary/10">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-primary/70">{avatarInitials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-primary truncate leading-tight">{userName}</p>
                  <p className="text-xs text-primary/50 truncate leading-tight">{userEmail}</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile trigger button */}
          <button
            ref={triggerRef}
            onClick={() => setIsPopoverOpen((v) => !v)}
            aria-expanded={isPopoverOpen}
            aria-haspopup="menu"
            className="flex items-center gap-3 w-full rounded-full p-3 hover:bg-primary/10 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-accent group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden shrink-0 border border-primary/10 flex items-center justify-center">
              {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <UserCircleIcon size={32} weight="fill" className="text-primary/40" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-base font-bold text-primary truncate leading-tight tracking-tight">
                {userName}
              </p>
              <p className="text-sm font-medium text-primary/60 truncate leading-tight tracking-tight">
                {userEmail}
              </p>
            </div>
            <DotsThreeIcon
              size={24}
              weight="bold"
              className={cn(
                "text-primary shrink-0 transition-colors",
                isPopoverOpen && "text-primary/60"
              )}
            />
          </button>
        </div>
      </nav>
    </aside>
  );
}