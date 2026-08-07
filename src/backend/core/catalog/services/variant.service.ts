import variantRepository from '../repositories/variant.repository';
import productRepository from '../repositories/product.repository';
import { CreateVariantDTO, UpdateVariantDTO } from '../types';

const variantService = {
  async getAllVariants(tenantId: string) {
    return variantRepository.getAll(tenantId);
  },

  async getVariantById(tenantId: string, id: string) {
    const variant = await variantRepository.getById(id);
    if (!variant) throw new Error('Variante no encontrada');
    
    if (variant.product.tenantId !== tenantId) {
      throw new Error('No autorizado');
    }
    
    return variant;
  },

  async createVariant(tenantId: string, data: CreateVariantDTO) {
    if (!data.productId || !data.name?.trim() || !data.sku?.trim() || data.price === undefined) {
      throw new Error('ID de producto, nombre, SKU y precio son requeridos');
    }

    const product = await productRepository.getById(tenantId, data.productId);
    if (!product) {
      throw new Error('Producto no encontrado o no autorizado');
    }

    return variantRepository.create(data);
  },

  async updateVariant(tenantId: string, id: string, data: UpdateVariantDTO) {
    return variantRepository.update(id, data);
  },

  async deleteVariant(tenantId: string, id: string) {
    return variantRepository.delete(id);
  },

  async incrementPopularity(id: string, amount: number) {
    return variantRepository.incrementPopularity(id, amount);
  },

  async getTotalStock(tenantId?: string) {
    return variantRepository.getTotalStock(tenantId);
  },
};

export default variantService;
