import { useState, useCallback } from 'react';
import { fetchPoliciesApi, savePoliciesApi } from '@/features/super-admin/api/super-admin.api';

export function useManagePolicies() {
  const [policy, setPolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicy = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPoliciesApi();
      setPolicy(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las políticas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePolicy = async (data: any) => {
    setIsSaving(true);
    try {
      const responseData = await savePoliciesApi(data);
      await fetchPolicy();
      return { success: true, data: responseData.data };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar las políticas' };
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
