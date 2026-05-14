import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/apiResponse';
import { getTenantContext, requireRole } from '@/core/utils/tenantContext';
import settingsController from '@/core/modules/settings/controllers/settings.controller';

export async function GET(req: NextRequest) {
  const { tenantId } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);
  return settingsController.getSettings(tenantId);
}

export async function PATCH(req: NextRequest) {
  const { tenantId, role } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const denied = requireRole(role, ['owner', 'admin', 'superAdmin']);
  if (denied) return denied;

  const data = await req.json();
  return settingsController.updateTenant(tenantId, data);
}

export async function POST(req: NextRequest) {
  const { tenantId, role } = getTenantContext(req);
  if (!tenantId) return apiResponse.error('No autorizado', 401);

  const denied = requireRole(role, ['owner', 'admin', 'superAdmin']);
  if (denied) return denied;

  const formData = await req.formData();
  const file = formData.get('logo') as File;
  if (!file) return apiResponse.error('Archivo requerido', 400);
  return settingsController.uploadLogo(tenantId, file);
}
