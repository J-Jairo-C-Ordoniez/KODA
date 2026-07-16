'use client';

import { useState } from "react";
import Sidebar from "@/features/dashboard/business/components/main/sections/summary/Sidebar/Sidebar";
import SummaryMain from "./Main/ui/Main";
import { useDashboardStats } from "@/features/dashboard/business/hooks/useDashboardStats";
import { LayoutDashboard, Wallet, Package, Store, Sidebar as SidebarIcon } from "lucide-react";

export default function SummaryPage() {
  const [activeTab, setActiveTab] = useState("view-general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { sidebarStats, tabData, isLoadingSidebar, isLoadingTab } = useDashboardStats(activeTab);

  const sections = [
    {
      id: "general",
      items: [
        {
          id: "view-general",
          label: "General",
          icon: LayoutDashboard,
          count: sidebarStats?.salesToday?.totalOrders ?? 0,
          isActive: activeTab === "view-general",
          onClick: () => setActiveTab("view-general"),
        },
      ],
    },
    {
      id: "control",
      title: "Control",
      items: [
        {
          id: "finances",
          label: "Finanzas",
          icon: Wallet,
          count: sidebarStats?.debtCustomers?.totalCustomersWithDebt ?? 0,
          isActive: activeTab === "finances",
          onClick: () => setActiveTab("finances"),
        },
        {
          id: "inventory",
          label: "Inventario",
          icon: Package,
          count: sidebarStats?.lowStockItems?.totalLowStockItems ?? 0,
          isActive: activeTab === "inventory",
          onClick: () => setActiveTab("inventory"),
        },
      ],
    },
    {
      id: "config",
      title: "Configuración",
      items: [
        {
          id: "my-store",
          label: "Tienda",
          icon: Store,
          isActive: activeTab === "my-store",
          onClick: () => setActiveTab("my-store"),
        },
      ],
    },
  ];

  return (
    <div className="flex h-full w-full min-h-screen relative overflow-hidden border border-red-800 bg-red-500">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 left-2 z-50 p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
        title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        aria-label="Alternar menú lateral"
      >
        <SidebarIcon size={20} />
      </button>

      <div
        className={`w-[18%] transition-all duration-300 ease-in-out h-full border-r border-primary/5 shrink-0`}>
        <Sidebar
          mainTitle="Resumen"
          sections={sections}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8 custom-scrollbar border">
        <div className="max-w-7xl mx-auto space-y-6">
          <SummaryMain
            activeTab={activeTab}
            // Pasamos los datos específicos de la pestaña y los generales combinados si es necesario
            stats={{ ...sidebarStats, ...tabData }}
            isLoading={isLoadingTab}
          />
        </div>
      </div>
    </div>
  );
}