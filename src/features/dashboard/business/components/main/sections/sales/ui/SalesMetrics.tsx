'use client';

import { ShoppingCart, Wallet, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import type { SalesPOSMetrics } from '@/features/dashboard/business/api/sales.api';

interface SalesMetricsProps {
  metrics: SalesPOSMetrics;
}

export default function SalesMetrics({ metrics }: SalesMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Ingresos del Día */}
      <article className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group">
        <header className="flex justify-between items-start mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-background group-hover:scale-105 transition-transform duration-300">
            <ShoppingCart size={20} aria-hidden="true" />
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-lg border text-primary bg-primary/2 border-primary/8">
            {metrics.salesCountToday} venta{metrics.salesCountToday !== 1 ? 's' : ''} hoy
          </span>
        </header>
        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
            Ingresos del día
          </h3>
          <p className="text-2xl font-bold tracking-tight text-primary">
            {formatCurrency(metrics.revenueToday)}
          </p>
        </div>
      </article>

      {/* 2. Ventas por Método */}
      <article className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group">
        <header className="flex justify-between items-start mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform duration-300">
            <Wallet size={20} aria-hidden="true" />
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-lg border text-emerald-700 bg-emerald-50 border-emerald-100">
            Métodos de pago
          </span>
        </header>
        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
            Ventas registradas
          </h3>
          <div className="flex items-center gap-3 text-xs font-semibold text-primary/70 mt-1">
            <span>Efectivo: <strong className="text-primary">{formatCurrency(metrics.paymentMethodBreakdown.cash)}</strong></span>
            <span>·</span>
            <span>Transf: <strong className="text-primary">{formatCurrency(metrics.paymentMethodBreakdown.transfer)}</strong></span>
          </div>
        </div>
      </article>

      {/* 3. Cuentas por Cobrar (El Fiado) */}
      <article className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group">
        <header className="flex justify-between items-start mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 text-amber-700 group-hover:scale-105 transition-transform duration-300">
            <Users size={20} aria-hidden="true" />
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-lg border text-amber-700 bg-amber-50 border-amber-200">
            Fiado / Deudas
          </span>
        </header>
        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
            Por cobrar (Fiados)
          </h3>
          <p className="text-2xl font-bold tracking-tight text-amber-700">
            {formatCurrency(metrics.totalAccountsReceivable)}
          </p>
        </div>
      </article>
    </div>
  );
}
