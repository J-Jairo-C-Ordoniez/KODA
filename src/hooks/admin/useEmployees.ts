import { useState, useCallback } from 'react';

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
      const res = await fetch(`/api/${tenantId}/employees`);
      const json = await res.json();
      if (json.success) {
        setEmployees(json.data || []);
      } else {
        setError(json.error || 'Error al cargar empleados');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  const createEmployee = async (data: { name: string; email: string; password: string }) => {
    if (!tenantId) return { success: false, error: 'Sin sesión' };
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tenantId}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        await fetchEmployees();
        return { success: true };
      }
      return { success: false, error: json.error || 'Error al crear empleado' };
    } catch {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  const updateEmployee = async (employeeId: string, data: { name?: string; email?: string; password?: string }) => {
    if (!tenantId) return { success: false, error: 'Sin sesión' };
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tenantId}/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        await fetchEmployees();
        return { success: true };
      }
      return { success: false, error: json.error || 'Error al actualizar empleado' };
    } catch {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    if (!tenantId) return { success: false, error: 'Sin sesión' };
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tenantId}/employees/${employeeId}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        await fetchEmployees();
        return { success: true };
      }
      return { success: false, error: json.error || 'Error al eliminar empleado' };
    } catch {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsSaving(false);
    }
  };

  return { employees, isLoading, isSaving, error, fetchEmployees, createEmployee, updateEmployee, deleteEmployee };
}
