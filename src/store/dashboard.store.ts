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
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  fetchDashboardData: () => Promise<void>;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  isLoading: true,
  error: null,
  isSidebarOpen: false,

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

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
