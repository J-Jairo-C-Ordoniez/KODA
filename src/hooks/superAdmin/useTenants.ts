import { useState, useCallback } from 'react';

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
      const [allRes, activeRes, suspendedRes] = await Promise.all([
        fetch('/api/tenants/counts?type=all'),
        fetch('/api/tenants/counts?type=active'),
        fetch('/api/tenants/counts?type=suspended')
      ]);

      const allData = await allRes.json();
      const activeData = await activeRes.json();
      const suspendedData = await suspendedRes.json();

      if (allData.success) setTotalCount(allData.data);
      if (activeData.success) setActiveCount(activeData.data);
      if (suspendedData.success) setSuspendedCount(suspendedData.data);
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
      // The API now returns the controller response directly: { success: true, data: [...] }
      setTenants(data.data || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los negocios');
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (tenantId: string, status: string) => {
    try {
      const res = await fetch('/api/tenants/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, status })
      });
      const data = await res.json();
      if (data.success) {
        setTenants(prev => prev.map(t => t.tenantId === tenantId ? { ...t, status } : t));
        fetchCounts(); // refresh counts
        return { success: true };
      }
      return { success: false, error: data.error };
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
