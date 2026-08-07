export interface UpdateStockDTO {
  variantId: string;
  stock: number;
}

export interface StockCheckResult {
  variantId: string;
  stock: number;
}
