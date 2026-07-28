'use client';

import { useState, useEffect } from 'react';
import { storeApi } from '../api/store.api';

export function useStoreSearch(tenantId?: string) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!tenantId) return;
    storeApi
      .getProducts({ tenantId, limit: 6 })
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.items || [];
        setPopular(items);
      })
      .catch(() => {});
  }, [tenantId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      if (!tenantId) return;

      setIsLoading(true);
      storeApi
        .getProducts({ tenantId, search: query.trim() })
        .then((data) => {
          const items = Array.isArray(data) ? data : data?.items || [];
          setResults(items);
          setHasSearched(true);
        })
        .catch(() => {
          setResults([]);
          setHasSearched(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, tenantId]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  return {
    query,
    setQuery,
    results,
    popular,
    isLoading,
    hasSearched,
    clearSearch,
  };
}
