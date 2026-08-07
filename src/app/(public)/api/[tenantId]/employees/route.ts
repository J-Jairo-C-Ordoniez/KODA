import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import employeeController from '@/backend/core/employees/controllers/employee.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const res = await employeeController.getEmployees(ctx.tenantId);
  return secureHeaders(res);
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const data = await req.json();
  const res = await employeeController.createEmployee(ctx.tenantId, data);
  return secureHeaders(res);
}
