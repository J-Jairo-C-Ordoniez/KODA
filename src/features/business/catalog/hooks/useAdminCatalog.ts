import { useState, useCallback } from 'react';
import { Product, Category, Variant } from '@/core/modules/catalog/types';
import {
  fetchCatalogDataApi,
  saveProductApi,
  deleteProductApi,
  saveVariantApi,
  deleteVariantApi,
  updateVariantStockApi,
  saveCategoryApi,
  deleteCategoryApi
} from '@/features/business/catalog/api/catalog.api';

export function useAdminCatalog(tenantId: string | undefined) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCatalogData = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCatalogDataApi(tenantId);
      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (err: any) {
      console.error('Fetch Catalog Error:', err);
      setError(`Error al cargar datos del catálogo: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const saveProduct = async (data: Partial<Product>, editingProduct: Product | null = null) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      await saveProductApi(tenantId, data, editingProduct?.productId);
      await fetchCatalogData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar el producto' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      await deleteProductApi(tenantId, productId);
      await fetchCatalogData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al eliminar el producto' };
    }
  };

  // --- Variants ---
  const saveVariant = async (data: Partial<Variant>, editingVariant: Variant | null = null, productId: string | null = null) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      if (!editingVariant && productId) data.productId = productId;
      const savedData = await saveVariantApi(tenantId, data, editingVariant?.variantId);
      await fetchCatalogData();
      return { success: true, data: savedData };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar la variante' };
    } finally {
      setIsSaving(false);
    }
  };

  const updateVariantStock = async (variantId: string, stock: number) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      await updateVariantStockApi(tenantId, variantId, stock);
      await fetchCatalogData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al actualizar stock' };
    }
  };

  const deleteVariant = async (variantId: string) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      await deleteVariantApi(tenantId, variantId);
      await fetchCatalogData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al eliminar la variante' };
    }
  };

  // --- Categories ---
  const saveCategory = async (data: { name: string, description?: string, icon?: string }, editingCategory: Category | null = null) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const savedData = await saveCategoryApi(tenantId, data, editingCategory?.categoryId);
      await fetchCatalogData();
      return { success: true, data: savedData };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error de conexión al guardar' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsDeleting(true);
    try {
      await deleteCategoryApi(tenantId, categoryId);
      await fetchCatalogData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'No se pudo conectar con el servidor para eliminar' };
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
    updateVariantStock,
    deleteVariant,
    saveCategory,
    deleteCategory
  };
}

