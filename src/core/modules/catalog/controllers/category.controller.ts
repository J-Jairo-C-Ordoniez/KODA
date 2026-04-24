import { apiResponse } from '@/core/utils/apiResponse';
import categoryService from '../services/category.service';

const categoryController = {
  async getAllCategories() {
    try {
      const categories = await categoryService.getAllCategories();
      return apiResponse.success(categories);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener categorías", 500);
    }
  },

  async getCategoryById(id: string) {
    try {
      const category = await categoryService.getCategoryById(id);
      return apiResponse.success(category);
    } catch (error: any) {
      return apiResponse.error(error.message || "Categoría no encontrada", 404);
    }
  },

  async createCategory(data: any) {
    try {
      const category = await categoryService.createCategory(data);
      return apiResponse.success(category, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al crear categoría", 400);
    }
  },

  async updateCategory(id: string, data: any) {
    try {
      const category = await categoryService.updateCategory(id, data);
      return apiResponse.success(category);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar categoría", 400);
    }
  },

  async deleteCategory(id: string) {
    try {
      await categoryService.deleteCategory(id);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al eliminar categoría", 400);
    }
  }
};

export default categoryController;
