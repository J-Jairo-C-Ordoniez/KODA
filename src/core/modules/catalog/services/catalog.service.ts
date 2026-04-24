import catalogRepository from "@/core/modules/catalog/repositories/catalog.repository";

const catalogService = {
  async getCategories(tenantId: string) {
    try {
      const categories = await catalogRepository.getCategories(tenantId);
      return categories;
    } catch (error) {
      return error;
    }
  },

  async getColors(tenantId: string) {
    try {
      const colors = await catalogRepository.getColors(tenantId);
      return colors;
    } catch (error) {
      return error;
    }
  },

  async getProducts(tenantId: string, filters: any) {
    try {
      const products = await catalogRepository.getPublicCatalog(tenantId, filters);
      return products;
    } catch (error) {
      return error;
    }
  },

  async getProductById(id) {
    /* try {
      const product = await CatalogRepository.getProductById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener el producto: ${error.message}`);
    } */
  },

  async getPopularVariants(limit) {
    /* try {
      return await CatalogRepository.getPopularVariants(limit);
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener variantes populares: ${error.message}`);
    } */
  },

  async getVariantById(id) {
    /* try {
      const variant = await CatalogRepository.getVariantById(id);
      if (!variant) {
        throw new Error('Variante no encontrada');
      }
      return variant;
    } catch (error) {
      throw new Error(`Error en CatalogService al obtener la variante: ${error.message}`);
    } */
  }
}

export default catalogService;