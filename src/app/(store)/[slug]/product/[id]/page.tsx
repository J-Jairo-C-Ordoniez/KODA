'use client';

import React from 'react';
import Header from '@/components/store/Header/Header';
import Footer from '@/components/store/Footer/Footer';
import ProductDetail from '@/components/store/others/product/ProductDetail';
import { redirect } from 'next/navigation';
import tenantController from '@/core/modules/tenants/controllers/tenant.controller';
import catalogController from '@/core/modules/catalog/controllers/catalog.controller';
import { useTenantBySlug } from '@/hooks/publicCatalog/useTenantBySlug';
import Loader from '@/components/ui/Loader';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string, id: string }>;
}

// Keep SEO metadata generation on the server layer
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  // Follow flow: Controller -> Service -> Repository
  const response = await catalogController.getVariantById(id);
  const variant = (response as any).success ? (response as any).data : null;

  if (!variant) return { title: "Producto no encontrado" };

  return {
    title: `${variant.product.name} - ${variant.name} | Catálogo`,
    description: variant.product.description || `Ver detalles de ${variant.product.name} en nuestra tienda.`,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const { slug, id } = React.use(params);
  // Follow flow: Component -> Hook -> API -> Controller -> Service -> Repository
  const { tenant, isLoading } = useTenantBySlug(slug);

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center bg-background"><Loader size="lg" /></div>;

  if (!tenant || tenant.status === 'suspended') {
      return redirect("/");
  }

  return (
    <>
      <Header 
        businessName={tenant.businessName}
        slug={tenant.slug}
        tenantId={tenant.tenantId}
      />
      <main className="flex-1">
        <ProductDetail variantId={id} contact={tenant.whatsApp} />
      </main>
      <Footer />
    </>
  );
}


