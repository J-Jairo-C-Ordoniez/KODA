'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { storeApi } from '../api/store.api';

export function useStoreCatalog(tenantId?: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = searchParams.get('category') || '';
  const currentColor = searchParams.get('color') || '';

  const fetchCatalog = useCallback(async () => {
    if (!tenantId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await storeApi.getProducts({
        tenantId,
        category: currentCategory || undefined,
        color: currentColor || undefined
      });

      if (data && data.error) {
        setError(data.error);
        setProducts([]);
      } else {
        const items = Array.isArray(data) ? data : data?.items || [];
        setProducts(items);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar productos');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [tenantId, currentCategory, currentColor]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    if (!tenantId) return;
    storeApi
      .getCategories(tenantId)
      .then((res) => {
        if (Array.isArray(res)) setCategories(res);
      })
      .catch(() => {});
  }, [tenantId]);

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hasFilters = Boolean(currentCategory || currentColor);

  return {
    products,
    categories,
    isLoading,
    error,
    currentCategory,
    currentColor,
    setFilter,
    clearFilters,
    hasFilters,
    refetch: fetchCatalog,
  };
}
