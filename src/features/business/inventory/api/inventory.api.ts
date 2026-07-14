/**
 * Cliente de API para el módulo de Inventario
 */

export async function fetchInventoryApi(tenantId: string): Promise<any[]> {
  const response = await fetch('/api/inventory', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al obtener el inventario');
  return data.data || [];
}

export async function updateStockApi(variantId: string, stock: number): Promise<any> {
  const response = await fetch('/api/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ variantId, stock: parseInt(stock.toString()) }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al actualizar el stock');
  return data;
}
