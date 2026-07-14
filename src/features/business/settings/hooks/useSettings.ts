import { useState, useCallback } from 'react';
import { fetchSettingsApi, updateSettingsApi } from '@/features/business/settings/api/settings.api';

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
      const data = await fetchSettingsApi(tenantId);
      setAboutUs(data.aboutUs || {});
      setPolicy((data as any).policy || { content: [] });
    } catch (err: any) {
      setError(err.message || 'Error al cargar ajustes');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const saveAboutUsAction = async (data: any) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    try {
      const resData = await updateSettingsApi(tenantId, { aboutUs: data });
      return { success: true, ...resData };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error de conexión' };
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

