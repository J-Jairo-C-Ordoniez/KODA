import catalogRepository from "@/core/modules/catalog/repositories/catalog.repository";

const catalogService = {
  async getCategories(tenantId: string) {
    try {
      const categories = await catalogRepository.getCategories(tenantId);
      return categories;
    } catch (error: any) {
      throw new Error(error.message || "Error en el servicio de categorías");
    }
  },

  async getColors(tenantId: string) {
    try {
      const colors = await catalogRepository.getColors(tenantId);
      return colors;
    } catch (error: any) {
      throw new Error(error.message || "Error en el servicio de colores");
    }
  },

  async getProducts(tenantId: string, filters: any) {
    try {
      const products = await catalogRepository.getPublicCatalog(tenantId, filters);
      return products;
    } catch (error: any) {
      throw new Error(error.message || "Error en el servicio de productos");
    }
  },

  async getProductById(id: string) {
    try {
      const product: any = await catalogRepository.getProductById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error: any) {
      throw new Error(`Error en CatalogService al obtener el producto: ${error.message}`);
    }
  },

  async getPopularVariants(limit: number) {
    try {
      return await catalogRepository.getPopularVariants(limit);
    } catch (error: any) {
      throw new Error(`Error en CatalogService al obtener variantes populares: ${error.message}`);
    }
  },

  async getVariantById(id: string) {
    try {
      const variant: any = await catalogRepository.getVariantById(id);
      if (!variant) {
        throw new Error('Variante no encontrada');
      }
      return variant;
    } catch (error: any) {
      throw new Error(`Error en CatalogService al obtener la variante: ${error.message}`);
    }
  }
}

export default catalogService;