import variantController from '@/core/modules/catalog/controllers/variant.controller';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') || '';
  return await variantController.getAllVariants(tenantId);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const tenantId = data.tenantId || '';
    return await variantController.createVariant(tenantId, data);
  } catch (error) {
    return await variantController.createVariant('', {});
  }
}