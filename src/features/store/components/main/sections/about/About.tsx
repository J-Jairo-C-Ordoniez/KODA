'use client';

import { useStoreInfo } from '@/features/store/hooks/useStoreInfo';
import Loader from '@/shared/components/Loader';
import AboutHero from './ui/AboutHero';
import AboutWhatsAppContact from './ui/AboutWhatsAppContact';
import AboutShippingInfo from './ui/AboutShippingInfo';

interface Props {
  tenant: any;
  slug: string;
}

export default function AboutView({ tenant }: Props) {
  const { info, isLoading } = useStoreInfo(tenant.tenantId);

  if (isLoading) {
    return (
      <div 
        role="status" 
        aria-live="polite"
        aria-label="Cargando información de la tienda"
        className="flex flex-col items-center justify-center py-40 gap-4"
      >
        <Loader />
      </div>
    );
  }

  const logo = info?.logo || null;

  return (
    <article 
      aria-label={`Información institucional sobre ${tenant.businessName}`}
      className="w-full px-10 md:px-40 py-12 pb-24"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <AboutHero
          businessName={tenant.businessName}
          type={tenant.type}
          description={tenant.description}
          logo={logo}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {tenant.whatsApp && (
            <AboutWhatsAppContact
              whatsApp={tenant.whatsApp}
              businessName={tenant.businessName}
            />
          )}

          <AboutShippingInfo />
        </div>
      </div>
    </article>
  );
}
