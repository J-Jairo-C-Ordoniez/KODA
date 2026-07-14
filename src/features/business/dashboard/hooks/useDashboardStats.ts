import { useState, useCallback } from 'react';
import { fetchDashboardStatsApi } from '@/features/business/dashboard/api/dashboard.api';

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

// Nuevos tipos para la Vista General
export interface SalesTodayItems {
  totalItems: number;
}

export interface PaymentsToday {
  totalRevenue: number;
  totalPayments: number;
}

export interface UrgentAlerts {
  zeroStockCount: number;
  severeDebtsCount: number;
  total: number;
}

export interface DashboardStats {
  // Vista General — El pulso de hoy
  salesToday: SalePeriod;
  salesTodayItems: SalesTodayItems;
  paymentsToday: PaymentsToday;
  urgentAlerts: UrgentAlerts;
  salesTrend: TrendPoint[];
  // Métricas globales (otras secciones del resumen)
  salesMonth: SalePeriod;
  debtCustomers: { totalCustomersWithDebt: number };
  lowStockItems: { totalLowStockItems: number };
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
      const data = await fetchDashboardStatsApi();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las estadísticas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stats, isLoading, error, fetchStats };
}

