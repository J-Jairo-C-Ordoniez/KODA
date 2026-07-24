'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Plus, Wallet, CheckCircle2, Users } from 'lucide-react';
import { CustomerFilterType } from '@/features/dashboard/business/hooks/useCustomers';
import { formatCurrency } from '@/lib/formatters';

interface SidebarProps {
  onCloseMobile?: () => void;
  filterType: CustomerFilterType;
  onFilterChange: (type: CustomerFilterType) => void;
  onNewCustomer: () => void;
  totalWithDebt: number;
  totalPaid: number;
  totalCustomers: number;
  totalDebtSum: number;
}

export default function Sidebar({ onCloseMobile, filterType, onFilterChange, onNewCustomer, totalWithDebt, totalPaid, totalCustomers, totalDebtSum }: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-menu-item', {
        x: -10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const triggerMobileClose = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleSelectFilter = (type: CustomerFilterType) => {
    onFilterChange(type);
    triggerMobileClose();
  };

  return (
    <aside
      ref={containerRef}
      className="w-full h-full bg-background p-4 pt-20 flex flex-col gap-6 overflow-y-auto"
    >
      <h2 className="text-lg font-medium text-primary px-2 mt-2 tracking-tight">
        Clientes
      </h2>

      <nav className="flex flex-col gap-8">
        <section className="flex flex-col gap-1">
          <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary/40">
            Acciones
          </h3>
          <button
            onClick={() => {
              onNewCustomer();
              triggerMobileClose();
            }}
            className="gsap-menu-item flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-primary/60 transition-colors duration-200 hover:bg-foreground-muted/40 hover:text-primary cursor-pointer"
          >
            <Plus size={18} />
            Nuevo cliente
          </button>
        </section>

        <section className="flex flex-col gap-1">
          <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary/40">
            Filtros
          </h3>

          <button
            onClick={() => handleSelectFilter('with-debt')}
            className={`gsap-menu-item flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200 cursor-pointer ${filterType === 'with-debt'
              ? 'bg-foreground-muted/40 text-primary font-medium'
              : 'text-primary/60 hover:bg-foreground-muted/40 hover:text-primary'
              }`}
          >
            <div className="flex items-center gap-3">
              <Wallet size={18} />
              <span>Con Deuda</span>
            </div>
            <span className="text-sm font-medium text-primary/40">{totalWithDebt}</span>
          </button>

          <button
            onClick={() => handleSelectFilter('paid')}
            className={`gsap-menu-item flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200 cursor-pointer ${filterType === 'paid'
              ? 'bg-foreground-muted/40 text-primary font-medium'
              : 'text-primary/60 hover:bg-foreground-muted/40 hover:text-primary'
              }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} />
              <span>Al Día</span>
            </div>
            <span className="text-sm font-medium text-primary/40">
              {totalPaid}
            </span>
          </button>

          <button
            onClick={() => handleSelectFilter('all')}
            className={`gsap-menu-item flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200 cursor-pointer ${filterType === 'all'
              ? 'bg-foreground-muted/40 text-primary font-medium'
              : 'text-primary/60 hover:bg-foreground-muted/40 hover:text-primary'
              }`}
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span>Todos los clientes</span>
            </div>
            <span className="text-sm font-medium text-primary/40">{totalCustomers}</span>
          </button>
        </section>
      </nav>

      <div className="mt-auto px-2 pb-2 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/40">
          Deuda total por cobrar
        </p>
        <p className="text-xl font-bold tracking-tight text-primary">
          {formatCurrency(totalDebtSum)}
        </p>
      </div>
    </aside>
  );
}
