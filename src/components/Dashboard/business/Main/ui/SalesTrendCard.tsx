import { BarChart3 } from 'lucide-react';
import { SalesChart } from './SalesChart';
import { TrendPoint } from '@/hooks/admin/useDashboardStats';

interface SalesTrendCardProps {
  salesTrend?: TrendPoint[];
}

export function SalesTrendCard({ salesTrend }: SalesTrendCardProps) {
  return (
    <article className="ov-chart lg:col-span-2 bg-[#181818] border border-[#262626] p-6 rounded-2xl">
      <header className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground-muted shrink-0">
          <BarChart3 size={18} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Tendencia de ventas</h2>
          <p className="text-foreground-muted text-xs font-medium tracking-tight mt-0.5">
            Últimos 30 días
          </p>
        </div>
      </header>

      <div className="min-h-[260px]">
        {salesTrend && salesTrend.length > 0 ? (
          <SalesChart data={salesTrend} />
        ) : (
          <div
            className="flex flex-col items-center justify-center h-[260px] opacity-20 space-y-3"
            aria-label="Sin datos disponibles"
          >
            <BarChart3 size={36} className="text-foreground/60" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground/60 tracking-tight">
              Aún no hay datos suficientes
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
