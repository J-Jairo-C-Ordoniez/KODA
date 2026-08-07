import productRepository from '../repositories/product.repository';
import { CreateProductDTO, UpdateProductDTO } from '../types';

const productService = {
  async getAllProducts(tenantId: string) {
    return productRepository.getAll(tenantId);
  },

  async getProductById(tenantId: string, id: string) {
    const product = await productRepository.getById(tenantId, id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  },

  async createProduct(tenantId: string, data: CreateProductDTO) {
    if (!data.name?.trim() || !data.categoryId || !data.gender) {
      throw new Error('Nombre, categoría y género son requeridos');
    }
    return productRepository.create(tenantId, data);
  },

  async updateProduct(tenantId: string, id: string, data: UpdateProductDTO) {
    return productRepository.update(tenantId, id, data);
  },

  async deleteProduct(tenantId: string, id: string) {
    return productRepository.delete(tenantId, id);
  }
};

export default productService;
