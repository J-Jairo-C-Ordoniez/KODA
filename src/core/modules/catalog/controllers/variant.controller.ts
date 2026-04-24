import { apiResponse } from '@/core/utils/apiResponse';
import variantService from '../services/variant.service';

const variantController = {
  async getAllVariants() {
    try {
      const variants = await variantService.getAllVariants();
      return apiResponse.success(variants);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener variantes", 500);
    }
  },

  async getVariantById(id: string) {
    try {
      const variant = await variantService.getVariantById(id);
      return apiResponse.success(variant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Variante no encontrada", 404);
    }
  },

  async createVariant(data: any) {
    try {
      const variant = await variantService.createVariant(data);
      return apiResponse.success(variant, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al crear variante", 400);
    }
  },

  async updateVariant(id: string, data: any) {
    try {
      const variant = await variantService.updateVariant(id, data);
      return apiResponse.success(variant);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar variante", 400);
    }
  },

  async deleteVariant(id: string) {
    try {
      await variantService.deleteVariant(id);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al eliminar variante", 400);
    }
  }
};

export default variantController;
