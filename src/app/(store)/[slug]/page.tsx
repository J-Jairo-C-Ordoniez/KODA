import tenantController from '@/backend/crossCutting/tenants/controllers/tenant.controller';
import Catalog from '@/features/store/components/main/sections/catalog/Catalog';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant || tenant.status === 'suspended') {
    return { title: 'Tienda no disponible' };
  }

  return {
    title: tenant.businessName,
    description: tenant.description || `Explora las prendas de ${tenant.businessName}.`,
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant || tenant.status === 'suspended') {
    redirect('/');
  }

  return (
    <Catalog
      tenant={tenant}
      slug={slug}
    />
  )
}
