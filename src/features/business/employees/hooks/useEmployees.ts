import { useState, useCallback } from 'react';
import { fetchEmployeesApi, createEmployeeApi, updateEmployeeApi, deleteEmployeeApi } from '@/features/business/employees/api/employees.api';

export function useEmployees(tenantId: string | undefined) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchEmployeesApi(tenantId);
      setEmployees(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar empleados');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const createEmployee = async (data: { name: string; email: string; password: string }) => {
    if (!tenantId) return { success: false, error: 'Sin sesión' };
    setIsSaving(true);
    try {
      await createEmployeeApi(tenantId, data);
      await fetchEmployees();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al crear empleado' };
    } finally {
      setIsSaving(false);
    }
  };

  const updateEmployee = async (employeeId: string, data: { name?: string; email?: string; password?: string }) => {
    if (!tenantId) return { success: false, error: 'Sin sesión' };
    setIsSaving(true);
    try {
      await updateEmployeeApi(tenantId, employeeId, data);
      await fetchEmployees();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al actualizar empleado' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    if (!tenantId) return { success: false, error: 'Sin sesión' };
    setIsSaving(true);
    try {
      await deleteEmployeeApi(tenantId, employeeId);
      await fetchEmployees();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al eliminar empleado' };
    } finally {
      setIsSaving(false);
    }
  };

  return { employees, isLoading, isSaving, error, fetchEmployees, createEmployee, updateEmployee, deleteEmployee };
}

