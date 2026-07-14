import { useState, useCallback } from 'react';
import { fetchInventoryApi, updateStockApi } from '@/features/business/inventory/api/inventory.api';

export function useInventory() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchInventoryApi(''); // Empty string since it uses session header on backend
      setProducts(data as any);
    } catch (err: any) {
      setError(err.message || 'Error al cargar inventario');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStock = async (variantId: string, newStock: number) => {
    setLoadingId(variantId);
    try {
      await updateStockApi(variantId, newStock);
      await fetchInventory();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al actualizar stock' };
    } finally {
      setLoadingId(null);
    }
  };

  return {
    products,
    isLoading,
    loadingId,
    error,
    fetchInventory,
    updateStock
  };
}

