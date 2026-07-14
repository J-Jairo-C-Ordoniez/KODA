/**
 * Cliente de API para el módulo de Ventas (Sales)
 */

export async function fetchSalesDataApi(tenantId: string, pageNum = 1): Promise<{ sales: any[]; variants: any[] }> {
  const salesUrl = `/api/${tenantId}/sales?page=${pageNum}&limit=12`;
  const variantsUrl = `/api/${tenantId}/catalog/variants`;

  const [salesRes, variantsRes] = await Promise.all([
    fetch(salesUrl, { cache: 'no-store' }),
    fetch(variantsUrl, { cache: 'no-store' })
  ]);

  if (!salesRes.ok || !variantsRes.ok) {
    const failedRes = !salesRes.ok ? salesRes : variantsRes;
    let errorMessage = 'Error en el servidor';

    try {
      const clone = failedRes.clone();
      try {
        const errorJson = await clone.json();
        errorMessage = errorJson.error || errorMessage;
      } catch (e) {
        const textError = await failedRes.text();
        if (textError.includes('<!DOCTYPE html>')) {
          errorMessage = `Error ${failedRes.status}: El servidor no respondió correctamente`;
        } else {
          errorMessage = textError.substring(0, 100);
        }
      }
    } catch (cloneError) {
      errorMessage = `Error ${failedRes.status}`;
    }

    throw new Error(errorMessage);
  }

  const contentTypeSales = salesRes.headers.get("content-type");
  const contentTypeVariants = variantsRes.headers.get("content-type");

  if (!contentTypeSales?.includes("application/json") || !contentTypeVariants?.includes("application/json")) {
    throw new Error('El servidor no devolvió JSON');
  }

  const salesJson = await salesRes.json();
  const variantsJson = await variantsRes.json();

  if (!salesJson.success) {
    throw new Error(salesJson.error || 'Error al cargar ventas');
  }
  if (!variantsJson.success) {
    throw new Error(variantsJson.error || 'Error al cargar variantes');
  }

  return {
    sales: salesJson.data || [],
    variants: variantsJson.data || [],
  };
}

export async function saveSaleApi(tenantId: string, data: any): Promise<any> {
  const res = await fetch(`/api/${tenantId}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'No se pudo registrar la venta');
  }
  return json.data;
}
