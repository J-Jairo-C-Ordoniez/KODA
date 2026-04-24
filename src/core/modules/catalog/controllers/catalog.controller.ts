import catalogService from "@/core/modules/catalog/services/catalog.service";
import { apiResponse } from "@/core/utils/apiResponse";

const catalogController = {
  async getCategories(tenantId?: string) {
    try {
      const categories = await catalogService.getCategories(tenantId);
      return apiResponse.success(categories);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener categorías", 500);
    }
  },

  async getColors(tenantId?: string) {
    try {
      const colors = await catalogService.getColors(tenantId);
      return apiResponse.success(colors);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener colores", 500);
    }
  },

  async getProducts(tenantId?: string, filters?: any) {
    try {
      const products = await catalogService.getProducts(tenantId, filters);
      return apiResponse.success(products);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener productos", 500);
    }
  }
}

export default catalogController;
