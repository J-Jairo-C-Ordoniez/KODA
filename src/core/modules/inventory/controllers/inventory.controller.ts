import { apiResponse } from '@/core/utils/apiResponse';
import inventoryService from '../services/inventory.service';

const inventoryController = {
  async getStock(variantId: string) {
    try {
      if (!variantId) {
        return apiResponse.error('Falta variantId', 400);
      }

      const stockData = await inventoryService.checkStock(variantId);
      return apiResponse.success(stockData);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener stock', 500);
    }
  },

  async getDashboardInventory() {
    try {
      const inventory = await inventoryService.getAllInventory();
      return apiResponse.success(inventory);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al obtener inventario', 500);
    }
  },

  async updateStock(data: any) {
    try {
      const { variantId, stock } = data;
      if (!variantId || stock === undefined) {
        return apiResponse.error('Faltan datos requeridos (variantId, stock)', 400);
      }
      const updated = await inventoryService.updateInventoryStock(variantId, stock);
      return apiResponse.success(updated);
    } catch (error: any) {
      return apiResponse.error(error.message || 'Error al actualizar stock', 500);
    }
  }
};

export default inventoryController;
