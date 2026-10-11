"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  SignOutIcon,
  StorefrontIcon,
  UserCircleIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import { cn } from "@/shared/utils/cn";

export default function MobileUserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const userName = session?.user?.name ?? "Usuario";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image;
  const tenantSlug = session?.user?.tenantSlug;
  const storeUrl = tenantSlug ? `/${tenantSlug}` : "/";

  const avatarInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Menu open/close lifecycle with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed top-4 left-4 z-[110] lg:hidden">
      {/* Dropdown menu */}
      {shouldRender && (
        <div
          ref={menuRef}
          className={cn(
            "absolute top-full left-0 mt-2 w-60 rounded-2xl border border-primary/10 bg-background shadow-lg overflow-hidden",
            "transition-all duration-200 origin-top-left",
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2"
          )}
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-primary/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center border border-primary/10">
              {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-primary/70">{avatarInitials}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary truncate leading-tight">{userName}</p>
              <p className="text-xs text-primary/50 truncate leading-tight">{userEmail}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-1.5 flex flex-col gap-0.5">
            <Link
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-primary/80 hover:bg-primary/5 hover:text-primary transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <StorefrontIcon size={18} weight="regular" className="shrink-0 text-primary/60" />
              <span>Ver tienda</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-red-400 text-left"
            >
              <SignOutIcon size={18} weight="regular" className="shrink-0" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}

      {/* Avatar trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Menú de usuario"
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-primary/10 bg-background/90 backdrop-blur-sm px-2 py-1.5 shadow-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent",
          isOpen ? "bg-primary/5" : "hover:bg-primary/5 active:scale-95"
        )}
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center border border-primary/10">
          {userImage ? (
            <img src={userImage} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <UserCircleIcon size={22} weight="fill" className="text-primary/40" />
          )}
        </div>
        <DotsThreeIcon size={16} weight="bold" className="text-primary/60" />
      </button>
    </div>
  );
}
