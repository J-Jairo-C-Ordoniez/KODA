import productController from '@/core/modules/catalog/controllers/product.controller';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  return await productController.getProductById(tenantId, id);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  try {
    const data = await req.json();
    return await productController.updateProduct(tenantId, id, data);
  } catch (error) {
    return await productController.updateProduct(tenantId, id, {});
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenantId = new URL(req.url).searchParams.get('tenantId') || '';
  return await productController.deleteProduct(tenantId, id);
}
