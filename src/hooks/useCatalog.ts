import { useState, useCallback } from 'react';

export function useCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchCatalogData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/catalog?action=dashboard'),
        fetch('/api/catalog?action=categories')
      ]);

      const productsJson = await productsRes.json();
      const categoriesJson = await categoriesRes.json();

      if (productsJson.success) setProducts(productsJson.data);
      if (categoriesJson.success) setCategories(categoriesJson.data);
    } catch (err) {
      setError('Error al cargar datos del catálogo');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProduct = async (data, editingProduct = null) => {
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

  const deleteProduct = async (productId) => {
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

  const saveVariant = async (data, editingVariant = null, productId = null) => {
    setIsSaving(true);
    try {
      const url = editingVariant ? `/api/catalog/variants/${editingVariant.variantId}` : '/api/catalog/variants';
      const method = editingVariant ? 'PATCH' : 'POST';

      if (!editingVariant) data.productId = productId;

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

  const deleteVariant = async (variantId) => {
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

  return {
    products,
    categories,
    isLoading,
    error,
    isSaving,
    fetchCatalogData,
    saveProduct,
    deleteProduct,
    saveVariant,
    deleteVariant
  };
}
