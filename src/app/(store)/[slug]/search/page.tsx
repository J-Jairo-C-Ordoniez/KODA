import tenantController from '@/core/modules/tenants/controllers/tenant.controller';
import SearchView from '@/features/store/components/main/sections/Search/SearchView';
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
    return { title: 'Búsqueda no disponible' };
  }

  return {
    title: `Buscar en ${tenant.businessName} | Catálogo`,
    description: `Busca productos y prendas en la tienda oficial de ${tenant.businessName}.`,
  };
}

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant || tenant.status === 'suspended') {
    redirect('/');
  }

  return <SearchView tenant={tenant} slug={slug} />;
}
