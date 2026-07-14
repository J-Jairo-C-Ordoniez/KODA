'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/features/business/dashboard/components/Summary/Sidebar/Sidebar";
import SummaryMain from "./Main/Main";
import { useDashboardStats } from "@/features/business/dashboard/hooks/useDashboardStats";
import { LayoutDashboard, Wallet, Package, Store, Sidebar as SidebarIcon } from "lucide-react";

export default function SummaryPage() {
  const { stats, isLoading, fetchStats } = useDashboardStats();
  const [activeTab, setActiveTab] = useState("view-general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const sections = [
    {
      id: "general",
      items: [
        {
          id: "view-general",
          label: "General",
          icon: LayoutDashboard,
          count: stats?.salesToday?.totalOrders ?? 0,
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
          count: stats?.debtCustomers?.totalCustomersWithDebt ?? 0,
          isActive: activeTab === "finances",
          onClick: () => setActiveTab("finances"),
        },
        {
          id: "inventory",
          label: "Inventario",
          icon: Package,
          count: stats?.lowStockItems?.totalLowStockItems ?? 0,
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
    <div className="flex h-full w-full bg-background min-h-screen relative overflow-hidden">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 left-2 z-50 p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
        title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        aria-label="Alternar menú lateral"
      >
        <SidebarIcon size={20} />
      </button>

      <div className={`transition-all duration-350 ease-in-out shrink-0 ${ isSidebarOpen ? "w-[260px] md:w-[18%] border-r border-primary/5" : "w-0 overflow-hidden"}`} >
        <Sidebar 
          mainTitle="Resumen" 
          sections={sections} 
        />
      </div>

      <div
        className={`flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 custom-scrollbar transition-all duration-350 ${
          !isSidebarOpen ? "pt-20 md:pt-8 md:pl-18" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <SummaryMain 
            activeTab={activeTab} 
            stats={stats}
            isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
