export type GenderType = 'hombre' | 'mujer' | 'mixto';

export interface Category {
  categoryId: string;
  tenantId: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  productId: string;
  tenantId: string;
  categoryId: string;
  category?: Category;
  name: string;
  description: string;
  gender: GenderType;
  isPublic: boolean;
  variants?: Variant[];
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  variantId: string;
  productId: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  cost: number;
  popularity: number;
  isActive: boolean;
  stock?: number;
  images?: Array<{ isPrimary: boolean; content: string }>;
  inventories?: Array<{ stock: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogData {
  products: Product[];
  categories: Category[];
}

export interface SaveCategoryDto {
  name: string;
  description?: string;
  icon?: string;
}

export interface SaveProductDto {
  name: string;
  categoryId: string;
  description: string;
  gender: GenderType;
  isPublic?: boolean;
}

export interface SaveVariantDto {
  productId: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  cost: number;
  stock?: number;
  isActive?: boolean;
}


const BASE = (tenantId: string) => `/api/${tenantId}/catalog`;

export async function fetchProductsDataApi(tenantId: string): Promise<CatalogData> {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${BASE(tenantId)}/products`, { cache: 'no-store' }),
    fetch(`${BASE(tenantId)}/categories`, { cache: 'no-store' }),
  ]);

  const [productsData, categoriesData] = await Promise.all([
    productsRes.json(),
    categoriesRes.json(),
  ]);

  return {
    products: productsData.success ? productsData.data || [] : [],
    categories: categoriesData.success ? categoriesData.data || [] : [],
  };
}

export async function saveCategoryApi(
  tenantId: string,
  categoryData: SaveCategoryDto,
  categoryId?: string,
): Promise<Category> {
  const url = categoryId
    ? `${BASE(tenantId)}/categories/${categoryId}`
    : `${BASE(tenantId)}/categories`;
  const method = categoryId ? 'PATCH' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al guardar la categoría');
  }

  return data.data;
}

export async function deleteCategoryApi(tenantId: string, categoryId: string): Promise<void> {
  const response = await fetch(`${BASE(tenantId)}/categories/${categoryId}`, { method: 'DELETE' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al eliminar la categoría');
  }
}

export async function saveProductApi(
  tenantId: string,
  productData: SaveProductDto,
  productId?: string,
): Promise<Product> {
  const url = productId
    ? `${BASE(tenantId)}/products/${productId}`
    : `${BASE(tenantId)}/products`;
  const method = productId ? 'PATCH' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al guardar el producto');
  }

  return data.data;
}

export async function deleteProductApi(tenantId: string, productId: string): Promise<void> {
  const response = await fetch(`${BASE(tenantId)}/products/${productId}`, { method: 'DELETE' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al eliminar el producto');
  }
}

export async function saveVariantApi(
  tenantId: string,
  variantData: SaveVariantDto,
  variantId?: string,
): Promise<Variant> {
  const url = variantId
    ? `${BASE(tenantId)}/variants/${variantId}`
    : `${BASE(tenantId)}/variants`;
  const method = variantId ? 'PATCH' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variantData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al guardar la variante');
  }

  return data.data;
}

export async function deleteVariantApi(tenantId: string, variantId: string): Promise<void> {
  const response = await fetch(`${BASE(tenantId)}/variants/${variantId}`, { method: 'DELETE' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al eliminar la variante');
  }
}

export async function updateVariantStockApi(
  tenantId: string,
  variantId: string,
  stock: number,
): Promise<Variant> {
  const response = await fetch(`${BASE(tenantId)}/variants/${variantId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stock }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al actualizar el stock');
  }

  return data.data;
}
