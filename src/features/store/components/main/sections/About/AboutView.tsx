'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../header/Header';
import Footer from '../../../footer/Footer';
import SidebarLeft from '../../../header/ui/SidebarLeft';
import { useStoreInfo } from '../../../../hooks/useStoreInfo';
import Loader from '@/shared/components/Loader';
import { MessageCircle, Store, MapPin, ArrowLeft } from 'lucide-react';

interface Props {
  tenant: any;
  slug: string;
}

export default function AboutView({ tenant, slug }: Props) {
  const { info, isLoading } = useStoreInfo(tenant.tenantId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex text-primary font-sans">
        <SidebarLeft slug={slug} />
        <div className="flex-1 flex flex-col justify-between">
          <Header businessName={tenant.businessName} slug={slug} categoryTitle="INFORMACIÓN" />
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader size="lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground-muted animate-pulse">
              Cargando información...
            </span>
          </div>
          <Footer businessName={tenant.businessName} slug={slug} />
        </div>
      </div>
    );
  }

  const logo = info?.logo || null;

  return (
    <div className="min-h-screen bg-background text-primary flex font-sans selection:bg-contrast/30">
      <SidebarLeft slug={slug} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header businessName={tenant.businessName} slug={slug} categoryTitle="SOBRE NOSOTROS" />

        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-10 pb-24">
          <div className="mb-8">
            <Link
              href={`/${slug}`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Volver a la tienda</span>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <div className="p-8 md:p-12 border border-foreground/10 rounded-2xl bg-foreground/[0.01] flex flex-col items-center text-center gap-6 relative overflow-hidden">
              {logo ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-foreground/10 shadow-lg">
                  <Image src={logo} alt={tenant.businessName} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast">
                  <Store size={36} />
                </div>
              )}

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-contrast">
                  Información Oficial
                </span>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-primary">
                  {tenant.businessName}.
                </h1>
              </div>

              {tenant.description && (
                <p className="text-xs font-medium text-foreground-muted leading-relaxed tracking-wider uppercase max-w-xl opacity-80">
                  {tenant.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenant.whatsApp && (
                <div className="p-8 border border-foreground/10 rounded-2xl bg-background flex flex-col justify-between gap-6 hover:border-emerald-500/40 transition-all">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <MessageCircle size={24} />
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight text-primary">
                      Atención por WhatsApp
                    </h3>
                    <p className="text-xs font-medium text-foreground-muted leading-relaxed uppercase opacity-70">
                      Contacta directamente con nuestro equipo para asesoría de tallas, envíos o ventas.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/57${tenant.whatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] text-center transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Escribir a WhatsApp
                  </a>
                </div>
              )}

              <div className="p-8 border border-foreground/10 rounded-2xl bg-background flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-contrast/10 text-contrast flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-primary">
                    Ventas & Despachos
                  </h3>
                  <p className="text-xs font-medium text-foreground-muted leading-relaxed uppercase opacity-70">
                    Despachos garantizados a nivel nacional con seguimiento de guía directo a tu WhatsApp.
                  </p>
                </div>

                <div className="pt-4 border-t border-foreground/5 text-[10px] font-mono font-bold text-foreground-muted uppercase tracking-widest">
                  ID Tienda: #{tenant.tenantId?.slice(0, 8)}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer businessName={tenant.businessName} slug={slug} whatsApp={tenant.whatsApp} />
      </div>
    </div>
  );
}
