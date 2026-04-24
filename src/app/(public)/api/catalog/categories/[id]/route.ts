import categoryController from '@/core/modules/catalog/controllers/category.controller';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  return await categoryController.getCategoryById(id);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const data = await req.json();
    return await categoryController.updateCategory(id, data);
  } catch (error) {
    return await categoryController.updateCategory(id, {});
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  return await categoryController.deleteCategory(id);
}
