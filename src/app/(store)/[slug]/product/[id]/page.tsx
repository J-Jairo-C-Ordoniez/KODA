import tenantController from '@/core/modules/tenants/controllers/tenant.controller';
import catalogController from '@/core/modules/catalog/controllers/catalog.controller';
import ProductDetailView from '@/features/store/components/main/sections/Product/ProductDetailView';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await catalogController.getVariantById(id);
  const json = (response as any).json ? await (response as any).json() : response;
  const variant = (json as any).success ? (json as any).data : null;

  if (!variant) return { title: 'Producto no encontrado' };

  return {
    title: `${variant.product?.name || variant.name} | Detalle de Prenda`,
    description: variant.product?.description || `Ver detalles de ${variant.name} en el catálogo.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, id } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant || tenant.status === 'suspended') {
    redirect('/');
  }

  return <ProductDetailView tenant={tenant} slug={slug} variantId={id} />;
}
