import productRepository from '../repositories/product.repository';

const productService = {
  async getAllProducts(tenantId: string) {
    try {
      return await productRepository.getAll(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  async getProductById(tenantId: string, id: string) {
    try {
      const product = await productRepository.getById(tenantId, id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error: any) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  },

  async createProduct(tenantId: string, data: any) {
    try {
      if (!data.name || !data.categoryId || !data.gender) {
        throw new Error('Nombre, categoría y género son requeridos');
      }
      return await productRepository.create(tenantId, data);
    } catch (error: any) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  },

  async updateProduct(tenantId: string, id: string, data: any) {
    try {
      if (!data.name || !data.categoryId || !data.gender) {
        throw new Error('Nombre, categoría y género son requeridos');
      }
      return await productRepository.update(tenantId, id, data);
    } catch (error: any) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  },

  async deleteProduct(tenantId: string, id: string) {
    try {
      return await productRepository.delete(tenantId, id);
    } catch (error: any) {
      throw new Error('No se puede eliminar el producto si tiene variantes asociadas o el ID es inválido');
    }
  }
};

export default productService;
