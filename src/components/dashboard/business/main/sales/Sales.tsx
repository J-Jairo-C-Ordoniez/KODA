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
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader
        title="Historial de Ventas"
        subtitle="Consulta y analiza todas las transacciones de tu negocio."
        action={
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-navy transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar venta..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[280px]"
              />
            </div>
            <button className="p-3 rounded-2xl bg-foreground/5 text-secondary hover:bg-navy hover:text-white transition-all shadow-sm" aria-label="Descargar reporte">
              <Download size={20} />
            </button>
          </div>
        }
      />

      {!isLoading && <SalesStats sales={sales} totalRevenue={totalRevenue} />}

      {isLoading ? <Loader size="lg" className="h-[40vh]" /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredSales.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="Sin ventas" description="No hay registros que coincidan con tu búsqueda." />
      ) : (
        <SalesTable 
          sales={filteredSales} 
          newSaleId={newSaleId} 
          onViewInvoice={setSelectedSaleForInvoice} 
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
