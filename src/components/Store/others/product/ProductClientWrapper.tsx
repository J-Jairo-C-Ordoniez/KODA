'use client';

import React from 'react';
import Header from '@/components/Store/Header/Header';
import Footer from '@/components/Store/Footer/Footer';
import ProductDetail from '@/components/Store/others/product/ProductDetail';
import { redirect } from 'next/navigation';
import { useTenantBySlug } from '@/hooks/publicCatalog/useTenantBySlug';
import Loader from '@/components/ui/Loader';

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
