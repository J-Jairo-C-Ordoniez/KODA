import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Employee,
  SaveEmployeeDto,
  UpdateEmployeeDto,
  fetchEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from '@/features/dashboard/business/api/team.api';

export default function useTeam() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadEmployees = useCallback(async () => {
    if (!tenantId) return;
    setIsLoading(true);
    try {
      const data = await fetchEmployeesApi(tenantId);
      setEmployees(data);
    } catch (err) {
      console.error('Error cargando equipo:', err);
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const createEmployee = useCallback(
    async (data: SaveEmployeeDto) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      setIsSaving(true);
      try {
        const created = await createEmployeeApi(tenantId, data);
        await loadEmployees();
        return { success: true, data: created };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error al crear empleado' };
      } finally {
        setIsSaving(false);
      }
    },
    [tenantId, loadEmployees],
  );

  const updateEmployee = useCallback(
    async (employeeId: string, data: UpdateEmployeeDto) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      setIsSaving(true);
      try {
        const updated = await updateEmployeeApi(tenantId, employeeId, data);
        await loadEmployees();
        return { success: true, data: updated };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error al actualizar empleado' };
      } finally {
        setIsSaving(false);
      }
    },
    [tenantId, loadEmployees],
  );

  const deleteEmployee = useCallback(
    async (employeeId: string) => {
      if (!tenantId) return { success: false, error: 'Tenant ID requerido' };
      setIsSaving(true);
      try {
        await deleteEmployeeApi(tenantId, employeeId);
        await loadEmployees();
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Error al eliminar empleado' };
      } finally {
        setIsSaving(false);
      }
    },
    [tenantId, loadEmployees],
  );

  return {
    employees,
    isLoading,
    isSaving,
    loadEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
