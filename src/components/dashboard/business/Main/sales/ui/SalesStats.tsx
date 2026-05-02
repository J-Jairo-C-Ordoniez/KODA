import { ArrowUpRight } from 'lucide-react';

interface SalesStatsProps {
  sales: any[];
  totalRevenue: number;
}

export function SalesStats({ sales, totalRevenue }: SalesStatsProps) {
  if (sales.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-navy rounded-[32px] p-8 text-white shadow-xl shadow-navy/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
        <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Ingresos Totales</p>
        <h4 className="text-3xl font-black">${totalRevenue.toLocaleString('es-ES')}</h4>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
          <ArrowUpRight size={14} /> +12.5% este mes
        </div>
      </div>
      <div className="bg-background border border-foreground/5 rounded-[32px] p-8 space-y-4">
        <p className="text-xs font-black uppercase tracking-widest text-secondary">Ventas Totales</p>
        <h4 className="text-3xl font-black text-primary">{sales.length}</h4>
        <p className="text-xs font-medium text-secondary">Transacciones completadas</p>
      </div>
      <div className="bg-background border border-foreground/5 rounded-[32px] p-8 space-y-4">
        <p className="text-xs font-black uppercase tracking-widest text-secondary">Valor Promedio</p>
        <h4 className="text-3xl font-black text-primary">
          ${(totalRevenue / (sales.length || 1)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
        </h4>
        <p className="text-xs font-medium text-secondary">Valor promedio del ticket</p>
      </div>
    </div>
  );
}
