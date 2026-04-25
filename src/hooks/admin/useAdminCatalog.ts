import { useState, useCallback } from 'react';

export function useAdminCatalog(tenantId: string | undefined) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCatalogData = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`/api/${tenantId}/catalog/products`),
        fetch(`/api/${tenantId}/catalog/categories`)
      ]);

      const productsJson = await productsRes.json();
      const categoriesJson = await categoriesRes.json();

      if (productsJson.success) setProducts(productsJson.data || []);
      if (categoriesJson.success) setCategories(categoriesJson.data || []);
    } catch (err) {
      setError('Error al cargar datos del catálogo');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  // --- Products ---
  const saveProduct = async (data: any, editingProduct: any = null) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const url = editingProduct 
        ? `/api/${tenantId}/catalog/products/${editingProduct.productId}` 
        : `/api/${tenantId}/catalog/products`;
      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        await fetchCatalogData();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al guardar el producto' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      const res = await fetch(`/api/${tenantId}/catalog/products/${productId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await fetchCatalogData();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al eliminar el producto' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  // --- Variants ---
  const saveVariant = async (data: any, editingVariant: any = null, productId: string | null = null) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const url = editingVariant 
        ? `/api/${tenantId}/catalog/variants/${editingVariant.variantId}` 
        : `/api/${tenantId}/catalog/variants`;
      const method = editingVariant ? 'PATCH' : 'POST';

      if (!editingVariant && productId) data.productId = productId;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        await fetchCatalogData();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al guardar la variante' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteVariant = async (variantId: string) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      const res = await fetch(`/api/${tenantId}/catalog/variants/${variantId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await fetchCatalogData();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al eliminar la variante' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  // --- Categories ---
  const saveCategory = async (data: { name: string, description?: string, icon?: string }, editingCategory: any = null) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const url = editingCategory 
        ? `/api/${tenantId}/catalog/categories/${editingCategory.categoryId}` 
        : `/api/${tenantId}/catalog/categories`;
      const method = editingCategory ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      if (json.success) {
        await fetchCatalogData();
        return { success: true, data: json.data };
      } else {
        return { success: false, error: json.error || 'Error al guardar la categoría' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión al guardar' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/${tenantId}/catalog/categories/${categoryId}`, { method: 'DELETE' });
      const json = await response.json();
      if (json.success) {
        await fetchCatalogData();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al eliminar la categoría' };
      }
    } catch (err) {
      return { success: false, error: 'No se pudo conectar con el servidor para eliminar' };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    products,
    categories,
    isLoading,
    error,
    isSaving,
    isDeleting,
    fetchCatalogData,
    saveProduct,
    deleteProduct,
    saveVariant,
    deleteVariant,
    saveCategory,
    deleteCategory
  };
}
