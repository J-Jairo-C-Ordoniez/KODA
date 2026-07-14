import { useState, useCallback } from 'react';
import { fetchSettingsApi, updateSettingsApi, uploadLogoApi } from '@/features/business/settings/api/settings.api';

export function useBusinessSettings(tenantId: string | undefined) {
  const [settings, setSettings] = useState<{ tenant: any; aboutUs: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSettingsApi(tenantId);
      setSettings(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar la configuración');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const updateTenant = async (data: Partial<{ businessName: string; description: string; whatsApp: string; type: string }>) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      await updateSettingsApi(tenantId, data);
      await fetchSettings();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar la configuración' };
    } finally {
      setIsSaving(false);
    }
  };

  const uploadLogo = async (file: File) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsUploading(true);
    try {
      const uploadData = await uploadLogoApi(tenantId, file);
      await fetchSettings();
      return { success: true, url: uploadData.url };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al subir el logo' };
    } finally {
      setIsUploading(false);
    }
  };

  return { settings, isLoading, isSaving, isUploading, error, fetchSettings, updateTenant, uploadLogo };
}

