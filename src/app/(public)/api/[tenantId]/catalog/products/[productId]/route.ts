import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { apiResponse } from "@/core/utils/apiResponse";
import productController from '@/core/modules/catalog/controllers/product.controller';

export async function GET(req: Request, { params }: { params: Promise<{ tenantId: string, productId: string }> }) {
  const { tenantId, productId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await productController.getProductById(tenantId, productId);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ tenantId: string, productId: string }> }) {
  const { tenantId, productId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  try {
    const data = await req.json();
    return await productController.updateProduct(tenantId, productId, data);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Error al actualizar producto', 400);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ tenantId: string, productId: string }> }) {
  const { tenantId, productId } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.tenantId !== tenantId && session.user.role !== 'superAdmin')) {
    return apiResponse.error('No autorizado', 401);
  }

  return await productController.deleteProduct(tenantId, productId);
}
