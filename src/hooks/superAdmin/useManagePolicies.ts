import { useState, useCallback } from 'react';

export function useManagePolicies() {
  const [policy, setPolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicy = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/policies');
      const json = await res.json();
      if (json.success) {
        setPolicy(json.data);
      } else {
        setError(json.error || 'Error al cargar las políticas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePolicy = async (data: any) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        await fetchPolicy();
        return { success: true, data: json.data };
      } else {
        return { success: false, error: json.error || 'Error al guardar las políticas' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión con el servidor' };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    policy,
    isLoading,
    isSaving,
    error,
    fetchPolicy,
    savePolicy
  };
}
