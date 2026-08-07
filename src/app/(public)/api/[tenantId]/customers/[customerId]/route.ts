import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, secureHeaders } from '@/backend/core/utils/routeGuard';
import customerController from '@/backend/core/customers/controllers/customer.controller';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; customerId: string }> }
) {
  const ctx = getTenantContext(req);
  const { customerId } = await params;

  const body = await req.json();
  const result = await customerController.updateCustomer(ctx.tenantId, customerId, body) as NextResponse;
  secureHeaders(result);
  return result;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; customerId: string }> }
) {
  const ctx = getTenantContext(req);
  const { customerId } = await params;

  const result = await customerController.deleteCustomer(ctx.tenantId, customerId) as NextResponse;
  secureHeaders(result);
  return result;
}
