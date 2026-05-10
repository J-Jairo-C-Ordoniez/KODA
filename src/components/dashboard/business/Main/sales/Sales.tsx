'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCart, Search, Download } from 'lucide-react';
import { useSales } from '@/hooks/employee/useSales';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
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
  const tenantId = session?.user?.tenantId;
  const { sales, variants, isLoading, isSaving, error, fetchSalesData, saveSale } = useSales(tenantId);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState<any>(null);
  const [newSaleId, setNewSaleId] = useState<string | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => { 
    fetchSalesData(); 
  }, [fetchSalesData]);

  useEffect(() => {
    if (searchParams.get('newSale') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleSaleSubmit = async (data: any) => {
    const result = await saveSale(data);
    if (result.success) {
      setIsModalOpen(false);
      showToast('success', 'Venta registrada', 'La transacción se completó con éxito.');
      if (result.data?.saleId) {
        setNewSaleId(result.data.saleId);
        setTimeout(() => setNewSaleId(null), 5000);
      }
    } else {
      showToast('error', 'Error al registrar venta', result.error || 'No se pudo completar la operación.');
    }
  };

  const totalRevenue = sales.reduce((acc: number, sale: any) => acc + Number(sale.total), 0);
  const filteredSales = sales.filter((s: any) => 
    s.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader
        title="Historial de Ventas"
        subtitle="Consulta y analiza todas las transacciones de tu negocio."
      />

      {!isLoading && <SalesStats sales={sales} totalRevenue={totalRevenue} />}

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
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nueva Venta"
        size="2xl"
      >
        <SaleForm
          variants={variants}
          onSubmit={handleSaleSubmit}
          onCancel={() => setIsModalOpen(false)}
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
