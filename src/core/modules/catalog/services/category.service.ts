import categoryRepository from '../repositories/category.repository';

const categoryService = {
  async getAllCategories(tenantId: string) {
    try {
      return await categoryRepository.getAll(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  },

  async getCategoryById(tenantId: string, id: string) {
    try {
      const category = await categoryRepository.getById(tenantId, id);
      if (!category) throw new Error('Categoría no encontrada');
      return category;
    } catch (error: any) {
      throw new Error(`Error al obtener la categoría: ${error.message}`);
    }
  },

  async createCategory(tenantId: string, data: any) {
    try {
      if (!data.name) throw new Error('El nombre es requerido');
      return await categoryRepository.create(tenantId, data);
    } catch (error: any) {
      throw new Error(`Error al crear la categoría: ${error.message}`);
    }
  },

  async updateCategory(tenantId: string, id: string, data: any) {
    try {
      if (!data.name) throw new Error('El nombre es requerido');
      return await categoryRepository.update(tenantId, id, data);
    } catch (error: any) {
      throw new Error(`Error al actualizar la categoría: ${error.message}`);
    }
  },

  async deleteCategory(tenantId: string, id: string) {
    try {
      return await categoryRepository.delete(tenantId, id);
    } catch (error: any) {
      throw new Error('No se puede eliminar la categoría si tiene productos asociados');
    }
  }
};

export default categoryService;
