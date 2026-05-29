"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogOut, ChevronRight, ShoppingCart, Users, X
} from 'lucide-react';
import gsap from 'gsap';
import { cn } from '@/shared/utils/cn';
import { signOut } from 'next-auth/react';
import useDashboardStore from '@/store/dashboard.store';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Ventas',            href: '/dashboard/employee/sales',      icon: ShoppingCart },
  { label: 'Clientes / Fiados', href: '/dashboard/employee/customers',  icon: Users },
];

export default function EmployeeSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useDashboardStore();
  const sidebarRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    if (!sidebar || !overlay) return;

    const ctx = gsap.matchMedia();

    ctx.add('(max-width: 1023px)', () => {
      if (isSidebarOpen) {
        gsap.to(overlay, { opacity: 1, pointerEvents: 'auto', duration: 0.25, ease: 'power2.out' });
        gsap.fromTo(sidebar, { x: '-100%' }, { x: '0%', duration: 0.32, ease: 'power3.out' });
        gsap.fromTo(
          sidebar.querySelectorAll('nav a, nav button'),
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, stagger: 0.04, duration: 0.25, ease: 'power2.out', delay: 0.15 }
        );
      } else {
        gsap.to(overlay, { opacity: 0, pointerEvents: 'none', duration: 0.2, ease: 'power2.in' });
        gsap.to(sidebar, { x: '-100%', duration: 0.28, ease: 'power3.in' });
      }
    });

    ctx.add('(min-width: 1024px)', () => {
      gsap.set(sidebar, { clearProps: 'all' });
      gsap.set(overlay, { clearProps: 'all' });
    });

    return () => ctx.revert();
  }, [isSidebarOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden opacity-0 pointer-events-none"
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Menú principal"
        aria-hidden={!isSidebarOpen}
        className={cn(
          'fixed lg:static inset-y-0 left-0 w-72 bg-background border-r border-foreground/5 flex flex-col z-50',
          '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={closeSidebar}
            className="p-2.5 hover:bg-foreground/5 rounded-xl text-foreground-muted hover:text-primary transition-colors"
            aria-label="Cerrar menú de navegación"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 pt-4 lg:pt-8 px-3 space-y-1 overflow-y-auto" aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-contrast/10 text-contrast border border-contrast/15'
                    : 'text-foreground-muted hover:bg-foreground/5 hover:text-primary'
                )}
              >
                <span className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive ? 'text-contrast' : 'text-foreground-muted group-hover:text-primary'
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </span>
                <ChevronRight
                  size={12}
                  className={cn('transition-all', isActive ? 'opacity-100 text-contrast' : 'opacity-0 group-hover:opacity-40')}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <footer className="p-4 border-t border-foreground/5 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="cursor-pointer text-sm font-bold w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/8 hover:text-red-300 transition-all duration-200"
            aria-label="Cerrar sesión"
          >
            <LogOut size={18} aria-hidden="true" />
            Cerrar Sesión
          </button>
        </footer>
      </aside>
    </>
  );
}
