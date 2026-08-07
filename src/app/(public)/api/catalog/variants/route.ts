import { NextRequest, NextResponse } from 'next/server';
import variantController from '@/backend/core/catalog/controllers/variant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/catalog/variants — Public: list variants for a tenant ────────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const tenantId = req.nextUrl.searchParams.get('tenantId') ?? '';
  const result = await variantController.getAllVariants(tenantId);
  return secureHeaders(result as NextResponse);
}