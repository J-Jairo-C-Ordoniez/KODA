import { apiResponse } from '@/core/utils/apiResponse';
import variantService from '../services/variant.service';

const variantController = {
  async getAllVariants(tenantId: string) {
    try {
      const variants = await variantService.getAllVariants(tenantId);
      return apiResponse.success(variants);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener variantes", 500);
    }
  },

  async getVariantById(tenantId: string, id: string) {
    try {
      const variant = await variantService.getVariantById(tenantId, id);
      return apiResponse.success(variant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Variante no encontrada", 404);
    }
  },

  async createVariant(tenantId: string, data: any) {
    try {
      const variant = await variantService.createVariant(tenantId, data);
      return apiResponse.success(variant, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al crear variante", 400);
    }
  },

  async updateVariant(tenantId: string, id: string, data: any) {
    try {
      const variant = await variantService.updateVariant(tenantId, id, data);
      return apiResponse.success(variant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar variante", 400);
    }
  },

  async deleteVariant(tenantId: string, id: string) {
    try {
      await variantService.deleteVariant(tenantId, id);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al eliminar variante", 400);
    }
  }
};

export default variantController;
