'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Wallet, CheckCircle2, Users } from 'lucide-react';
import SidebarHeader from './ui/SidebarHeader';
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

export default function Sidebar({
  onCloseMobile,
  filterType,
  onFilterChange,
  onNewCustomer,
  totalWithDebt,
  totalPaid,
  totalCustomers,
  totalDebtSum,
}: SidebarProps) {
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
      <SidebarHeader
        onNewCustomer={() => {
          onNewCustomer();
          triggerMobileClose();
        }}
      />

      <nav className="space-y-1">
        <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest px-3 mb-2">
          Filtros de Lista
        </p>

        <button
          onClick={() => handleSelectFilter('with-debt')}
          className={`gsap-menu-item w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'with-debt'
              ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20 shadow-xs'
              : 'hover:bg-foreground-muted/40 text-primary/70'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Wallet size={16} className={filterType === 'with-debt' ? 'text-amber-600' : 'text-primary/40'} />
            <span>Con Deuda</span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-700">
            {totalWithDebt}
          </span>
        </button>

        <button
          onClick={() => handleSelectFilter('paid')}
          className={`gsap-menu-item w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'paid'
              ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shadow-xs'
              : 'hover:bg-foreground-muted/40 text-primary/70'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={16} className={filterType === 'paid' ? 'text-emerald-600' : 'text-primary/40'} />
            <span>Al Día</span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-700">
            {totalPaid}
          </span>
        </button>

        <button
          onClick={() => handleSelectFilter('all')}
          className={`gsap-menu-item w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-primary text-background shadow-xs'
              : 'hover:bg-foreground-muted/40 text-primary/70'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Users size={16} className={filterType === 'all' ? 'text-background' : 'text-primary/40'} />
            <span>Todos los Clientes</span>
          </div>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
              filterType === 'all' ? 'bg-background/20 text-background' : 'bg-foreground-muted/50 text-primary/70'
            }`}
          >
            {totalCustomers}
          </span>
        </button>
      </nav>

      {/* Debt Summary Box */}
      <div className="mt-auto p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700/70">
          Deuda Total por Cobrar
        </p>
        <p className="text-xl font-bold tracking-tight text-amber-800">
          {formatCurrency(totalDebtSum)}
        </p>
        <p className="text-[11px] text-amber-700/80 leading-snug">
          Dinero circulante pendiente en la calle ({totalWithDebt} cliente{totalWithDebt !== 1 ? 's' : ''})
        </p>
      </div>
    </aside>
  );
}
