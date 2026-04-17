import { CategoryController } from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req, { params }) {
  const { id } = await params;
  const controller = new CategoryController();
  return controller.getCategoryById(id);
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const controller = new CategoryController();
  return controller.updateCategory(req, id);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const controller = new CategoryController();
  return controller.deleteCategory(id);
}
