import ProductClientWrapper from '@/components/store/others/product/ProductClientWrapper';
import catalogController from '@/core/modules/catalog/controllers/catalog.controller';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string, id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await catalogController.getVariantById(id);
  const json = (response as any).json ? await (response as any).json() : response;
  const variant = (json as any).success ? (json as any).data : null;

  if (!variant) return { title: "Producto no encontrado" };

  return {
    title: `${variant.product.name} - ${variant.name} | Catálogo`,
    description: variant.product.description || `Ver detalles de ${variant.product.name} en nuestra tienda.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug, id } = await params;
  return <ProductClientWrapper slug={slug} variantId={id} />;
}


