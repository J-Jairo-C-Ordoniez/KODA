import inventoryRepository from '../repositories/inventory.repository';

const inventoryService = {
  async checkStock(variantId: string) {
    const inventory = await inventoryRepository.getInventoryByVariantId(variantId);
    return { variantId, stock: inventory ? inventory.stock : 0 };
  },

  async decreaseStock(variantId: string, amount: number) {
    const { stock: currentStock } = await inventoryService.checkStock(variantId);
    if (currentStock < amount) {
      throw new Error(`Stock insuficiente. Disponible: ${currentStock}`);
    }
    const newStock = currentStock - amount;
    return await inventoryService.updateInventoryStock(variantId, newStock);
  },

  async increaseStock(variantId: string, amount: number) {
    const { stock: currentStock } = await inventoryService.checkStock(variantId);
    const newStock = currentStock + amount;
    return await inventoryService.updateInventoryStock(variantId, newStock);
  },

  async getAllInventory() {
    try {
      return await inventoryRepository.getAllProductsWithInventory();
    } catch (error: any) {
      throw new Error(`Error al obtener el inventario: ${error.message}`);
    }
  },

  async updateInventoryStock(variantId: string, stock: number) {
    if (stock < 0) throw new Error('El stock no puede ser negativo');
    try {
      return await inventoryRepository.createOrUpdateStock(variantId, stock);
    } catch (error: any) {
      throw new Error(`Error al actualizar stock: ${error.message}`);
    }
  },

  async getDashboardData() {
    const [totalStock, lowStockItems] = await Promise.all([
      inventoryRepository.getTotalStock(),
      inventoryRepository.getLowStockItems(10)
    ]);
    return { totalStock, lowStockItems };
  }
};

export default inventoryService;
