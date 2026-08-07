import catalogService from "@/backend/core/catalog/services/catalog.service";
import { apiResponse } from "@/backend/core/utils/apiResponse";
import { ProductFilters } from "../types";

const catalogController = {
  async getProducts(tenantId?: string, filters?: ProductFilters) {
    try {
      const products = await catalogService.getProducts(tenantId || "", filters);
      return apiResponse.success(products);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener productos", 500);
    }
  },

  async getVariantById(variantId: string) {
    try {
      const variant = await catalogService.getVariantById(variantId);
      return apiResponse.success(variant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener la variante", 500);
    }
  }
};

export default catalogController;
