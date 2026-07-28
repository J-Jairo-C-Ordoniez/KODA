import tenantController from '@/core/modules/tenants/controllers/tenant.controller';
import AboutView from '@/features/store/components/main/sections/About/AboutView';
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
    return { title: 'Información no disponible' };
  }

  return {
    title: `Sobre Nosotros y Contacto | ${tenant.businessName}`,
    description: tenant.description || `Información institucional y canales de atención de ${tenant.businessName}.`,
  };
}

export default async function AboutPage({ params }: Props) {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant || tenant.status === 'suspended') {
    redirect('/');
  }

  return <AboutView tenant={tenant} slug={slug} />;
}
