import { NextResponse } from 'next/server';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const tenant = await tenantController.getTenantBySlug(slug);
  return NextResponse.json(tenant);
}
