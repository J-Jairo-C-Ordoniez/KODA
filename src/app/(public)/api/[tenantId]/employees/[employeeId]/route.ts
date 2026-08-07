import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import employeeController from '@/backend/core/employees/controllers/employee.controller';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; employeeId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { employeeId } = await params;
  const data = await req.json();
  const res = await employeeController.updateEmployee(employeeId, ctx.tenantId, data);
  return secureHeaders(res);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; employeeId: string }> }
) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const { employeeId } = await params;
  const res = await employeeController.deleteEmployee(employeeId, ctx.tenantId);
  return secureHeaders(res);
}
