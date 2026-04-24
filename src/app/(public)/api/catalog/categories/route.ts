import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET() {
  return await categoryController.getAllCategories();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return await categoryController.createCategory(data);
  } catch (error) {
    return await categoryController.createCategory({});
  }
}
