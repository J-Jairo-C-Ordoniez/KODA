import { VariantRepository } from '../repositories/variant.repository';

export class VariantService {
  constructor() {
    this.repository = new VariantRepository();
  }

  async getAllVariants() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(`Error al obtener variantes: ${error.message}`);
    }
  }

  async getVariantById(id) {
    try {
      const variant = await this.repository.getById(id);
      if (!variant) throw new Error('Variante no encontrada');
      return variant;
    } catch (error) {
      throw new Error(`Error al obtener la variante: ${error.message}`);
    }
  }

  async createVariant(data) {
    try {
      if (!data.productId || !data.name || !data.sku || !data.price) {
        throw new Error('ID de producto, nombre, SKU y precio son requeridos');
      }
      return await this.repository.create(data);
    } catch (error) {
      throw new Error(`Error al crear la variante: ${error.message}`);
    }
  }

  async updateVariant(id, data) {
    try {
      if (!data.name || !data.sku || !data.price) {
        throw new Error('Nombre, SKU y precio son requeridos');
      }
      return await this.repository.update(id, data);
    } catch (error) {
      throw new Error(`Error al actualizar la variante: ${error.message}`);
    }
  }

  async deleteVariant(id) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error('No se puede eliminar la variante si tiene inventario o ventas asociadas');
    }
  }

  async incrementPopularity(id, amount) {
    try {
      return await this.repository.incrementPopularity(id, amount);
    } catch (error) {
      console.error(`Error al incrementar popularidad: ${error.message}`);
      // No lanzamos error para no bloquear la venta si falla la popularidad
    }
  }
}
