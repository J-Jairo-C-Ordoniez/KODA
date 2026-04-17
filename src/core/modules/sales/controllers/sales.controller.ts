import { NextResponse } from 'next/server';
import { SalesService } from '../services/sales.service';
import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';

const saleSchema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive(),
  })),
  customerId: z.string().optional(),
  total: z.number().positive(),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export class SalesController {
  private service: SalesService;

  constructor() {
    this.service = new SalesService();
  }

  async createSale(req: Request, tenantId: string, userId: string) {
    try {
      const body = await req.json();
      const parseResult = saleSchema.safeParse(body);

      if (!parseResult.success) {
        return NextResponse.json({ success: false, error: 'Datos de venta inválidos', details: parseResult.error.errors }, { status: 400 });
      }

      const saleData = parseResult.data;

      // Business rule: si es fiado, customerId es obligatorio
      if (saleData.paymentMethod === PaymentMethod.debt && !saleData.customerId) {
        return NextResponse.json({ success: false, error: 'Un fiado requiere seleccionar un cliente' }, { status: 400 });
      }

      const sale = await this.service.registerSale(tenantId, userId, saleData);
      return NextResponse.json({ success: true, data: sale }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getSales(tenantId: string) {
    try {
      const sales = await this.service.getAllSales(tenantId);
      return NextResponse.json({ success: true, data: sales }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}
