import { useState, useCallback } from 'react';

export function useTenants() {
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/tenants');
      const json = await res.json();
      if (json.success) {
        setTenants(json.data || []);
      } else {
        setError(json.error || 'Error al cargar los negocios');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tenants,
    isLoading,
    error,
    fetchTenants
  };
}
