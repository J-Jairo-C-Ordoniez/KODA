import { CatalogController } from '@/core/modules/catalog/controllers/catalog.controller';

const controller = new CatalogController();

export async function GET(req, { params }) {
  const { id } = await params;
  return controller.getVariantById(req, id);
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  return controller.updateVariant(req, id);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return controller.deleteVariant(req, id);
}
