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
    return inventoryService.updateInventoryStock(variantId, newStock);
  },

  async increaseStock(variantId: string, amount: number) {
    const { stock: currentStock } = await inventoryService.checkStock(variantId);
    const newStock = currentStock + amount;
    return inventoryService.updateInventoryStock(variantId, newStock);
  },

  async getAllInventory(tenantId: string) {
    return inventoryRepository.getAllProductsWithInventory(tenantId);
  },

  async updateInventoryStock(variantId: string, stock: number) {
    if (stock < 0) throw new Error('El stock no puede ser negativo');
    return inventoryRepository.createOrUpdateStock(variantId, stock);
  },

  async getInventoryDashboardStats(tenantId: string) {
    const [
      totalPhysicalItems,
      totalInvestedCapital,
      criticalStockItems,
      topSales,
      stagnantItems,
      outOfStockItems
    ] = await Promise.all([
      inventoryRepository.getTotalStock(tenantId),
      inventoryRepository.getInvestedCapital(tenantId),
      inventoryRepository.getCriticalStockCount(tenantId),
      inventoryRepository.getTopSales(tenantId),
      inventoryRepository.getStagnantItems(tenantId),
      inventoryRepository.getOutOfStockItems(tenantId)
    ]);

    return {
      metrics: {
        totalPhysicalItems,
        totalInvestedCapital,
        criticalStockItems
      },
      topSales,
      stagnantItems,
      outOfStockItems
    };
  },

  async getLowStockItems(tenantId: string) {
    return inventoryRepository.getLowStockItems(tenantId);
  },

  async getZeroStockCount(tenantId: string) {
    return inventoryRepository.getZeroStockCount(tenantId);
  }
};

export default inventoryService;