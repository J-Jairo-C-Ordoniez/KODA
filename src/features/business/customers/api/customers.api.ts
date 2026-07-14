/**
 * Cliente de API para el módulo de Clientes (Customers)
 */

export async function fetchCustomersApi(tenantId: string): Promise<any[]> {
  const response = await fetch(`/api/${tenantId}/customers`, { cache: 'no-store' });
  
  if (!response.ok) {
    let errorMessage = 'Error al cargar clientes';
    const clone = response.clone();
    try {
      const errorJson = await clone.json();
      errorMessage = errorJson.error || errorMessage;
    } catch (e) {
      console.error('Error no-JSON:', await response.text());
    }
    throw new Error(errorMessage);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error || 'Error al cargar clientes');
  }
  return json.data || [];
}

export async function saveCustomerApi(tenantId: string, data: { name: string; phone: string }): Promise<any> {
  const response = await fetch(`/api/${tenantId}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al crear cliente');
  }
  return json.data;
}

export async function registerCustomerPaymentApi(tenantId: string, customerId: string, data: { amount: number; paymentMethod: string; note?: string }): Promise<any> {
  const response = await fetch(`/api/${tenantId}/customers/${customerId}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al registrar abono');
  }
  return json.data;
}
