import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext, requireRoles, secureHeaders } from '@/backend/core/utils/routeGuard';
import settingsController from '@/backend/crossCutting/settings/controllers/settings.controller';

export async function GET(req: NextRequest) {
  const ctx = getTenantContext(req);
  const res = await settingsController.getSettings(ctx.tenantId);
  return secureHeaders(res);
}

export async function PATCH(req: NextRequest) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const data = await req.json();
  const res = await settingsController.updateTenant(ctx.tenantId, data);
  return secureHeaders(res);
}

export async function POST(req: NextRequest) {
  const ctx = getTenantContext(req);
  const guard = requireRoles(ctx, ['admin', 'superAdmin']);
  if (guard) return guard;

  const formData = await req.formData();
  const file = formData.get('logo') as File;
  const res = await settingsController.uploadLogo(ctx.tenantId, file);
  return secureHeaders(res);
}
