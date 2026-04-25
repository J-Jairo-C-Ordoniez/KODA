import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { apiResponse } from "@/core/utils/apiResponse";
import productController from '@/core/modules/catalog/controllers/product.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await productController.getAllProducts(tenantId);
}

export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  try {
    const data = await req.json();
    return await productController.createProduct(tenantId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al crear producto', 400);
  }
}
