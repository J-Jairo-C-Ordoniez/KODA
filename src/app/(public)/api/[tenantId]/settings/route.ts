import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '@/core/utils/apiResponse';
import { NextResponse } from 'next/server';
import settingsController from '@/core/modules/settings/controllers/settings.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const { tenantId } = await params;
  if (!session || session.user.tenantId !== tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  return settingsController.getSettings(tenantId);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const { tenantId } = await params;
  if (!session || session.user.tenantId !== tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  const data = await req.json();
  return settingsController.updateTenant(tenantId, data);
}

export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const session = await getServerSession(authOptions);
  const { tenantId } = await params;
  if (!session || session.user.tenantId !== tenantId) {
    return apiResponse.error('No autorizado', 401);
  }
  const formData = await req.formData();
  const file = formData.get('logo') as File;
  if (!file) return apiResponse.error('Archivo requerido', 400);
  return settingsController.uploadLogo(tenantId, file);
}
