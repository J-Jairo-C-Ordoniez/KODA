import { CatalogController } from '@/core/modules/catalog/controllers/catalog.controller';

const controller = new CatalogController();

export async function GET(req) {
  return controller.getAllVariants(req);
}

export async function POST(req) {
  return controller.createVariant(req);
}