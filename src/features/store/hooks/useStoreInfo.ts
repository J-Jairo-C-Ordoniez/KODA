'use client';

import { useState, useEffect } from 'react';
import { storeApi } from '../api/store.api';

export function useStoreInfo(tenantId?: string) {
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    storeApi
      .getTenantInfo(tenantId)
      .then((data) => {
        setInfo(data);
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener la información de la tienda');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tenantId]);

  return { info, isLoading, error };
}
