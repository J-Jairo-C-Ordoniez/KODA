'use client';

import { useState } from "react";
import { LayoutDashboard, Wallet, Package, Store, Sidebar as SidebarIcon } from "lucide-react";

import Sidebar from "@/features/dashboard/business/components/main/sections/summary/Sidebar/Sidebar";
import SummaryMain from "@/features/dashboard/business/components/main/sections/summary/Main/Main";
import useSidebarStats from "@/features/dashboard/business/hooks/useSidebarStats";

export default function SummaryPage() {
  const [activeTab, setActiveTab] = useState("finances");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data } = useSidebarStats();

  const sections = [
    {
      id: "general",
      items: [
        {
          id: "view-general",
          label: "General",
          icon: LayoutDashboard,
          count: data?.salesToday?.totalOrders ?? 0,
          isActive: activeTab === "view-general",
          onClick: () => {
            setActiveTab("view-general");
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          },
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
          count: data?.debtCustomers?.totalCustomersWithDebt ?? 0,
          isActive: activeTab === "finances",
          onClick: () => {
            setActiveTab("finances");
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          },
        },
        {
          id: "inventory",
          label: "Inventario",
          icon: Package,
          count: data?.lowStockItems?.totalLowStockItems ?? 0,
          isActive: activeTab === "inventory",
          onClick: () => {
            setActiveTab("inventory");
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          },
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
          onClick: () => {
            setActiveTab("my-store");
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          },
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 left-2 z-110 p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
        title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        aria-label="Alternar menú lateral"
      >
        <SidebarIcon size={20} />
      </button>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`shrink-0 transition-all duration-300 border-r border-primary/5 bg-background fixed inset-y-0 left-0 z-100 w-[260px] 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
          ${isSidebarOpen ? "md:w-[18%] md:opacity-100" : "md:w-0 md:opacity-0 md:overflow-hidden"}
        `}
      >
        <Sidebar
          mainTitle="Resumen"
          sections={sections}
        />
      </div>

      <div className="flex-1 min-w-0 h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">
          <SummaryMain activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}