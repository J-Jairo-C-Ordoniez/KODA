'use client';

import React from 'react';
import Header from '@/features/storefront/components/Header/Header';
import SearchMain from '@/features/storefront/components/others/search/SearchMain';
import Footer from '@/features/storefront/components/Footer/Footer';
import Loader from '@/shared/components/Loader';
import { useTenantBySlug } from '@/features/storefront/hooks/useTenantBySlug';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SearchPage({ params }: Props) {
  const { slug } = React.use(params);
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
      <SearchMain tenantId={tenant.tenantId} />
      <Footer />
    </>
  );
}
