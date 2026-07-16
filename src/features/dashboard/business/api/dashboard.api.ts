/**
 * Cliente de API para el módulo de Dashboard con llamadas fragmentadas
 */

export async function fetchSidebarStatsApi(tenantId?: string): Promise<any> {
  const url = tenantId ? `/api/dashboard/sidebar?tenantId=${tenantId}` : '/api/dashboard/sidebar';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error);
  return data.data;
}

export async function fetchGeneralStatsApi(tenantId?: string): Promise<any> {
  const url = tenantId ? `/api/dashboard/general?tenantId=${tenantId}` : '/api/dashboard/general';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error);
  return data.data;
}

export async function fetchFinanceStatsApi(tenantId?: string): Promise<any> {
  const url = tenantId ? `/api/dashboard/finances?tenantId=${tenantId}` : '/api/dashboard/finances';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error);
  return data.data;
}

export async function fetchConfigStatsApi(tenantId?: string): Promise<any> {
  const url = tenantId ? `/api/dashboard/config?tenantId=${tenantId}` : '/api/dashboard/config';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error);
  return data.data;
}