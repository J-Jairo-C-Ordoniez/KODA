export interface SalePeriod {
  totalRevenue: number;
  totalOrders: number;
}

export interface TrendPoint {
  date: string;
  revenue: number;
}

export interface PaymentsToday {
  totalRevenue: number;
  totalPayments: number;
}

export interface SalesTodayItems {
  totalItems: number;
}

export interface UrgentAlerts {
  zeroStockCount: number;
  severeDebtsCount: number;
  total: number;
}

export interface SubscriptionInfo {
  planName: string;
  planPrice: number;
  interval: string;
  status: string;
  endDate: string;
}

export interface SidebarStats {
  salesToday: SalePeriod;
  debtCustomers: { totalCustomersWithDebt: number };
  lowStockItems: { totalLowStockItems: number };
}

export interface GeneralStats {
  salesToday: SalePeriod;
  paymentsToday: PaymentsToday;
  urgentAlerts: UrgentAlerts;
  salesTrend: TrendPoint[];
}

export interface ProfitPeriod {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  margin: number;
}

export interface Debtor {
  id: string;
  name: string;
  phone?: string;
  totalDebt: number;
  daysPending: number;
  isOverdue: boolean;
}

export interface FinanceStats {
  salesMonth: SalePeriod;
  profitMonth: ProfitPeriod;
  debtCustomers: { totalDebt: number; totalCustomersWithDebt: number };
  topDebtors: Debtor[];
}

export interface InventoryMetrics {
    totalPhysicalItems: number;
    totalInvestedCapital: number;
    criticalStockItems: number;
}

export interface TopVariant {
    variantId: string;
    productName: string;
    size: string;
    stock: number;
    totalSold: number;
}

export interface StagnantVariant {
    variantId: string;
    productName: string;
    size: string;
    stock: number;
    daysWithoutSale: number;
}

export interface OutOfStockVariant {
    variantId: string;
    productName: string;
    size: string;
    sku: string;
}

export interface InventoryStats {
    metrics: InventoryMetrics;
    topSales: TopVariant[];
    stagnantItems: StagnantVariant[];
    outOfStockItems: OutOfStockVariant[];
}

export interface StoreProfile {
    tenantId: string;
    businessName: string;
    description: string | null;
    whatsApp: string;
    slug: string;
    logo: string | null;
}

export interface StoreSubscription {
    status: 'active' | 'pastDue' | 'canceled' | 'noVerify' | 'mora' | 'suspended';
    startDate: Date | string;
    endDate: Date | string;
    plan: {
        name: string;
        price: number;
        interval: string;
        features: string[];
    };
}

export interface StoreDataStats {
    profile: StoreProfile;
    subscription: StoreSubscription | null;
}

export async function fetchSidebarStatsApi(tenantId?: string): Promise<SidebarStats> {
  const url = tenantId ? `/api/dashboard/sidebar?tenantId=${tenantId}` : '/api/dashboard/sidebar';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Error al cargar las métricas del menú lateral");
  }

  return data.data;
}

export async function fetchGeneralStatsApi(tenantId?: string): Promise<GeneralStats> {
  const url = tenantId ? `/api/dashboard/general?tenantId=${tenantId}` : '/api/dashboard/general';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Error al cargar el resumen general");
  }

  return data.data;
}

export async function fetchFinanceStatsApi(tenantId?: string): Promise<FinanceStats> {
  const url = tenantId ? `/api/dashboard/finances?tenantId=${tenantId}` : '/api/dashboard/finances';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Error al cargar las métricas de finanzas");
  }

  return data.data;
}

export async function fetchInventoryStatsApi(tenantId?: string): Promise<InventoryStats> {
  const url = tenantId ? `/api/dashboard/inventory?tenantId=${tenantId}` : '/api/dashboard/inventory';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Error al cargar las métricas de inventario");
  }

  return data.data;
}

export async function fetchStoreDataStatsApi(tenantId?: string): Promise<StoreDataStats> {
  const url = tenantId ? `/api/dashboard/config?tenantId=${tenantId}` : '/api/dashboard/config';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || "Error al cargar los datos de configuración");
  }

  return data.data;
}