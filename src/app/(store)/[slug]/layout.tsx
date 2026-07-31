import tenantController from '@/core/modules/tenants/controllers/tenant.controller';
import Header from '@/features/store/components/header/Header';
import Footer from '@/features/store/components/footer/Footer';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function StoreLayout({ children, params }: Props) {
  const { slug } = await params;
  const response = await tenantController.getTenantBySlug(slug);
  const json = (response as any).json ? await (response as any).json() : response;
  const tenant = (json as any).success ? (json as any).data : null;

  if (!tenant || tenant.status === 'suspended') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col justify-between font-sans selection:bg-contrast/30 overflow-x-hidden">
      <Header businessName={tenant.businessName} slug={slug} />
      <main className="flex-1 w-full">{children}</main>
      <Footer businessName={tenant.businessName} slug={slug} whatsApp={tenant.whatsApp} />
    </div>
  );
}
