import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { apiResponse } from "@/core/utils/apiResponse";
import variantController from '@/core/modules/catalog/controllers/variant.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string, variantId: string }> }) {
  const { tenantId, variantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await variantController.getVariantById(tenantId, variantId);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ tenantId: string, variantId: string }> }) {
  const { tenantId, variantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  try {
    const data = await req.json();
    return await variantController.updateVariant(tenantId, variantId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al actualizar variante', 400);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ tenantId: string, variantId: string }> }) {
  const { tenantId, variantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await variantController.deleteVariant(tenantId, variantId);
}
