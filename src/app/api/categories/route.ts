import { CategoryController } from '@/core/modules/catalog/controllers/category.controller';

export async function GET() {
  const controller = new CategoryController();
  return controller.getAllCategories();
}

export async function POST(req) {
  const controller = new CategoryController();
  return controller.createCategory(req);
}
