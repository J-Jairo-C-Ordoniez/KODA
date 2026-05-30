'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useSales } from '@/hooks/employee/useSales';
import { SectionHeader } from '@/components/Dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/Dashboard/business/ui/EmptyState';
import { useDashboardStats } from '@/hooks/admin/useDashboardStats';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import Modal from '../categories/ui/Modal';
import SaleForm from './ui/SaleForm';
import InvoiceModal from './ui/InvoiceModal';
import { Toaster, useToast } from '@/components/ui/Toast';
import { SalesStats } from './ui/SalesStats';
import { SalesTable } from './ui/SalesTable';

export default function Sales() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tenantId = session?.user?.tenantId;
  const { sales, variants, isLoading, isSaving, error, page, hasMore, fetchSalesData, saveSale } = useSales(tenantId);
  const { stats, fetchStats } = useDashboardStats();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState<any>(null);
  const [newSaleId, setNewSaleId] = useState<string | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => { 
    fetchSalesData(); 
    fetchStats();
  }, [fetchSalesData, fetchStats]);

  useEffect(() => {
    if (searchParams.get('newSale') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (searchParams.has('newSale')) {
      router.replace(pathname, { scroll: false });
    }
  };

  const handleSaleSubmit = async (data: any) => {
    const result = await saveSale(data);
    if (result.success) {
      handleCloseModal();
      showToast('success', 'Venta registrada', 'La transacción se completó con éxito.');
      fetchStats();
      if (result.data?.saleId) {
        setNewSaleId(result.data.saleId);
        setTimeout(() => setNewSaleId(null), 5000);
      }
    } else {
      showToast('error', 'Error al registrar venta', result.error || 'No se pudo completar la operación.');
    }
  };

  const totalRevenue = sales.reduce((acc: number, sale: any) => acc + Number(sale.total), 0);
  const filteredSales = sales.filter((s: any) => {
    const term = searchTerm.toLowerCase();
    if (s.saleId.toString().includes(term)) return true;
    if (s.user?.name?.toLowerCase().includes(term)) return true;
    if (s.customer?.name?.toLowerCase().includes(term)) return true;
    return s.items?.some((item: any) => 
        item.variant?.product?.name?.toLowerCase().includes(term) ||
        item.variant?.name?.toLowerCase().includes(term)
    );
  });

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader
        title="Historial de Ventas"
        subtitle="Consulta y analiza todas las transacciones de tu negocio."
      />

      {!isLoading && stats && <SalesStats stats={stats} />}

      {isLoading ? <Loader size="lg" className="h-[40vh]" /> : error ? (
        <p role="alert" className="text-red-400 text-sm font-medium bg-red-500/8 p-4 rounded-2xl border border-red-500/15">{error}</p>
      ) : filteredSales.length === 0 && !searchTerm ? (
        <EmptyState icon={ShoppingCart} title="Sin ventas" description="No hay registros en el historial todavía." />
      ) : (
        <SalesTable 
          sales={filteredSales} 
          newSaleId={newSaleId} 
          onViewInvoice={setSelectedSaleForInvoice}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          hasMore={hasMore || false}
          loading={isLoading}
          page={page}
          onPageChange={(newPage) => fetchSalesData(newPage)}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Registrar Nueva Venta"
        size="2xl"
      >
        <SaleForm
          variants={variants}
          onSubmit={handleSaleSubmit}
          onCancel={handleCloseModal}
          submitting={isSaving}
        />
      </Modal>

      {selectedSaleForInvoice && (
        <InvoiceModal 
          sale={selectedSaleForInvoice} 
          onClose={() => setSelectedSaleForInvoice(null)} 
        />
      )}
    </main>
  );
}
