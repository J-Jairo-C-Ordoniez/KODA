import { NextRequest, NextResponse } from 'next/server';
import catalogController from '@/backend/core/catalog/controllers/catalog.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/catalog/variants/[id] — Public: get variant detail ──────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const result = await catalogController.getVariantById(id);
  return secureHeaders(result as NextResponse);
}