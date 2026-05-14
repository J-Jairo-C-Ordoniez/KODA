import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext, requireRole } from '@/core/utils/tenantContext';
import employeeController from '@/core/modules/employees/controllers/employee.controller';

export async function GET(req: NextRequest) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  return employeeController.getEmployees(tenantId);
}

export async function POST(req: NextRequest) {
  const { tenantId, role } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const denied = requireRole(role, ['owner', 'admin', 'superAdmin']);
  if (denied) return denied;

  const data = await req.json();
  return employeeController.createEmployee(tenantId, data);
}
