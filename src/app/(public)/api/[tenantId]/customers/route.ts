import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import customerController from '@/backend/core/customers/controllers/customer.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);

  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') || '1');
  const limit = Number(url.searchParams.get('limit') || '50');

  const result = await customerController.getCustomers(ctx.tenantId, { page, limit }) as NextResponse;
  secureHeaders(result);
  return result;
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);

  const denied = requireRoles(ctx, ['admin', 'superAdmin']);
  if (denied) return denied;

  const body = await req.json();
  const result = await customerController.createCustomer(ctx.tenantId, body) as NextResponse;
  secureHeaders(result);
  return result;
}
