import { NextRequest, NextResponse } from 'next/server';
import catalogController from '@/backend/core/catalog/controllers/catalog.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/catalog/products — Public: list products with filters ────────────
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = req.nextUrl;
  const tenantId = searchParams.get('tenantId') ?? '';
  const search   = searchParams.get('search') ?? '';

  const filters = {
    gender:   searchParams.get('gender') ?? '',
    color:    searchParams.get('color') ? [searchParams.get('color') as string] : [],
    category: searchParams.get('category') ?? '',
    search,
    page:     Number(searchParams.get('page'))  || 1,
    limit:    Number(searchParams.get('limit')) || 12,
  };

  const result = await catalogController.getProducts(tenantId, filters);
  return secureHeaders(result as NextResponse);
}