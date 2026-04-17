import { NextResponse } from 'next/server';
import { InventoryService } from '../services/inventory.service';

export class InventoryController {
  constructor() {
    this.service = new InventoryService();
  }

  async getStock(req) {
    try {
      const { searchParams } = new URL(req.url);
      const variantId = searchParams.get('variantId');

      if (!variantId) {
        return NextResponse.json({ success: false, error: 'Falta variantId' }, { status: 400 });
      }

      const stockData = await this.service.checkStock(variantId);
      return NextResponse.json({ success: true, data: stockData }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getDashboardInventory(req) {
    try {
      const inventory = await this.service.getAllInventory();
      return NextResponse.json({ success: true, data: inventory }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async updateStock(req) {
    try {
      const data = await req.json();
      const { variantId, stock } = data;
      const updated = await this.service.updateInventoryStock(variantId, stock);
      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
