import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, secureHeaders } from '@/backend/core/utils/routeGuard';
import customerController from '@/backend/core/customers/controllers/customer.controller';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; customerId: string }> }
) {
  const ctx = getTenantContext(req);
  const { customerId } = await params;

  const body = await req.json();
  const result = await customerController.registerPayment(ctx.tenantId, customerId, body) as NextResponse;
  secureHeaders(result);
  return result;
}
