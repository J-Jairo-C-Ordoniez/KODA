'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircleIcon, PlusIcon, WalletIcon } from '@phosphor-icons/react';
import { CustomerFilterType } from '@/features/dashboard/business/hooks/useCustomers';
import { formatCurrency } from '@/lib/formatters';
import Button from '@/shared/components/Button';

interface SidebarProps {
  onCloseMobile?: () => void;
  filterType: CustomerFilterType;
  onFilterChange: (type: CustomerFilterType) => void;
  onNewCustomer: () => void;
  totalWithDebt: number;
  totalPaid: number;
  totalDebtSum: number;
}

export default function Sidebar({ onCloseMobile, filterType, onFilterChange, onNewCustomer, totalWithDebt, totalPaid, totalDebtSum }: SidebarProps) {
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
      className="flex h-full w-full flex-col overflow-y-auto bg-background px-2 py-4 md:px-4 xl:px-10"
    >
      <header className="mb-6 flex flex-col items-start gap-3 px-5">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-primary">Clientes</h2>
        {filterType !== 'all' && (
          <Button variant="secondary" size="sm" onClick={() => handleSelectFilter('all')}>
            Ver todos
          </Button>
        )}
      </header>

      <nav className="flex flex-col gap-7">
        <section className="flex flex-col gap-1 pt-4">
          <h3 className="mb-2 px-5 text-sm font-medium uppercase leading-tight tracking-tight text-primary/40">
            Acciones
          </h3>
          <button
            onClick={() => {
              onNewCustomer();
              triggerMobileClose();
            }}
            className="gsap-menu-item flex items-center gap-5 rounded-full px-5 py-3.5 text-left text-xl font-medium leading-tight tracking-tight text-primary/80 transition-colors duration-200 hover:bg-primary/5 hover:text-primary cursor-pointer"
          >
            <PlusIcon size={28} weight="regular" />
            Nuevo cliente
          </button>
        </section>

        <section className="flex flex-col gap-1 pt-4">
          <h3 className="mb-2 px-5 text-sm font-medium uppercase leading-tight tracking-tight text-primary/40">
            Filtros
          </h3>

          <button
            onClick={() => handleSelectFilter('with-debt')}
            className={`gsap-menu-item flex items-center justify-between rounded-full px-5 py-3.5 text-xl font-medium leading-tight tracking-tight transition-colors duration-200 cursor-pointer ${filterType === 'with-debt'
              ? 'bg-primary/10 text-primary'
              : 'text-primary/65 hover:bg-primary/5 hover:text-primary'
              }`}
          >
            <div className="flex items-center gap-5">
              <WalletIcon size={28} weight={filterType === 'with-debt' ? 'fill' : 'regular'} />
              <span>Con Deuda</span>
            </div>
            <span className="text-sm font-medium text-primary/50">{totalWithDebt}</span>
          </button>

          <button
            onClick={() => handleSelectFilter('paid')}
            className={`gsap-menu-item flex items-center justify-between rounded-full px-5 py-3.5 text-xl font-medium leading-tight tracking-tight transition-colors duration-200 cursor-pointer ${filterType === 'paid'
              ? 'bg-primary/10 text-primary'
              : 'text-primary/65 hover:bg-primary/5 hover:text-primary'
              }`}
          >
            <div className="flex items-center gap-5">
              <CheckCircleIcon size={28} weight={filterType === 'paid' ? 'fill' : 'regular'} />
              <span>Al Día</span>
            </div>
            <span className="text-sm font-medium text-primary/50">
              {totalPaid}
            </span>
          </button>

        </section>
      </nav>

      <div className="mt-auto flex items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-background/80 p-4">
        <div>
          <p className="text-sm font-medium leading-relaxed text-foreground/60">Deuda total por cobrar</p>
          <p className="text-2xl font-bold leading-tight tracking-tight text-primary">
            {formatCurrency(totalDebtSum)}
          </p>
        </div>
        <WalletIcon size={26} weight="regular" className="shrink-0 text-primary/40" />
      </div>
    </aside>
  );
}
