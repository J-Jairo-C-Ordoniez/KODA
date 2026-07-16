'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { SectionHeader } from '@/features/business/dashboard/components/Summary/Main/ui/SectionHeader';
import Loader from '@/shared/components/Loader';
import { PlanStatusCard } from '../../ui/PlanStatusCard';
import { DigitalStoreCTA } from '../../ui/DigitalStoreCTA';
import { DashboardStats } from '@/features/business/dashboard/hooks/useDashboardStats';

import ViewGeneral from './Sections/ViewGeneral';
import Finances from './Sections/Finances';
import Inventory from './Sections/Inventory';

interface SummaryMainProps {
  activeTab: string;
  stats: DashboardStats | null;
  isLoading: boolean;
}

export default function SummaryMain({ activeTab, stats, isLoading }: SummaryMainProps) {
  const { data: session } = useSession();
  const [shareOpen, setShareOpen] = useState(false);

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  return (
    <main className="space-y-8">
      {activeTab === "view-general" && (
        <ViewGeneral stats={stats} />
      )}

      {activeTab === "finances" && (
        <Finances stats={stats} />
      )}

      {activeTab === "inventory" && (
        <Inventory stats={stats} />
      )}

      {activeTab === "my-store" && (
        <>
          <SectionHeader
            title="Mi Tienda"
            subtitle="Administra la facturación de tu plataforma y el catálogo público digital."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SaaS Plan Widget (Capa 0) */}
            <div>
              <PlanStatusCard subscription={stats?.subscription ?? null} />
            </div>

            {/* Digital Store Escaparate (Capa 7) */}
            <div className="flex flex-col gap-6">
              <DigitalStoreCTA
                tenantSlug={session?.user?.tenantSlug}
                onShare={() => setShareOpen(true)}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
