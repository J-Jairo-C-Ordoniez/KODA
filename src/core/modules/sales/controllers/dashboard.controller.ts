import { NextResponse } from 'next/server';
import { SalesService } from '../services/sales.service';
import { InventoryService } from '@/core/modules/inventory/services/inventory.service';
import { CatalogService } from '@/core/modules/catalog/services/catalog.service';

export class DashboardController {
  constructor() {
    this.salesService = new SalesService();
    this.inventoryService = new InventoryService();
    this.catalogService = new CatalogService();
  }

  async getStats() {
    try {
      const [
        salesData,
        inventoryData,
        topProducts
      ] = await Promise.all([
        this.salesService.getDashboardMetrics(),
        this.inventoryService.getDashboardData(),
        this.catalogService.getPopularVariants(5)
      ]);

      return NextResponse.json({
        success: true,
        data: {
          sales: salesData,
          inventory: inventoryData,
          topProducts
        }
      }, { status: 200 });
    } catch (error) {
      console.error('Error in DashboardController:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
  }
}
