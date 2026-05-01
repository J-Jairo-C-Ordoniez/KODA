import variantController from '@/core/modules/catalog/controllers/variant.controller';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  return await variantController.getVariantById(tenantId, id);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  try {
    const data = await req.json();
    return await variantController.updateVariant(tenantId, id, data);
  } catch (error) {
    return await variantController.updateVariant(tenantId, id, {});
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  return await variantController.deleteVariant(tenantId, id);
}