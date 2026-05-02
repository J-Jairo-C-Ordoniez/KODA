import { create } from 'zustand';

interface SalesData {
  totalOrders: number;
  totalRevenue: number;
}

interface DashboardStats {
  salesToday: SalesData;
  salesMonth: SalesData;
  debtCustomers: {
    totalCustomersWithDebt: number;
  };
  lowStockItems: {
    totalLowStockItems: number;
  };
  salesTrend: any[];
}

interface DashboardStore {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
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
