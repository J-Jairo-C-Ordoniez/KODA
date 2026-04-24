import catalogController from "@/core/modules/catalog/controllers/catalog.controller";
import { apiResponse } from "@/core/utils/apiResponse";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return apiResponse.error("El ID de la tienda (tenantId) es requerido", 400);
    }

    if (action === 'categories') {
      return await catalogController.getCategories(tenantId);
    }

    if (action === 'colors') {
      return await catalogController.getColors(tenantId);
    }

    return apiResponse.error("Acción no válida", 400);
  } catch (error: any) {
    return apiResponse.error(error.message || "Error al procesar la petición del catálogo", 500);
  }
}
