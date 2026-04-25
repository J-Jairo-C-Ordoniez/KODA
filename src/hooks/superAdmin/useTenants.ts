import { useState, useCallback } from 'react';

export function useTenants() {
  const [tenants, setTenants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalCount = useCallback(async () => {
    try {
      const res = await fetch('/api/tenants/counts?type=all');
      const data = await res.json();
      if (!data.error) setTotalCount(data);
    } catch (err) {
      console.error('Error cargando conteo de negocios:', err);
    }
  }, []);

  const fetchTenants = useCallback(async (searchQuery = '', status = '') => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (status) params.append('status', status);

      const url = params.toString() ? `/api/tenants/search?${params.toString()}` : '/api/tenants';
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setTenants(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los negocios');
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  }, []);

  return {
    tenants,
    totalCount,
    isLoading,
    isSearching,
    error,
    fetchTenants,
    fetchTotalCount,
  };
}
