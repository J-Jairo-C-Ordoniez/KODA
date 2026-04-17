import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }

  async getAllCategories() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  }

  async getCategoryById(id) {
    try {
      const category = await this.repository.getById(id);
      if (!category) throw new Error('Categoría no encontrada');
      return category;
    } catch (error) {
      throw new Error(`Error al obtener la categoría: ${error.message}`);
    }
  }

  async createCategory(data) {
    try {
      if (!data.name) throw new Error('El nombre es requerido');
      return await this.repository.create(data);
    } catch (error) {
      throw new Error(`Error al crear la categoría: ${error.message}`);
    }
  }

  async updateCategory(id, data) {
    try {
      if (!data.name) throw new Error('El nombre es requerido');
      return await this.repository.update(id, data);
    } catch (error) {
      throw new Error(`Error al actualizar la categoría: ${error.message}`);
    }
  }

  async deleteCategory(id) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error('No se puede eliminar la categoría si tiene productos asociados');
    }
  }
}
