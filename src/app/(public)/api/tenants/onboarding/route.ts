import { NextResponse } from 'next/server';
import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import { secureHeaders } from '@/backend/core/utils/routeGuard';

// ─── GET /api/tenants/onboarding — Public: onboarding health ──────────────────
export async function GET(): Promise<NextResponse> {
  const result = await tenantController.getOnboardingHealth();
  return secureHeaders(result as NextResponse);
}