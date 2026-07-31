import { useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useProductsStore } from '@/store/useProductsStore';
import { fetchProductsDataApi } from '@/features/dashboard/business/api/products.api';

export default function useEmployeeProducts() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const { setLoading, setError, setCatalogData } = useProductsStore();

  const loadProducts = useCallback(async () => {
    if (!tenantId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchProductsDataApi(tenantId);
      setCatalogData(data.categories || [], data.products || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los productos');
    }
  }, [tenantId, setLoading, setCatalogData, setError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { refresh: loadProducts };
}
