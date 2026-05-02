import { useState, useCallback } from 'react';

export function useSettings(tenantId: string | undefined) {
  const [aboutUs, setAboutUs] = useState<any>(null);
  const [policy, setPolicy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettingsData = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    setError(null);
    try {
      // For now, we fetch from the tenant settings API
      const res = await fetch(`/api/${tenantId}/settings`);
      const json = await res.json();
      if (json.success) {
        setAboutUs(json.data.aboutUs || {});
        // Fallback for policies since they might be global or separate
        setPolicy(json.data.policy || { content: [] });
      } else {
        setError(json.error || 'Error al cargar ajustes');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const saveAboutUsAction = async (data: any) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      const res = await fetch(`/api/${tenantId}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aboutUs: data }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const savePolicyAction = async (data: any) => {
    // Placeholder for policy saving
    return { success: true };
  };

  return {
    aboutUs,
    policy,
    isLoading,
    error,
    fetchSettingsData,
    saveAboutUsAction,
    savePolicyAction
  };
}
