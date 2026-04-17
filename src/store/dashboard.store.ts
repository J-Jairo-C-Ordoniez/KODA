import { create } from 'zustand';

interface SalesMetric {
  revenue: number;
  count: number;
}

interface SalesPeriods {
  day: SalesMetric;
  week: SalesMetric;
  month: SalesMetric;
}

interface InventoryStats {
  totalStock: number;
  lowStockItems: any[];
}

interface DashboardStats {
  sales: {
    periods: SalesPeriods;
    totalCount: number;
  };
  inventory: InventoryStats;
  topProducts: any[];
}

interface DashboardStore {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  isLoading: true,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/dashboard/stats');
      const json = await response.json();

      if (json.success) {
        set({ stats: json.data, isLoading: false });
      } else {
        set({ error: json.error, isLoading: false });
      }
    } catch (err: unknown) {
      set({ error: (err as Error).message, isLoading: false });
    }
  }
}));

export default useDashboardStore;
