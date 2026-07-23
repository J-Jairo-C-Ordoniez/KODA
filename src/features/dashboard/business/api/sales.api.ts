export interface CreateSaleItemDto {
  variantId: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateSaleDto {
  items: CreateSaleItemDto[];
  total?: number;
  paymentMethod: 'cash' | 'transfer' | 'debt';
  customerId?: string | null;
  notes?: string;
}

const BASE = (tenantId: string) => `/api/${tenantId}`;

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
