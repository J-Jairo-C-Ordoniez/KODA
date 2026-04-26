import { useState, useCallback } from 'react';

export function useCustomers(tenantId: string | undefined) {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/${tenantId}/customers`);
      const json = await res.json();
      if (json.success) {
        setCustomers(json.data || []);
      } else {
        setError(json.error || 'Error al cargar clientes');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const saveCustomer = async (data: { name: string, phone: string }) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tenantId}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        await fetchCustomers();
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error || 'Error al crear cliente' };
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  const registerPayment = async (customerId: string, data: { amount: number; paymentMethod: string; note?: string }) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tenantId}/customers/${customerId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        await fetchCustomers();
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error || 'Error al registrar abono' };
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    customers,
    isLoading,
    isSaving,
    error,
    fetchCustomers,
    saveCustomer,
    registerPayment
  };
}
