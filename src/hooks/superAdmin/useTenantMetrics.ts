import { useState, useCallback } from 'react';
import { Store, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/formatters';

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
      const [activeTenantRes, mrrRes, onboardingRes, churnCountRes, churnRateRes] = await Promise.all([
        fetch('/api/tenants/counts?type=active'),
        fetch('/api/tenants/MRR'),
        fetch('/api/tenants/onboarding'),
        fetch('/api/tenants/churn?type=MonthlyChurnCount'),
        fetch('/api/tenants/churn?type=ChurnRate'),
      ]);

      const [activeData, mrrData, onboardingData, churnCountData, churnRateData] = await Promise.all([
        activeTenantRes.json(),
        mrrRes.json(),
        onboardingRes.json(),
        churnCountRes.json(),
        churnRateRes.json(),
      ]);

      if (!activeData.success || !mrrData.success || !onboardingData.success || !churnCountData.success || !churnRateData.success) {
        setError('Error al cargar las métricas del ecosistema');
        return;
      }


      const activeVal = Number(activeData.data) || 0;
      const mrrVal = Number(mrrData.data) || 0;
      const onboardingPercentage = onboardingData.data?.percentage ? Number(onboardingData.data.percentage) : 0;
      const churnCountVal = Number(churnCountData.data) || 0;
      const churnRatePercentage = churnRateData.data ? Number(churnRateData.data) : 0;

      setMetrics([
        {
          label: 'Negocios Activos',
          value: `${activeVal}`.padStart(2, '0'),
          icon: Store,
          color: 'bg-contrast/10 text-contrast'
        },
        {
          label: 'MRR (Ingresos Mensuales)',
          value: formatCurrency(mrrVal),
          icon: DollarSign,
          color: mrrVal < 50000 ? 'bg-red-500/10 text-red-400' : mrrVal > 1000000 ? 'bg-[#00C896]/10 text-[#00C896]' : 'bg-yellow-500/10 text-yellow-400',
        },
        {
          label: 'Tasa de Conversión',
          value: formatPercentage(onboardingPercentage / 100),
          icon: onboardingPercentage < 30 ? TrendingDown : TrendingUp,
          color: onboardingPercentage < 30 ? 'bg-red-500/10 text-red-400' : 'bg-[#00C896]/10 text-[#00C896]',
        },
        {
          label: 'Churn Mensual (Bajas)',
          value: `${churnCountVal}`.padStart(2, '0'),
          icon: churnCountVal < 5 ? TrendingUp : TrendingDown,
          color: churnCountVal < 5 ? 'bg-[#00C896]/10 text-[#00C896]' : churnCountVal > 10 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400',
        },
        {
          label: 'Churn Rate',
          value: formatPercentage(churnRatePercentage / 100),
          icon: churnRatePercentage < 5 ? TrendingUp : TrendingDown,
          color: churnRatePercentage < 5 ? 'bg-[#00C896]/10 text-[#00C896]' : churnRatePercentage > 10 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400',
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
