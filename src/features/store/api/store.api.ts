export interface FetchProductsParams {
  tenantId: string;
  category?: string;
  color?: string;
  gender?: string;
  search?: string;
  limit?: number;
}

export const storeApi = {
  async getTenantBySlug(slug: string) {
    const res = await fetch(`/api/tenants/slug?slug=${encodeURIComponent(slug)}`);
    const json = await res.json();
    return json.success ? json.data : json;
  },

  async getProducts(params: FetchProductsParams) {
    const query = new URLSearchParams();
    if (params.tenantId) query.set('tenantId', params.tenantId);
    if (params.category) query.set('category', params.category);
    if (params.color) query.set('color', params.color);
    if (params.gender) query.set('gender', params.gender);
    if (params.search) query.set('search', params.search);
    if (params.limit) query.set('limit', params.limit.toString());

    const res = await fetch(`/api/catalog/products?${query.toString()}`);
    const json = await res.json();
    return json.success ? json.data : json;
  },

  async getVariantById(variantId: string) {
    const res = await fetch(`/api/catalog/variants/${variantId}`);
    const json = await res.json();
    return json.success ? json.data : json;
  },

  async getCategories(tenantId?: string) {
    const query = tenantId ? `?tenantId=${tenantId}` : '';
    const res = await fetch(`/api/catalog/categories${query}`);
    const json = await res.json();
    return json.success ? json.data : json;
  },

  async getTenantInfo(tenantId: string) {
    const res = await fetch(`/api/tenants/${tenantId}/info`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : json;
  }
};
