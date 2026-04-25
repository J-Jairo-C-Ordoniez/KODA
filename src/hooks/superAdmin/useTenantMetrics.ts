import { useState, useCallback } from 'react';
import { Store, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

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

      if (activeData.error || mrrData.error || onboardingData.error || churnCountData.error || churnRateData.error) {
        setError('Error al cargar las métricas del ecosistema');
        return;
      }

      const cop = (val: number) => new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0
      }).format(val);
      const pct = (val: number) => new Intl.NumberFormat('es-CO', {
        style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1
      }).format(val);

      setMetrics([
        {
          label: 'Negocios Activos',
          value: `${activeData}`.padStart(2, '0'),
          icon: Store,
        },
        {
          label: 'MRR (Ingresos Mensuales)',
          value: cop(mrrData),
          icon: DollarSign,
          color: mrrData < 50000 ? 'bg-red-50 text-red-500' : mrrData > 1000000 ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600',
        },
        {
          label: 'Tasa de Conversión',
          value: pct(onboardingData.percentage),
          icon: onboardingData.percentage < 30 ? TrendingDown : TrendingUp,
          color: onboardingData.percentage < 30 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600',
        },
        {
          label: 'Churn Mensual (Bajas)',
          value: `${churnCountData}`.padStart(2, '0'),
          icon: churnCountData < 5 ? TrendingUp : TrendingDown,
          color: churnCountData < 5 ? 'bg-green-50 text-green-600' : churnCountData > 10 ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600',
        },
        {
          label: 'Churn Rate',
          value: pct(churnRateData),
          icon: churnRateData < 5 ? TrendingUp : TrendingDown,
          color: churnRateData < 5 ? 'bg-green-50 text-green-600' : churnRateData > 10 ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600',
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
