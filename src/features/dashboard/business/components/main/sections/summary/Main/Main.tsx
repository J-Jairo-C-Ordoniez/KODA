'use client';

import ViewGeneral from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/ViewGeneral';
import Finances from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/Finances';
import Inventory from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/Inventory';
import MyStore from '@/features/dashboard/business/components/main/sections/summary/Main/Sections/MyStore';

export default function SummaryMain({ activeTab }: any) {
  return (
    <main className="space-y-8">
      {activeTab === "view-general" && (
        <ViewGeneral activeTab={activeTab} />
      )}

      {activeTab === "finances" && (
        <Finances activeTab={activeTab} />
      )}

      {activeTab === "inventory" && (
        <Inventory activeTab={activeTab} />
      )}

      {activeTab === "my-store" && (
        <MyStore activeTab={activeTab} />
      )}
    </main>
  );
}
