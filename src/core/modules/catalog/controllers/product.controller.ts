import { apiResponse } from '@/core/utils/apiResponse';
import productService from '../services/product.service';

const productController = {
  async getAllProducts(tenantId: string) {
    try {
      const products = await productService.getAllProducts(tenantId);
      return apiResponse.success(products);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al obtener productos", 500);
    }
  },

  async getProductById(tenantId: string, id: string) {
    try {
      const product = await productService.getProductById(tenantId, id);
      return apiResponse.success(product);
    } catch (error: any) {
      return apiResponse.error(error.message || "Producto no encontrado", 404);
    }
  },

  async createProduct(tenantId: string, data: any) {
    try {
      const product = await productService.createProduct(tenantId, data);
      return apiResponse.success(product, 201);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al crear producto", 400);
    }
  },

  async updateProduct(tenantId: string, id: string, data: any) {
    try {
      const product = await productService.updateProduct(tenantId, id, data);
      return apiResponse.success(product);
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al actualizar producto", 400);
    }
  },

  async deleteProduct(tenantId: string, id: string) {
    try {
      await productService.deleteProduct(tenantId, id);
      return apiResponse.success({ deleted: true });
    } catch (error: any) {
      return apiResponse.error(error.message || "Error al eliminar producto", 400);
    }
  }
};

export default productController;
