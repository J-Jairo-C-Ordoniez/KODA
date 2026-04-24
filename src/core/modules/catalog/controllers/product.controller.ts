import { apiResponse } from '@/core/utils/apiResponse';
import productService from '../services/product.service';

const productController = {
  async getAllProducts() {
    try {
      const products = await productService.getAllProducts();
      return apiResponse.success(products);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener productos", 500);
    }
  },

  async getProductById(id: string) {
    try {
      const product = await productService.getProductById(id);
      return apiResponse.success(product);
    } catch (error: any) {
      return apiResponse.error(error.message || "Producto no encontrado", 404);
    }
  },

  async createProduct(data: any) {
    try {
      const product = await productService.createProduct(data);
      return apiResponse.success(product, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al crear producto", 400);
    }
  },

  async updateProduct(id: string, data: any) {
    try {
      const product = await productService.updateProduct(id, data);
      return apiResponse.success(product);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar producto", 400);
    }
  },

  async deleteProduct(id: string) {
    try {
      await productService.deleteProduct(id);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al eliminar producto", 400);
    }
  }
};

export default productController;
