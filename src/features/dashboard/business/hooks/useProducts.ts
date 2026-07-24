import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useProductsStore } from '@/store/useProductsStore';
import { Variant, Product, Category, saveVariantApi, deleteVariantApi, updateVariantStockApi, saveProductApi, saveCategoryApi, fetchProductsDataApi } from '@/features/dashboard/business/api/products.api';

export default function useProducts() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const { setCatalogData } = useProductsStore();
  const [isSaving, setIsSaving] = useState(false);

  const refreshGlobalState = useCallback(async () => {
    if (!tenantId) return;
    try {
      const data = await fetchProductsDataApi(tenantId);
      setCatalogData(data.categories, data.products);
    } catch (error) {
      console.error('Error sincronizando store', error);
    }
  }, [tenantId, setCatalogData]);

  const executeMutation = useCallback(async <T,>(
    mutationFn: () => Promise<T>,
    errorMessage: string
  ) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };

    setIsSaving(true);
    try {
      const data = await mutationFn();
      await refreshGlobalState();
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message || errorMessage };
    } finally {
      setIsSaving(false);
    }
  }, [tenantId, refreshGlobalState]);

  const saveVariant = useCallback((data: Partial<Variant>, editingVariant: Variant | null = null, productId: string | null = null) => {
    if (!editingVariant && productId) (data as any).productId = productId;
    return executeMutation(() => saveVariantApi(tenantId!, data as any, editingVariant?.variantId), 'Error al guardar la variante');
  }, [tenantId, executeMutation]);

  const updateVariantStock = useCallback((variantId: string, stock: number) => {
    return executeMutation(() => updateVariantStockApi(tenantId!, variantId, stock), 'Error al actualizar stock');
  }, [tenantId, executeMutation]);

  const deleteVariant = useCallback((variantId: string) => {
    return executeMutation(() => deleteVariantApi(tenantId!, variantId), 'Error al eliminar la variante');
  }, [tenantId, executeMutation]);

  const saveProduct = useCallback((data: Partial<Product>, editingProduct: Product | null = null) => {
    return executeMutation(() => saveProductApi(tenantId!, data as any, editingProduct?.productId), 'Error al guardar el producto');
  }, [tenantId, executeMutation]);

  const saveCategory = useCallback((data: { name: string; description?: string; icon?: string }, editingCategory: Category | null = null) => {
    return executeMutation(() => saveCategoryApi(tenantId!, data, editingCategory?.categoryId), 'Error al guardar la categoría');
  }, [tenantId, executeMutation]);

  return {
    isSaving,
    saveVariant, updateVariantStock, deleteVariant,
    saveProduct, saveCategory
  };
}