import { useState, useCallback } from 'react';
import { fetchSubscriptionsApi, registerPaymentApi, assignPlanApi } from '@/features/super-admin/api/super-admin.api';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [stats, setStats] = useState({ mrr: 0, activeCount: 0, pastDueCount: 0 });
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    try {
      const { subs, stats: statsData, plans: plansData } = await fetchSubscriptionsApi();
      setSubscriptions(subs);
      setStats(statsData);
      setPlans(plansData);
    } catch (err: any) {
      setError(err.message || 'Error cargando suscripciones');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerPayment = async (data: { subscriptionId: string; amount: number; method: string; manualEndDate?: string }) => {
    try {
      await registerPaymentApi(data);
      fetchSubscriptions();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const assignPlan = async (data: { tenantId: string; planId: string; amount: number; method: string; manualEndDate?: string; isFreeTrial?: boolean }) => {
    try {
      await assignPlanApi(data);
      fetchSubscriptions();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return {
    subscriptions,
    stats,
    plans,
    isLoading,
    error,
    fetchSubscriptions,
    registerPayment,
    assignPlan
  };
}

