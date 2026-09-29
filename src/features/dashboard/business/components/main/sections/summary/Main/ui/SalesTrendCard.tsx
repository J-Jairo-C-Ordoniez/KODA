import { ChartBarIcon } from '@phosphor-icons/react';
import SalesChart from '@/features/dashboard/business/components/main/sections/summary/Main/ui/SalesChart';
import { TrendPoint } from '@/features/dashboard/business/api/dashboard.api';

interface SalesTrendCardProps {
  salesTrend?: TrendPoint[];
}

export default function SalesTrendCard({ salesTrend }: SalesTrendCardProps) {
  return (
    <article className="ov-chart lg:col-span-2 rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-4 sm:p-6 flex flex-col justify-center">
      <header className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <ChartBarIcon
            size={24}
            weight="fill"
            aria-hidden="true"
          />
        </div>

        <hgroup>
          <h2 className="text-xl tracking-tight leading-tight font-bold">
            Tendencia de ventas
          </h2>
          <p className="text-base sm:text-md font-normal leading-relaxed text-foreground/75">
            Últimos 30 días
          </p>
        </hgroup>
      </header>

      <div className="min-h-60">
        {salesTrend && salesTrend.length > 0 ? (
          <SalesChart data={salesTrend} />
        ) : (
          <div
            className="flex flex-col items-center justify-center h-60 space-y-2 text-primary"
            aria-label="Sin datos disponibles"
          >
            <ChartBarIcon
              size={32}
              weight="fill"
              className="text-primary/50"
              aria-hidden="true"
            />

            <p className="text-base sm:text-md font-normal leading-relaxed text-foreground/75">
              Aún no hay datos suficientes
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
