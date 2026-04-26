import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { apiResponse } from "@/core/utils/apiResponse";
import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string, categoryId: string }> }) {
  const { tenantId, categoryId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await categoryController.getCategoryById(tenantId, categoryId);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ tenantId: string, categoryId: string }> }) {
  const { tenantId, categoryId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  try {
    const data = await req.json();
    return await categoryController.updateCategory(tenantId, categoryId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al actualizar categoría', 400);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ tenantId: string, categoryId: string }> }) {
  const { tenantId, categoryId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await categoryController.deleteCategory(tenantId, categoryId);
}
