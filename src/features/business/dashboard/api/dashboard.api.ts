/**
 * Cliente de API para el módulo de Dashboard (métricas y resumen del negocio)
 */

export async function fetchDashboardStatsApi(tenantId?: string): Promise<any> {
  const url = tenantId ? `/api/dashboard/stats?tenantId=${tenantId}` : '/api/dashboard/stats';
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al obtener estadísticas');
  }
  return data.data;
}
