// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmployeeSale {
  saleId: string;
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'online' | 'debt';
  createdAt: string;
}

export interface Employee {
  userId: string;
  name: string;
  email: string;
  avatar: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    sales: number;
  };
  sales: EmployeeSale[];
}

export interface SaveEmployeeDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateEmployeeDto {
  name?: string;
  email?: string;
  password?: string;
}

// ─── Base URL ─────────────────────────────────────────────────────────────────

const BASE = (tenantId: string) => `/api/${tenantId}/employees`;

// ─── API Functions ────────────────────────────────────────────────────────────

export async function fetchEmployeesApi(tenantId: string): Promise<Employee[]> {
  const response = await fetch(BASE(tenantId), { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al obtener empleados');
  }

  return data.data.map((e: any) => ({
    ...e,
    sales: (e.sales || []).map((s: any) => ({
      ...s,
      total: Number(s.total),
    })),
  }));
}

export async function createEmployeeApi(
  tenantId: string,
  employeeData: SaveEmployeeDto,
): Promise<Employee> {
  const response = await fetch(BASE(tenantId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al crear el empleado');
  }

  return data.data;
}

export async function updateEmployeeApi(
  tenantId: string,
  employeeId: string,
  employeeData: UpdateEmployeeDto,
): Promise<Employee> {
  const response = await fetch(`${BASE(tenantId)}/${employeeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al actualizar el empleado');
  }

  return data.data;
}

export async function deleteEmployeeApi(
  tenantId: string,
  employeeId: string,
): Promise<void> {
  const response = await fetch(`${BASE(tenantId)}/${employeeId}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Error al eliminar el empleado');
  }
}
