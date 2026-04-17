import { SalesRepository } from '../repositories/sales.repository';
// import { InventoryService } from '@/core/modules/inventory/services/inventory.service';
// import { VariantService } from '@/core/modules/catalog/services/variant.service';
import { PaymentMethod } from '@prisma/client';

export interface SaleItemData {
  variantId: string;
  quantity: number;
}

export interface CreateSaleDTO {
  items: SaleItemData[];
  customerId?: string;
  total: number;
  paymentMethod: PaymentMethod;
}

export class SalesService {
  private repository: SalesRepository;
  // private inventoryService: InventoryService;
  // private variantService: VariantService;

  constructor() {
    this.repository = new SalesRepository();
    // this.inventoryService = new InventoryService();
    // this.variantService = new VariantService();
  }

  async registerSale(tenantId: string, userId: string, saleData: CreateSaleDTO) {
    // 1. Transactional operation is better handled in the repository down to Prisma
    // For now we pass all data to repo to handle atomic operations
    const newSale = await this.repository.createSale(tenantId, userId, saleData);

    // TODO: Incrementar popularidad
    // await this.variantService.incrementPopularity(saleData.variantId, saleData.amount);

    return newSale;
  }

  async getAllSales(tenantId: string) {
    try {
      return await this.repository.getSalesByTenant(tenantId);
    } catch (error: any) {
      throw new Error(`Error al obtener ventas: ${error.message}`);
    }
  }
}
