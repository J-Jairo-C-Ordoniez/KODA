import { useState, useCallback } from 'react';
import { fetchTenantCountsApi, fetchTenantsApi, updateTenantStatusApi } from '@/features/super-admin/api/super-admin.api';

export function useTenants() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [suspendedCount, setSuspendedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = useCallback(async () => {
    try {
      const counts = await fetchTenantCountsApi();
      setTotalCount(counts.total);
      setActiveCount(counts.active);
      setSuspendedCount(counts.suspended);
    } catch (err) {
      console.error('Error cargando conteo de negocios:', err);
    }
  }, []);

  const fetchTenants = useCallback(async (searchQuery = '', status = '') => {
    setIsSearching(true);
    try {
      const data = await fetchTenantsApi(searchQuery, status);
      setTenants(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los negocios');
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (tenantId: string, status: string) => {
    try {
      await updateTenantStatusApi(tenantId, status);
      setTenants(prev => prev.map(t => t.tenantId === tenantId ? { ...t, status } : t));
      fetchCounts();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return {
    tenants,
    totalCount,
    activeCount,
    suspendedCount,
    isLoading,
    isSearching,
    error,
    fetchTenants,
    fetchCounts,
    updateStatus
  };
}

