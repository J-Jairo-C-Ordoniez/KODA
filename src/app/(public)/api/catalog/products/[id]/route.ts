import productController from '@/core/modules/catalog/controllers/product.controller';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  return await productController.getProductById(id);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const data = await req.json();
    return await productController.updateProduct(id, data);
  } catch (error) {
    return await productController.updateProduct(id, {});
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  return await productController.deleteProduct(id);
}
