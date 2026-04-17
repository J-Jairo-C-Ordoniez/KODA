import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getAllProducts() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.repository.getById(id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  async createProduct(data) {
    try {
      if (!data.name || !data.categoryId || !data.gender) {
        throw new Error('Nombre, categoría y género son requeridos');
      }
      return await this.repository.create(data);
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }

  async updateProduct(id, data) {
    try {
      if (!data.name || !data.categoryId || !data.gender) {
        throw new Error('Nombre, categoría y género son requeridos');
      }
      return await this.repository.update(id, data);
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error('No se puede eliminar el producto si tiene variantes asociadas o el ID es inválido');
    }
  }
}
