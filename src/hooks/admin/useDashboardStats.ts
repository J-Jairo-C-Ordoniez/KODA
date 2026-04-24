import { useState, useCallback } from 'react';

export function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/stats');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      } else {
        setError(json.error || 'Error al cargar las estadísticas');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    stats,
    isLoading,
    error,
    fetchStats
  };
}
