import variantController from '@/core/modules/catalog/controllers/variant.controller';

export async function GET(req: Request) {
  return await variantController.getAllVariants();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return await variantController.createVariant(data);
  } catch (error) {
    return await variantController.createVariant({});
  }
}