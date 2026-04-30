import catalogController from '@/core/modules/catalog/controllers/catalog.controller';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return await catalogController.getVariantById(id);
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const data = await req.json();
    return await variantController.updateVariant(id, data);
  } catch (error) {
    return await variantController.updateVariant(id, {});
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  return await variantController.deleteVariant(id);
}
