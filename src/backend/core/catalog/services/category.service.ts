import categoryRepository from '../repositories/category.repository';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../types';

const categoryService = {
  async getAllCategories(tenantId: string) {
    return categoryRepository.getAll(tenantId);
  },

  async getCategoryById(tenantId: string, id: string) {
    const category = await categoryRepository.getById(tenantId, id);
    if (!category) throw new Error('Categoría no encontrada');
    return category;
  },

  async createCategory(tenantId: string, data: CreateCategoryDTO) {
    if (!data.name?.trim()) throw new Error('El nombre es requerido');
    return categoryRepository.create(tenantId, data);
  },

  async updateCategory(tenantId: string, id: string, data: UpdateCategoryDTO) {
    if (data.name !== undefined && !data.name.trim()) {
      throw new Error('El nombre no puede estar vacío');
    }
    return categoryRepository.update(tenantId, id, data);
  },

  async deleteCategory(tenantId: string, id: string) {
    return categoryRepository.delete(tenantId, id);
  }
};

export default categoryService;
