import { NextRequest, NextResponse } from 'next/server';
import policyController from '@/backend/crossCutting/policies/controllers/policy.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/legal/[title] — Public: retrieve policy by title ────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ title: string }> }
): Promise<NextResponse> {
  const { title } = await params;
  const result = await policyController.getPolicyByTitle(title);
  return secureHeaders(result as NextResponse);
}
