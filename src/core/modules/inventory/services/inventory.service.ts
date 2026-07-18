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

  async getAllInventory(tenantId: string) {
    try {
      return await inventoryRepository.getAllProductsWithInventory(tenantId);
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

  async getInventoryDashboardStats(tenantId: string) {
    try {
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
    } catch (error: any) {
      throw new Error(`Error al compilar las estadísticas del dashboard: ${error.message}`);
    }
  },

  async getLowStockItems(tenantId: string) {
    return inventoryRepository.getLowStockItems(tenantId);
  }
};

export default inventoryService;