import { PaymentMethod } from '@prisma/client';

export interface SaleItemInput {
  variantId: string;
  quantity: number;
}

export interface CreateSaleInput {
  items: SaleItemInput[];
  customerId?: string | null;
  total?: number;
  paymentMethod: PaymentMethod;
}

export interface CreateSaleDTO {
  items: SaleItemInput[];
  customerId?: string;
  total?: number;
  paymentMethod: PaymentMethod;
}
