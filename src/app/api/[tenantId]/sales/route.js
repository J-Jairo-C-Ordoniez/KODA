import { SalesController } from '@/modules/sales/controllers/sales.controller';
import { CatalogController } from '@/modules/catalog/controllers/catalog.controller';

const salesController = new SalesController();
const catalogController = new CatalogController();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  if (action === 'variants') {
    return catalogController.getAllVariants(req);
  }

  return salesController.getSales();
}

export async function POST(req) {
  return salesController.createSale(req);
}
