import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, secureHeaders } from '@/backend/core/utils/routeGuard';
import customerController from '@/backend/core/customers/controllers/customer.controller';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; customerId: string }> }
) {
  const ctx = getTenantContext(req);
  const { customerId } = await params;

  const result = await customerController.getCustomerHistory(ctx.tenantId, customerId) as NextResponse;
  secureHeaders(result);
  return result;
}
