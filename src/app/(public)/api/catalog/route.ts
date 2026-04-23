import { CatalogController } from '@/core/modules/catalog/controllers/catalog.controller';

export async function GET(req) {
  const controller = new CatalogController();
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  if (action === 'categories') {
    return controller.getCategories();
  }

  if (action === 'colors') {
    return controller.getColors();
  }

  if (action === 'popular') {
    return controller.getPopularVariants(req);
  }

  if (action === 'dashboard') {
    return controller.getDashboardCatalog();
  }

  return controller.getProducts(req);
}
