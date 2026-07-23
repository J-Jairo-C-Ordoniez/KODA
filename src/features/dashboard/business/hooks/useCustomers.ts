import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import {
  Customer,
  CustomerHistoryData,
  SaveCustomerDto,
  RegisterPaymentDto,
  fetchCustomersApi,
  fetchCustomerHistoryApi,
  saveCustomerApi,
  registerPaymentApi,
  deleteCustomerApi,
} from '@/features/dashboard/business/api/customers.api';

export type CustomerFilterType = 'with-debt' | 'paid' | 'all';

export default function useCustomers() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<CustomerFilterType>('with-debt');

  const loadCustomers = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    try {
      const data = await fetchCustomersApi(tenantId);
      setCustomers(data);
    } catch (err: any) {
      console.error('Error cargando clientes', err);
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      // Filter by pill type
      if (filterType === 'with-debt' && c.totalDebt <= 0) return false;
      if (filterType === 'paid' && c.totalDebt > 0) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesPhone = c.phone.includes(q);
        return matchesName || matchesPhone;
      }

      return true;
    });
  }, [customers, filterType, searchQuery]);

  const saveCustomer = useCallback(
    async (data: SaveCustomerDto, customerId?: string) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      setIsSaving(true);
      try {
        const saved = await saveCustomerApi(tenantId, data, customerId);
        await loadCustomers();
        return { success: true, data: saved };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error al guardar el cliente' };
      } finally {
        setIsSaving(false);
      }
    },
    [tenantId, loadCustomers]
  );

  const registerPayment = useCallback(
    async (customerId: string, data: RegisterPaymentDto) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      setIsSaving(true);
      try {
        const res = await registerPaymentApi(tenantId, customerId, data);
        await loadCustomers();
        return { success: true, data: res };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error al registrar el abono' };
      } finally {
        setIsSaving(false);
      }
    },
    [tenantId, loadCustomers]
  );

  const deleteCustomer = useCallback(
    async (customerId: string) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      setIsSaving(true);
      try {
        await deleteCustomerApi(tenantId, customerId);
        await loadCustomers();
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error al eliminar cliente' };
      } finally {
        setIsSaving(false);
      }
    },
    [tenantId, loadCustomers]
  );

  const getCustomerHistory = useCallback(
    async (customerId: string): Promise<CustomerHistoryData | null> => {
      if (!tenantId) return null;
      try {
        return await fetchCustomerHistoryApi(tenantId, customerId);
      } catch (err) {
        console.error('Error cargando historial', err);
        return null;
      }
    },
    [tenantId]
  );

  // Summary counts
  const totalWithDebt = useMemo(() => customers.filter((c) => c.totalDebt > 0).length, [customers]);
  const totalPaid = useMemo(() => customers.filter((c) => c.totalDebt <= 0).length, [customers]);
  const totalDebtSum = useMemo(() => customers.reduce((sum, c) => sum + c.totalDebt, 0), [customers]);

  return {
    customers,
    filteredCustomers,
    isLoading,
    isSaving,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    totalWithDebt,
    totalPaid,
    totalDebtSum,
    loadCustomers,
    saveCustomer,
    registerPayment,
    deleteCustomer,
    getCustomerHistory,
  };
}
