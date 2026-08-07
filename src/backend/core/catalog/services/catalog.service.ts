import catalogRepository from "@/backend/core/catalog/repositories/catalog.repository";
import { ProductFilters } from "../types";

const catalogService = {
  async getCategories(tenantId: string) {
    return catalogRepository.getCategories(tenantId);
  },

  async getColors(tenantId: string) {
    return catalogRepository.getColors(tenantId);
  },

  async getProducts(tenantId: string, filters?: ProductFilters) {
    return catalogRepository.getPublicCatalog(tenantId, filters);
  },

  async getProductById(id: string) {
    const product = await catalogRepository.getProductById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  },

  async getPopularVariants(tenantId: string, limit: number) {
    return catalogRepository.getPopularVariants(tenantId, limit);
  },

  async getVariantById(id: string) {
    const variant = await catalogRepository.getVariantById(id);
    if (!variant) {
      throw new Error('Variante no encontrada');
    }
    return variant;
  },

  async incrementPopularity(variantId: string, quantity: number) {
    return catalogRepository.incrementPopularity(variantId, quantity);
  }
};

export default catalogService;