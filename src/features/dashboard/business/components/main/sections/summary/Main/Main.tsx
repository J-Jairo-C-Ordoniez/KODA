'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
/* import { SectionHeader } from '@/features/business/dashboard/components/Summary/Main/ui/SectionHeader'; */
import Loader from '@/shared/components/Loader';
/* import { PlanStatusCard } from '../../ui/PlanStatusCard';
import { DigitalStoreCTA } from '../../ui/DigitalStoreCTA'; */

import ViewGeneral from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/ViewGeneral';
import Finances from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/Finances';
import Inventory from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/Inventory';

export default function SummaryMain({ activeTab }: any) {
  const { data: session } = useSession();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <main className="space-y-8">
      {activeTab === "view-general" && (
        <ViewGeneral activeTab={activeTab} />

      )}

      {activeTab === "finances" && (
        <Finances activeTab={activeTab} />
      )}

      {/* 

      {activeTab === "inventory" && (
        <Inventory activeTab={activeTab} />
      )} */}

      {activeTab === "my-store" && (
        <>
          {/*  <SectionHeader
            title="Mi Tienda"
            subtitle="Administra la facturación de tu plataforma y el catálogo público digital."
          /> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SaaS Plan Widget (Capa 0) */}
            {/*  <div>
              <PlanStatusCard subscription={stats?.subscription ?? null} />
            </div> */}

            {/* Digital Store Escaparate (Capa 7) */}
            {/*  <div className="flex flex-col gap-6">
              <DigitalStoreCTA
                tenantSlug={session?.user?.tenantSlug}
                onShare={() => setShareOpen(true)}
              />
            </div> */}
          </div>
        </>
      )}
    </main>
  );
}
