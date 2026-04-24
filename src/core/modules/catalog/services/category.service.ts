import categoryRepository from '../repositories/category.repository';

const categoryService = {
  async getAllCategories() {
    try {
      return await categoryRepository.getAll();
    } catch (error: any) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  },

  async getCategoryById(id: string) {
    try {
      const category = await categoryRepository.getById(id);
      if (!category) throw new Error('Categoría no encontrada');
      return category;
    } catch (error: any) {
      throw new Error(`Error al obtener la categoría: ${error.message}`);
    }
  },

  async createCategory(data: any) {
    try {
      if (!data.name) throw new Error('El nombre es requerido');
      return await categoryRepository.create(data);
    } catch (error: any) {
      throw new Error(`Error al crear la categoría: ${error.message}`);
    }
  },

  async updateCategory(id: string, data: any) {
    try {
      if (!data.name) throw new Error('El nombre es requerido');
      return await categoryRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Error al actualizar la categoría: ${error.message}`);
    }
  },

  async deleteCategory(id: string) {
    try {
      return await categoryRepository.delete(id);
    } catch (error: any) {
      throw new Error('No se puede eliminar la categoría si tiene productos asociados');
    }
  }
};

export default categoryService;
