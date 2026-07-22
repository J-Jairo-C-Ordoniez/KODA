export interface SalesPOSMetrics {
  revenueToday: number;
  salesCountToday: number;
  paymentMethodBreakdown: {
    cash: number;
    transfer: number;
    card: number;
    debt: number;
  };
  totalAccountsReceivable: number;
}

export interface CustomerSummary {
  customerId: string;
  name: string;
  phone?: string | null;
  totalDebt: number;
}

export interface CreateSaleItemDto {
  variantId: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateSaleDto {
  items: CreateSaleItemDto[];
  paymentMethod: 'cash' | 'transfer' | 'card' | 'debt';
  customerId?: string | null;
  discount?: number;
  notes?: string;
}

const BASE = (tenantId: string) => `/api/${tenantId}`;

export async function fetchSalesMetricsApi(tenantId: string): Promise<SalesPOSMetrics> {
  const response = await fetch(`${BASE(tenantId)}/sales/metrics`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    // Return safe fallbacks if metrics endpoint is not implemented or errors
    return {
      revenueToday: data.data?.revenueToday ?? 0,
      salesCountToday: data.data?.salesCountToday ?? 0,
      paymentMethodBreakdown: data.data?.paymentMethodBreakdown ?? { cash: 0, transfer: 0, card: 0, debt: 0 },
      totalAccountsReceivable: data.data?.totalAccountsReceivable ?? 0,
    };
  }

  return data.data;
}

export async function fetchCustomersApi(tenantId: string): Promise<CustomerSummary[]> {
  const response = await fetch(`${BASE(tenantId)}/customers`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    return [];
  }

  return data.data || [];
}

export async function createSaleApi(tenantId: string, saleData: CreateSaleDto): Promise<any> {
  const response = await fetch(`${BASE(tenantId)}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saleData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al registrar la venta');
  }

  return data.data;
}
