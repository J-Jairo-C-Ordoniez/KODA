'use client';

import React from 'react';
import Header from '@/features/storefront/components/Header/Header';
import Footer from '@/features/storefront/components/Footer/Footer';
import ProductDetail from '@/features/storefront/components/others/product/ProductDetail';
import { redirect } from 'next/navigation';
import { useTenantBySlug } from '@/features/storefront/hooks/useTenantBySlug';
import Loader from '@/shared/components/Loader';

interface Props {
  slug: string;
  variantId: string;
}

export default function ProductClientWrapper({ slug, variantId }: Props) {
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
        <ProductDetail variantId={variantId} contact={tenant.whatsApp} />
      </main>
      <Footer />
    </>
  );
}
