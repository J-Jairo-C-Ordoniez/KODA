import { useState, useCallback, useEffect } from 'react';
import {
  fetchSidebarStatsApi,
  fetchGeneralStatsApi,
  fetchFinanceStatsApi,
  fetchConfigStatsApi
} from '@/features/dashboard/business/api/dashboard.api';

// Interfaces... (Mantenlas tal cual me las pasaste, añade las necesarias)
export interface SidebarStats {
  salesToday: { totalRevenue: number; totalOrders: number };
  debtCustomers: { totalCustomersWithDebt: number };
  lowStockItems: { totalLowStockItems: number };
}

export function useDashboardStats(activeTab: string) {
  // Estados divididos
  const [sidebarStats, setSidebarStats] = useState<SidebarStats | null>(null);
  const [tabData, setTabData] = useState<any | null>(null);

  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);
  const [isLoadingTab, setIsLoadingTab] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Cargar Sidebar (Se ejecuta solo al montar el componente)
  const fetchSidebar = useCallback(async () => {
    setIsLoadingSidebar(true);
    try {
      const data = await fetchSidebarStatsApi();
      setSidebarStats(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar métricas principales');
    } finally {
      setIsLoadingSidebar(false);
    }
  }, []);

  // 2. Cargar datos de la pestaña activa (Reacciona a los cambios en el menú)
  const fetchTabData = useCallback(async (tab: string) => {
    setIsLoadingTab(true);
    try {
      let data = null;
      switch (tab) {
        case 'view-general':
          data = await fetchGeneralStatsApi();
          break;
        case 'finances':
          data = await fetchFinanceStatsApi();
          break;
        case 'inventory':
          // Llama a tu fetchInventoryStatsApi cuando lo crees
          data = {};
          break;
        case 'my-store':
          data = await fetchConfigStatsApi();
          break;
        default:
          break;
      }
      setTabData(data);
    } catch (err: any) {
      setError(err.message || `Error al cargar la sección ${tab}`);
    } finally {
      setIsLoadingTab(false);
    }
  }, []);

  // Efectos para disparar las cargas
  useEffect(() => {
    fetchSidebar();
  }, [fetchSidebar]);

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  return { sidebarStats, tabData, isLoadingSidebar, isLoadingTab, error };
}