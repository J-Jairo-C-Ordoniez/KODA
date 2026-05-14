'use client';

import { useState, useCallback } from 'react';

export interface SalePeriod {
  totalRevenue: number;
  totalOrders: number;
}

export interface TrendPoint {
  date: string;
  revenue: number;
}

export interface SubscriptionInfo {
  planName: string;
  planPrice: number;
  interval: string;
  status: string;
  endDate: string;
}

export interface DashboardStats {
  salesToday: SalePeriod;
  salesMonth: SalePeriod;
  debtCustomers: { totalCustomersWithDebt: number };
  lowStockItems: { totalLowStockItems: number };
  salesTrend: TrendPoint[];
  subscription: SubscriptionInfo | null;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/stats');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      } else {
        setError(json.error || 'Error al cargar las estadísticas');
      }
    } catch {
      setError('Error de conexión al servidor');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stats, isLoading, error, fetchStats };
}
