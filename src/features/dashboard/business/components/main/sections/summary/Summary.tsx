'use client';

import { useState } from "react";
import { LayoutIcon, WalletIcon, PackageIcon, StorefrontIcon, SidebarIcon } from "@phosphor-icons/react";

import Sidebar from "@/features/dashboard/business/components/main/sections/summary/Sidebar/Sidebar";
import SummaryMain from "@/features/dashboard/business/components/main/sections/summary/Main/Main";
import useSidebarStats from "@/features/dashboard/business/hooks/useSidebarStats";

export default function SummaryPage() {
  const [activeTab, setActiveTab] = useState("view-general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data } = useSidebarStats();

  const sections = [
    {
      id: "general",
      items: [
        {
          id: "view-general",
          label: "General",
          icon: LayoutIcon,
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
          icon: WalletIcon,
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
          icon: PackageIcon,
          count: data?.lowStockItems?.totalLowStockItems ?? 0,
          isActive: activeTab === "inventory",
          onClick: () => {
            setActiveTab("inventory");
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          },
        },
      ],
    }
  ];

  return (
    <div className="flex w-full bg-background relative min-h-screen">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 md:pt-8 custom-scrollbar transition-all duration-300">
        <div className="w-full space-y-6 overflow-hidden">
          <SummaryMain activeTab={activeTab} />
        </div>
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-4 lg:right-6 z-110 p-2 text-primary hover:bg-primary/5 rounded-xl border border-transparent hover:border-primary/10 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer bg-background md:bg-transparent shadow-sm md:shadow-none"
        title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        aria-label="Alternar menú lateral"
      >
        <SidebarIcon size={20} className={isSidebarOpen ? "rotate-180" : ""} />
      </button>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`shrink-0 transition-all duration-300 border-l border-primary/10 bg-background 
          fixed inset-y-0 right-0 z-50 w-50
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${isSidebarOpen ? "md:w-80 md:opacity-100" : "md:w-0 md:opacity-0 md:overflow-hidden md:border-l-0"}
        `}
      >
        <Sidebar
          mainTitle="Resumen"
          sections={sections}
        />
      </div>
    </div>
  );
}