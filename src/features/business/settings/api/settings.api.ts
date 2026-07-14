/**
 * Cliente de API para el módulo de Ajustes del Negocio (Settings)
 */

export async function fetchSettingsApi(tenantId: string): Promise<{ tenant: any; aboutUs: any }> {
  const response = await fetch(`/api/${tenantId}/settings`, { cache: 'no-store' });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al cargar la configuración');
  }
  return json.data;
}

export async function updateSettingsApi(tenantId: string, data: any): Promise<any> {
  const response = await fetch(`/api/${tenantId}/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al guardar la configuración');
  }
  return json;
}

export async function uploadLogoApi(tenantId: string, file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('logo', file);
  const response = await fetch(`/api/${tenantId}/settings`, {
    method: 'POST',
    body: formData,
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al subir el logo');
  }
  return json.data;
}
