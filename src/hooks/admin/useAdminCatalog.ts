import { useState, useCallback } from 'react';

export function useAdminCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCatalogData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/catalog/products'),
        fetch('/api/catalog/categories')
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
  }, []);

  // --- Products ---
  const saveProduct = async (data: any, editingProduct: any = null) => {
    setIsSaving(true);
    try {
      const url = editingProduct ? `/api/catalog/products/${editingProduct.productId}` : '/api/catalog/products';
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
    try {
      const res = await fetch(`/api/catalog/products/${productId}`, { method: 'DELETE' });
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
    setIsSaving(true);
    try {
      const url = editingVariant ? `/api/catalog/variants/${editingVariant.variantId}` : '/api/catalog/variants';
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
    try {
      const res = await fetch(`/api/catalog/variants/${variantId}`, { method: 'DELETE' });
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
  const saveCategory = async (name: string, editingCategory: any = null) => {
    setIsSaving(true);
    try {
      const url = editingCategory ? `/api/catalog/categories/${editingCategory.categoryId}` : '/api/catalog/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const json = await response.json();
      if (json.success) {
        await fetchCatalogData();
        return { success: true };
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
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/catalog/categories/${categoryId}`, { method: 'DELETE' });
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
