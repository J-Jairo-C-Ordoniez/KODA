import { CatalogRepository } from '../repositories/catalog.repository';

export class CatalogService {
  constructor() {
    this.repository = new CatalogRepository();
  }

  async getAllProducts(filters) {
    try {
      const variants = await this.repository.getAllProducts(filters);
      return variants;
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener productos: ${error.message}`);
    }
  }

  async getColors() {
    try {
      return await this.repository.getColors();
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener colores: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.repository.getProductById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener el producto: ${error.message}`);
    }
  }

  async getCategories() {
    try {
      const categories = await this.repository.getCategories();
      return categories;
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener categorías: ${error.message}`);
    }
  }

  async getPopularVariants(limit) {
    try {
      return await this.repository.getPopularVariants(limit);
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener variantes populares: ${error.message}`);
    }
  }

  async getVariantById(id) {
    try {
      const variant = await this.repository.getVariantById(id);
      if (!variant) {
        throw new Error('Variante no encontrada');
      }
      return variant;
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener la variante: ${error.message}`);
    }
  }
}
