/**
 * Cliente de API para el módulo de Catálogo (productos, categorías, variantes)
 */

export async function fetchCatalogDataApi(tenantId: string): Promise<{ products: any[]; categories: any[] }> {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`/api/${tenantId}/catalog/products`, { cache: 'no-store' }),
    fetch(`/api/${tenantId}/catalog/categories`, { cache: 'no-store' }),
  ]);
  const [productsData, categoriesData] = await Promise.all([productsRes.json(), categoriesRes.json()]);
  return {
    products: productsData.success ? productsData.data || [] : [],
    categories: categoriesData.success ? categoriesData.data || [] : [],
  };
}

export async function saveProductApi(tenantId: string, productData: any, productId?: string): Promise<any> {
  const url = productId ? `/api/${tenantId}/catalog/products/${productId}` : `/api/${tenantId}/catalog/products`;
  const method = productId ? 'PATCH' : 'POST';
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al guardar el producto');
  return data;
}

export async function deleteProductApi(tenantId: string, productId: string): Promise<void> {
  const response = await fetch(`/api/${tenantId}/catalog/products/${productId}`, { method: 'DELETE' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al eliminar el producto');
}

export async function saveVariantApi(tenantId: string, variantData: any, variantId?: string): Promise<any> {
  const url = variantId ? `/api/${tenantId}/catalog/variants/${variantId}` : `/api/${tenantId}/catalog/variants`;
  const method = variantId ? 'PATCH' : 'POST';
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variantData),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al guardar la variante');
  return data;
}

export async function deleteVariantApi(tenantId: string, variantId: string): Promise<void> {
  const response = await fetch(`/api/${tenantId}/catalog/variants/${variantId}`, { method: 'DELETE' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al eliminar la variante');
}

export async function updateVariantStockApi(tenantId: string, variantId: string, stock: number): Promise<any> {
  const response = await fetch(`/api/${tenantId}/catalog/variants/${variantId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stock }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al actualizar el stock');
  return data;
}

export async function saveCategoryApi(tenantId: string, categoryData: any, categoryId?: string): Promise<any> {
  const url = categoryId ? `/api/${tenantId}/catalog/categories/${categoryId}` : `/api/${tenantId}/catalog/categories`;
  const method = categoryId ? 'PATCH' : 'POST';
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al guardar la categoría');
  return data;
}

export async function deleteCategoryApi(tenantId: string, categoryId: string): Promise<void> {
  const response = await fetch(`/api/${tenantId}/catalog/categories/${categoryId}`, { method: 'DELETE' });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error || 'Error al eliminar la categoría');
}
