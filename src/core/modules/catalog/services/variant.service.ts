import variantRepository from '../repositories/variant.repository';
import productRepository from '../repositories/product.repository';

const variantService = {
  async getAllVariants(tenantId: string) {
    try {
      return await variantRepository.getAll(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener variantes: ${error.message}`);
    }
  },

  async getVariantById(tenantId: string, id: string) {
    try {
      const variant = await variantRepository.getById(id);
      if (!variant) throw new Error('Variante no encontrada');
      
      if (variant.product.tenantId !== tenantId) {
        throw new Error('No autorizado');
      }
      
      return variant;
    } catch (error: any) {
      throw new Error(`Error al obtener la variante: ${error.message}`);
    }
  },

  async createVariant(tenantId: string, data: any) {
    try {
      if (!data.productId || !data.name || !data.sku || !data.price) {
        throw new Error('ID de producto, nombre, SKU y precio son requeridos');
      }

      const product = await productRepository.getById(tenantId, data.productId);
      if (!product) {
        throw new Error('Producto no encontrado o no autorizado');
      }

      const variant = await variantRepository.create(data);
      return variant;
    } catch (error: any) {
      throw new Error(`Error al crear la variante: ${error.message}`);
    }
  },

  async updateVariant(tenantId: string, id: string, data: any) {
    try {
      if (!data.name || !data.sku || !data.price) {
        throw new Error('Nombre, SKU y precio son requeridos');
      }

      const variant = await this.getVariantById(tenantId, id);
      if (!variant) throw new Error('Variante no encontrada');

      return await variantRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Error al actualizar la variante: ${error.message}`);
    }
  },

  async deleteVariant(tenantId: string, id: string) {
    try {
      const variant = await this.getVariantById(tenantId, id);
      if (!variant) throw new Error('Variante no encontrada');

      return await variantRepository.delete(id);
    } catch (error: any) {
      throw new Error('No se puede eliminar la variante si tiene inventario o ventas asociadas');
    }
  },

  async incrementPopularity(id: string, amount: number) {
    try {
      return await variantRepository.incrementPopularity(id, amount);
    } catch (error: any) {
      console.error(`Error al incrementar popularidad: ${error.message}`);
    }
  }
};

export default variantService;
