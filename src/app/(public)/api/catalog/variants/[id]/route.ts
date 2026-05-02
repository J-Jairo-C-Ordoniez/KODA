import { apiResponse } from '@/core/utils/apiResponse';
import variantController from '@/core/modules/catalog/controllers/variant.controller';
import catalogController from '@/core/modules/catalog/controllers/catalog.controller';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Public endpoint — no tenantId or auth required
  try {
    return await catalogController.getVariantById(id);
  } catch (error: any) {
    return apiResponse.error(error.message || 'Variante no encontrada', 404);
  }
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