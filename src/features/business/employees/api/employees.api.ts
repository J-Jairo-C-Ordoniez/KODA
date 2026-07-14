/**
 * Cliente de API para el módulo de Empleados (Employees)
 */

export async function fetchEmployeesApi(tenantId: string): Promise<any[]> {
  const response = await fetch(`/api/${tenantId}/employees`, { cache: 'no-store' });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al cargar empleados');
  }
  return json.data || [];
}

export async function createEmployeeApi(tenantId: string, data: { name: string; email: string; password: string }): Promise<any> {
  const response = await fetch(`/api/${tenantId}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al crear empleado');
  }
  return json.data;
}

export async function updateEmployeeApi(tenantId: string, employeeId: string, data: { name?: string; email?: string; password?: string }): Promise<any> {
  const response = await fetch(`/api/${tenantId}/employees/${employeeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al actualizar empleado');
  }
  return json.data;
}

export async function deleteEmployeeApi(tenantId: string, employeeId: string): Promise<void> {
  const response = await fetch(`/api/${tenantId}/employees/${employeeId}`, {
    method: 'DELETE'
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Error al eliminar empleado');
  }
}
