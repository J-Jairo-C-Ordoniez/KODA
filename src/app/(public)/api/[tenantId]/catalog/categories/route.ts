import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { apiResponse } from "@/core/utils/apiResponse";
import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    console.log('[API] Unauthorized access to categories:', { sessionTenant: session?.user?.tenantId, paramTenant: tenantId });
    return apiResponse.error('No autorizado', 401);
  }

  const response = await categoryController.getAllCategories(tenantId);
  return response;
}

export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  try {
    const data = await req.json();
    return await categoryController.createCategory(tenantId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al crear categoría', 400);
  }
}
