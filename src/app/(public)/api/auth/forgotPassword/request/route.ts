import { NextRequest, NextResponse } from 'next/server';
import authController from '@/backend/crossCutting/auth/controllers/auth.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── POST /api/auth/forgotPassword/request — Public: request password reset ───
export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const result = await authController.requestReset(data);
  return secureHeaders(result as NextResponse);
}
