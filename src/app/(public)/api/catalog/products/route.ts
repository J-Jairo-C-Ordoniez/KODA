import { CatalogController } from '@/core/modules/catalog/controllers/catalog.controller';

const controller = new CatalogController();

export async function POST(req) {
  return controller.createProduct(req);
}
