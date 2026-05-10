import { useState, useCallback } from 'react';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [stats, setStats] = useState({ mrr: 0, activeCount: 0, pastDueCount: 0 });
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    try {
      const [subsRes, statsRes, plansRes] = await Promise.all([
        fetch('/api/subscriptions'),
        fetch('/api/subscriptions/stats'),
        fetch('/api/plans')
      ]);

      const subsData = await subsRes.json();
      const statsData = await statsRes.json();
      const plansData = await plansRes.json();

      if (subsData.success) {
        setSubscriptions(subsData.data || []);
      }
      
      if (statsData.success) {
        setStats(statsData.data || { mrr: 0, activeCount: 0, pastDueCount: 0 });
      }

      if (plansData.success) {
        setPlans(plansData.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Error cargando suscripciones');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerPayment = async (data: { subscriptionId: string; amount: number; method: string; manualEndDate?: string }) => {
    try {
      const res = await fetch('/api/subscriptions/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (resData.success) {
        fetchSubscriptions();
        return { success: true };
      }
      return { success: false, error: resData.error };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const assignPlan = async (data: { tenantId: string; planId: string; amount: number; method: string; manualEndDate?: string; isFreeTrial?: boolean }) => {
    try {
      const res = await fetch('/api/subscriptions/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (resData.success) {
        fetchSubscriptions();
        return { success: true };
      }
      return { success: false, error: resData.error };
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
