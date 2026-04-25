import { apiResponse } from '@/core/utils/apiResponse';
import categoryService from '../services/category.service';

const categoryController = {
  async getAllCategories(tenantId: string) {
    try {
      const categories = await categoryService.getAllCategories(tenantId);
      return apiResponse.success(categories);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener categorías", 500);
    }
  },

  async getCategoryById(tenantId: string, id: string) {
    try {
      const category = await categoryService.getCategoryById(tenantId, id);
      return apiResponse.success(category);
    } catch (error: any) {
      return apiResponse.error(error.message || "Categoría no encontrada", 404);
    }
  },

  async createCategory(tenantId: string, data: any) {
    try {
      const category = await categoryService.createCategory(tenantId, data);
      return apiResponse.success(category, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al crear categoría", 400);
    }
  },

  async updateCategory(tenantId: string, id: string, data: any) {
    try {
      const category = await categoryService.updateCategory(tenantId, id, data);
      return apiResponse.success(category);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar categoría", 400);
    }
  },

  async deleteCategory(tenantId: string, id: string) {
    try {
      await categoryService.deleteCategory(tenantId, id);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al eliminar categoría", 400);
    }
  }
};

export default categoryController;
