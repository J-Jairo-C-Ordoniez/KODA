import catalogController from "@/core/modules/catalog/controllers/catalog.controller";
import { apiResponse } from "@/core/utils/apiResponse";

export async function POST(req: Request) {
  return apiResponse.error("Método no permitido", 405);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return apiResponse.error("El ID de la tienda (tenantId) es requerido", 400);
    }

    const filters = {
      gender: searchParams.get('gender') || '',
      color: searchParams.get('color') ? [searchParams.get('color')] : [],
      category: searchParams.get('category') || '',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 12,
    };

    return await catalogController.getProducts(tenantId, filters);
  } catch (error: any) {
    return apiResponse.error(error.message || "Error al procesar la petición", 500);
  }
}