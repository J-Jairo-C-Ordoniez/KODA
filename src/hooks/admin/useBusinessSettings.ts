import { useState, useCallback } from 'react';

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
      const res = await fetch(`/api/${tenantId}/settings`);
      const json = await res.json();
      if (json.success) {
        setSettings(json.data);
      } else {
        setError(json.error || 'Error al cargar la configuración');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const updateTenant = async (data: Partial<{ businessName: string; description: string; whatsApp: string; type: string }>) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tenantId}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        await fetchSettings();
        return { success: true };
      }
      return { success: false, error: json.error || 'Error al guardar la configuración' };
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  const uploadLogo = async (file: File) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const res = await fetch(`/api/${tenantId}/settings`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        await fetchSettings();
        return { success: true, url: json.data.url };
      }
      return { success: false, error: json.error || 'Error al subir el logo' };
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsUploading(false);
    }
  };

  return { settings, isLoading, isSaving, isUploading, error, fetchSettings, updateTenant, uploadLogo };
}
