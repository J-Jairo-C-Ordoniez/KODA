import productRepository from '../repositories/product.repository';

const productService = {
  async getAllProducts() {
    try {
      return await productRepository.getAll();
    } catch (error: any) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  async getProductById(id: string) {
    try {
      const product = await productRepository.getById(id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error: any) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  },

  async createProduct(data: any) {
    try {
      if (!data.name || !data.categoryId || !data.gender) {
        throw new Error('Nombre, categoría y género son requeridos');
      }
      return await productRepository.create(data);
    } catch (error: any) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  },

  async updateProduct(id: string, data: any) {
    try {
      if (!data.name || !data.categoryId || !data.gender) {
        throw new Error('Nombre, categoría y género son requeridos');
      }
      return await productRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  },

  async deleteProduct(id: string) {
    try {
      return await productRepository.delete(id);
    } catch (error: any) {
      throw new Error('No se puede eliminar el producto si tiene variantes asociadas o el ID es inválido');
    }
  }
};

export default productService;
