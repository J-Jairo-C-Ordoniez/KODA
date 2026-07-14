import { useState, useCallback } from 'react';
import { fetchCustomersApi, saveCustomerApi, registerCustomerPaymentApi } from '@/features/business/customers/api/customers.api';

export function useCustomers(tenantId: string | undefined) {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCustomersApi(tenantId);
      setCustomers(data as any);
    } catch (err: any) {
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const saveCustomer = async (data: { name: string, phone: string }) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const savedData = await saveCustomerApi(tenantId, data);
      await fetchCustomers();
      return { success: true, data: savedData };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al crear cliente' };
    } finally {
      setIsSaving(false);
    }
  };

  const registerPayment = async (customerId: string, data: { amount: number; paymentMethod: string; note?: string }) => {
    if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
    setIsSaving(true);
    try {
      const savedData = await registerCustomerPaymentApi(tenantId, customerId, data);
      await fetchCustomers();
      return { success: true, data: savedData };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al registrar abono' };
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

