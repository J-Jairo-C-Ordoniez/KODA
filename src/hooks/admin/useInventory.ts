import { useState, useCallback } from 'react';

export function useInventory() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/inventory');
      const json = await res.json();
      
      if (json.success) {
        setProducts(json.data || []);
      } else {
        setError(json.error || 'Error al cargar inventario');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStock = async (variantId: string, newStock: number) => {
    setLoadingId(variantId);
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, stock: parseInt(newStock.toString()) })
      });
      const json = await res.json();
      
      if (json.success) {
        await fetchInventory();
        return { success: true };
      } else {
        return { success: false, error: json.error || 'Error al actualizar stock' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
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
