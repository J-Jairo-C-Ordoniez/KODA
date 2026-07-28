'use client';

import { useState, useEffect } from 'react';
import { storeApi } from '../api/store.api';

export function useStoreTenant(slug: string, initialTenant: any = null) {
  const [tenant, setTenant] = useState<any>(initialTenant);
  const [isLoading, setIsLoading] = useState(!initialTenant);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTenant) {
      setTenant(initialTenant);
      setIsLoading(false);
      return;
    }

    if (!slug) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    storeApi
      .getTenantBySlug(slug)
      .then((data) => {
        if (!isMounted) return;
        if (data && !data.error) {
          setTenant(data);
        } else {
          setError(data?.error || 'La tienda no existe');
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
  }, [slug, initialTenant]);

  return { tenant, isLoading, error };
}
