import variantRepository from '../repositories/variant.repository';

const variantService = {
  async getAllVariants() {
    try {
      return await variantRepository.getAll();
    } catch (error: any) {
      throw new Error(`Error al obtener variantes: ${error.message}`);
    }
  },

  async getVariantById(id: string) {
    try {
      const variant = await variantRepository.getById(id);
      if (!variant) throw new Error('Variante no encontrada');
      return variant;
    } catch (error: any) {
      throw new Error(`Error al obtener la variante: ${error.message}`);
    }
  },

  async createVariant(data: any) {
    try {
      if (!data.productId || !data.name || !data.sku || !data.price) {
        throw new Error('ID de producto, nombre, SKU y precio son requeridos');
      }
      return await variantRepository.create(data);
    } catch (error: any) {
      throw new Error(`Error al crear la variante: ${error.message}`);
    }
  },

  async updateVariant(id: string, data: any) {
    try {
      if (!data.name || !data.sku || !data.price) {
        throw new Error('Nombre, SKU y precio son requeridos');
      }
      return await variantRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Error al actualizar la variante: ${error.message}`);
    }
  },

  async deleteVariant(id: string) {
    try {
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
