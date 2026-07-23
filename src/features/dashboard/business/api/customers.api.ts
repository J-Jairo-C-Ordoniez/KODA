export interface Customer {
  customerId: string;
  tenantId?: string;
  name: string;
  phone: string;
  totalDebt: number;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    sales: number;
    payments: number;
  };
}

export interface TimelineEvent {
  id: string;
  type: 'charge' | 'abono';
  amount: number;
  paymentMethod: string;
  createdAt: string;
  note?: string;
  balanceAfter: number;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface CustomerHistoryData {
  customer: Customer;
  timeline: TimelineEvent[];
}

export interface SaveCustomerDto {
  name: string;
  phone: string;
}

export interface RegisterPaymentDto {
  amount: number;
  paymentMethod: 'cash' | 'transfer';
  note?: string;
}

const BASE = (tenantId: string) => `/api/${tenantId}/customers`;

export async function fetchCustomersApi(tenantId: string): Promise<Customer[]> {
  const response = await fetch(`${BASE(tenantId)}?limit=100`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al obtener clientes');
  }

  return data.data.map((c: any) => ({
    ...c,
    totalDebt: Number(c.totalDebt),
  }));
}

export async function fetchCustomerHistoryApi(tenantId: string, customerId: string): Promise<CustomerHistoryData> {
  const response = await fetch(`${BASE(tenantId)}/${customerId}/history`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al obtener el historial del cliente');
  }

  return data.data;
}

export async function saveCustomerApi(
  tenantId: string,
  customerData: SaveCustomerDto,
  customerId?: string
): Promise<Customer> {
  const url = customerId ? `${BASE(tenantId)}/${customerId}` : BASE(tenantId);
  const method = customerId ? 'PATCH' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al guardar cliente');
  }

  return data.data;
}

export async function registerPaymentApi(
  tenantId: string,
  customerId: string,
  paymentData: RegisterPaymentDto
): Promise<any> {
  const response = await fetch(`${BASE(tenantId)}/${customerId}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al registrar abono');
  }

  return data.data;
}

export async function deleteCustomerApi(tenantId: string, customerId: string): Promise<void> {
  const response = await fetch(`${BASE(tenantId)}/${customerId}`, { method: 'DELETE' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al eliminar cliente');
  }
}
