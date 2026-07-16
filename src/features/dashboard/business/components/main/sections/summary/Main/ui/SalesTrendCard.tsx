import { BarChart3 } from 'lucide-react';
import { SalesChart } from './SalesChart';
import { TrendPoint } from '@/features/dashboard/business/hooks/useTabStats';

interface SalesTrendCardProps {
  salesTrend?: TrendPoint[];
}

export function SalesTrendCard({ salesTrend }: SalesTrendCardProps) {
  return (
    <article className="ov-chart lg:col-span-2 bg-background-card border border-primary/8 p-5 rounded-2xl">
      <header className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-background">
          <BarChart3
            size={20}
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-primary tracking-tight">
            Tendencia de ventas
          </h2>
          <p className="text-primary/50 text-xs font-medium tracking-tight mt-1">
            Últimos 30 días
          </p>
        </div>
      </header>

      <div className="min-h-[260px]">
        {salesTrend && salesTrend.length > 0 ? (
          <SalesChart data={salesTrend} />
        ) : (
          <div
            className="flex flex-col items-center justify-center h-[260px] space-y-3 text-primary"
            aria-label="Sin datos disponibles"
          >
            <BarChart3
              size={36}
              aria-hidden="true"
            />

            <p className="text-sm font-medium text-primary/60 tracking-tight">
              Aún no hay datos suficientes
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
