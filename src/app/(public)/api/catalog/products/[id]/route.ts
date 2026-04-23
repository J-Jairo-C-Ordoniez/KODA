import { CatalogController } from '@/core/modules/catalog/controllers/catalog.controller';

const controller = new CatalogController();

export async function GET(req, { params }) {
  const { id } = await params;
  return controller.getProductById(req, id);
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  return controller.updateProduct(req, id);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return controller.deleteProduct(req, id);
}
