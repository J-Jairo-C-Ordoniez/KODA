import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') || '';
  return await categoryController.getAllCategories(tenantId);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const tenantId = data.tenantId || '';
    return await categoryController.createCategory(tenantId, data);
  } catch (error) {
    return await categoryController.createCategory('', {});
  }
}
