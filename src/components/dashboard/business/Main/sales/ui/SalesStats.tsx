'use client';

import { ArrowUpRight, DollarSign, ShoppingBag, CreditCard } from 'lucide-react';

interface SalesStatsProps {
  sales: any[];
  totalRevenue: number;
}

export function SalesStats({ sales, totalRevenue }: SalesStatsProps) {
  if (sales.length === 0) return null;

  const averageValue = totalRevenue / (sales.length || 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Ingresos Totales */}
      <div className="bg-contrast rounded-[32px] p-6 text-white shadow-xl shadow-contrast/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <DollarSign size={20} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Ingresos Totales</p>
        </div>
        <h4 className="text-3xl font-black tracking-tight">${totalRevenue.toLocaleString('es-ES')}</h4>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-black bg-white/15 w-fit px-3 py-1.5 rounded-full border border-white/10">
          <ArrowUpRight size={12} /> +12.5% ESTE MES
        </div>
      </div>

      {/* Ventas Totales */}
      <div className="bg-background-elevated border border-foreground/8 rounded-[32px] p-6 group hover:border-contrast/30 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-contrast group-hover:bg-contrast/10 transition-colors">
            <ShoppingBag size={20} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Ventas Totales</p>
        </div>
        <h4 className="text-3xl font-black text-primary tracking-tight">{sales.length}</h4>
        <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mt-2">Transacciones completadas</p>
      </div>

      {/* Valor Promedio */}
      <div className="bg-background-elevated border border-foreground/8 rounded-[32px] p-6 group hover:border-contrast/30 transition-all sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-contrast group-hover:bg-contrast/10 transition-colors">
            <CreditCard size={20} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Valor Promedio</p>
        </div>
        <h4 className="text-3xl font-black text-primary tracking-tight">
          ${averageValue.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
        </h4>
        <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mt-2">Ticket promedio por venta</p>
      </div>
    </div>
  );
}
