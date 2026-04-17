import { InventoryRepository } from '../repositories/inventory.repository';

export class InventoryService {
  constructor() {
    this.repository = new InventoryRepository();
  }

  async checkStock(variantId) {
    const inventory = await this.repository.getInventoryByVariantId(variantId);
    return { variantId, stock: inventory ? inventory.stock : 0 };
  }

  async decreaseStock(variantId, amount) {
    const { stock: currentStock } = await this.checkStock(variantId);
    if (currentStock < amount) {
      throw new Error(`Stock insuficiente. Disponible: ${currentStock}`);
    }
    const newStock = currentStock - amount;
    return await this.updateInventoryStock(variantId, newStock);
  }

  async increaseStock(variantId, amount) {
    const { stock: currentStock } = await this.checkStock(variantId);
    const newStock = currentStock + amount;
    return await this.updateInventoryStock(variantId, newStock);
  }

  async getAllInventory() {
    try {
      return await this.repository.getAllProductsWithInventory();
    } catch (error) {
      throw new Error(`Error al obtener el inventario: ${error.message}`);
    }
  }

  async updateInventoryStock(variantId, stock) {
    if (stock < 0) throw new Error('El stock no puede ser negativo');
    try {
      return await this.repository.createOrUpdateStock(variantId, stock);
    } catch (error) {
      throw new Error(`Error al actualizar stock: ${error.message}`);
    }
  }

  async getDashboardData() {
    const [totalStock, lowStockItems] = await Promise.all([
      this.repository.getTotalStock(),
      this.repository.getLowStockItems(10)
    ]);
    return { totalStock, lowStockItems };
  }
}
