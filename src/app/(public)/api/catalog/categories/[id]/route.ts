import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  return await categoryController.getCategoryById(tenantId, id);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  try {
    const data = await req.json();
    return await categoryController.updateCategory(tenantId, id, data);
  } catch (error) {
    return await categoryController.updateCategory(tenantId, id, {});
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  return await categoryController.deleteCategory(tenantId, id);
}
