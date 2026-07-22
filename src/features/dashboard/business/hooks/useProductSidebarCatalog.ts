import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCatalogStore } from '@/store/useProductsStore';
import { Category, Product, Variant, fetchProductsDataApi, saveCategoryApi, deleteCategoryApi, saveProductApi, deleteProductApi, saveVariantApi, deleteVariantApi, updateVariantStockApi, } from '@/features/dashboard/business/api/products.api';

export default function useProductSidebarCatalog() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const { setLoading, setError, setCatalogData, setActiveView, setSelectedProduct } = useCatalogStore();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const refresh = useCallback(async () => {
    if (!tenantId) return;
    
    setLoading(true);
    try {
      const data = await fetchProductsDataApi(tenantId);
      setCatalogData(data.categories, data.products);
    } catch (err: any) {
      setError(err.message || 'Error al cargar el catálogo');
    }
  }, [tenantId, setLoading, setCatalogData, setError]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const executeMutation = useCallback(
    async <T,>(
      mutationFn: () => Promise<T>,
      loadingSetter: React.Dispatch<React.SetStateAction<boolean>>,
      errorMessage: string,
    ) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      
      loadingSetter(true);
      try {
        const data = await mutationFn();
        await refresh(); 
        return { success: true, data };
      } catch (err: any) {
        return { success: false, error: err.message || errorMessage };
      } finally {
        loadingSetter(false);
      }
    },
    [tenantId, refresh],
  );

  const saveCategory = useCallback(
    (data: { name: string; description?: string; icon?: string }, editingCategory: Category | null = null) =>
      executeMutation(
        () => saveCategoryApi(tenantId!, data, editingCategory?.categoryId),
        setIsSaving,
        'Error al guardar la categoría',
      ),
    [tenantId, executeMutation],
  );

  const deleteCategory = useCallback(
    (categoryId: string) =>
      executeMutation(
        () => deleteCategoryApi(tenantId!, categoryId),
        setIsDeleting,
        'Error al eliminar la categoría',
      ),
    [tenantId, executeMutation],
  );

  const saveProduct = useCallback(
    (data: Partial<Product>, editingProduct: Product | null = null) =>
      executeMutation(
        () => saveProductApi(tenantId!, data as any, editingProduct?.productId),
        setIsSaving,
        'Error al guardar el producto',
      ),
    [tenantId, executeMutation],
  );

  const deleteProduct = useCallback(
    (productId: string) =>
      executeMutation(
        () => deleteProductApi(tenantId!, productId),
        setIsDeleting,
        'Error al eliminar el producto',
      ),
    [tenantId, executeMutation],
  );

  return {
    isSaving,
    isDeleting,
    refresh,
    setSelectedProduct,
    setActiveView,
    saveCategory,
    deleteCategory,
    saveProduct,
    deleteProduct
  };
}