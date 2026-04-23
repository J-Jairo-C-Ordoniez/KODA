import catalogController from "@/core/modules/catalog/controllers/catalog.controller";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const tenantId = searchParams.get('tenantId');

  if (action === 'categories') {
    const categories = await catalogController.getCategories(tenantId);
    return NextResponse.json(categories);
  }

  if (action === 'colors') {
    const colors = await catalogController.getColors(tenantId);
    return NextResponse.json(colors);
  }

  /* if (action === 'popular') {
    return catalogController.getPopularVariants(req);
  } */

  /* if (action === 'dashboard') {
    return catalogController.getDashboardCatalog();
  } */

  /* return catalogController.getProducts(req); */
}
