'use client';

import { useState, useEffect } from 'react';
import { storeApi } from '../api/store.api';

export function useProductDetail(variantId: string) {
  const [data, setData] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!variantId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    storeApi
      .getVariantById(variantId)
      .then((res) => {
        if (!isMounted) return;
        if (res && res.variantId) {
          setData(res);
          setSelectedVariant(res);
        } else if (res && res.error) {
          setError(res.error);
        } else {
          setError('Producto no encontrado');
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Error de conexión');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [variantId]);

  return {
    data,
    selectedVariant,
    setSelectedVariant,
    isLoading,
    error,
  };
}
