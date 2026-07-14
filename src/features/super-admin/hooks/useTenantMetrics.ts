import { useState, useCallback } from 'react';
import { Store, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { fetchTenantMetricsApi } from '@/features/super-admin/api/super-admin.api';

interface TenantMetric {
  label: string;
  value: string;
  icon: any;
  color?: string;
}

export function useTenantMetrics() {
  const [metrics, setMetrics] = useState<TenantMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { activeCount, mrr, onboardingPercentage, churnCount, churnRate } = await fetchTenantMetricsApi();

      setMetrics([
        {
          label: 'Negocios Activos',
          value: `${activeCount}`.padStart(2, '0'),
          icon: Store,
          color: 'bg-contrast/10 text-contrast'
        },
        {
          label: 'MRR (Ingresos Mensuales)',
          value: formatCurrency(mrr),
          icon: DollarSign,
          color: mrr < 50000 ? 'bg-red-500/10 text-red-400' : mrr > 1000000 ? 'bg-[#00C896]/10 text-[#00C896]' : 'bg-yellow-500/10 text-yellow-400',
        },
        {
          label: 'Tasa de Conversión',
          value: formatPercentage(onboardingPercentage / 100),
          icon: onboardingPercentage < 30 ? TrendingDown : TrendingUp,
          color: onboardingPercentage < 30 ? 'bg-red-500/10 text-red-400' : 'bg-[#00C896]/10 text-[#00C896]',
        },
        {
          label: 'Churn Mensual (Bajas)',
          value: `${churnCount}`.padStart(2, '0'),
          icon: churnCount < 5 ? TrendingUp : TrendingDown,
          color: churnCount < 5 ? 'bg-[#00C896]/10 text-[#00C896]' : churnCount > 10 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400',
        },
        {
          label: 'Churn Rate',
          value: formatPercentage(churnRate / 100),
          icon: churnRate < 5 ? TrendingUp : TrendingDown,
          color: churnRate < 5 ? 'bg-[#00C896]/10 text-[#00C896]' : churnRate > 10 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400',
        },
      ]);
    } catch (err) {
      setError('Error de conexión al cargar métricas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { metrics, isLoading, error, fetchMetrics };
}

