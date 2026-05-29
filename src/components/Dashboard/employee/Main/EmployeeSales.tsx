'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  ShoppingCart, Calendar, CreditCard, FileText, Search,
  TrendingUp, ArrowUpRight, Wallet, Package, Star
} from 'lucide-react';
import { useSales } from '@/hooks/employee/useSales';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import Modal from '@/components/dashboard/business/Main/categories/ui/Modal';
import SaleForm from '@/components/dashboard/business/Main/sales/ui/SaleForm';
import InvoiceModal from '@/components/dashboard/business/Main/sales/ui/InvoiceModal';
import { Toaster, useToast } from '@/components/ui/Toast';
import { StatCard } from '@/components/dashboard/business/ui/StatCard';
import { SalesTable } from '@/components/dashboard/business/Main/sales/ui/SalesTable';

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  debt: 'Fiado',
  online: 'Online',
};

const PAYMENT_COLORS: Record<string, string> = {
  cash: 'bg-green-50 text-green-700 border-green-100',
  transfer: 'bg-blue-50 text-blue-700 border-blue-100',
  debt: 'bg-red-50 text-red-600 border-red-100',
  online: 'bg-purple-50 text-purple-700 border-purple-100',
};

export default function EmployeeSales() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tenantId = session?.user?.tenantId;
  const { sales, variants, isLoading, isSaving, error, page, hasMore, fetchSalesData, saveSale } = useSales(tenantId);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState<any>(null);
  const [newSaleId, setNewSaleId] = useState<string | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => { fetchSalesData(); }, [fetchSalesData]);

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
      showToast('success', 'Venta registrada', 'La transacción se completó correctamente.');
      if (result.data?.saleId) {
        setNewSaleId(result.data.saleId);
        setTimeout(() => setNewSaleId(null), 5000);
      }
    } else {
      showToast('error', 'Error al registrar', result.error || 'No se pudo completar la operación.');
    }
  };

  // === Metrics ===
  const totalRevenue = sales.reduce((acc: number, s: any) => acc + Number(s.total), 0);
  const avgTicket = totalRevenue / (sales.length || 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const salesToday = sales.filter((s: any) => new Date(s.createdAt) >= today);
  const revenueToday = salesToday.reduce((acc: number, s: any) => acc + Number(s.total), 0);

  const paymentBreakdown = sales.reduce((acc: Record<string, number>, s: any) => {
    acc[s.paymentMethod] = (acc[s.paymentMethod] || 0) + 1;
    return acc;
  }, {});
  const topMethod = Object.entries(paymentBreakdown).sort((a: any, b: any) => b[1] - a[1])[0];

  const filteredSales = sales.filter((s: any) =>
    s.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(s.createdAt).toLocaleDateString('es-CO').includes(searchTerm)
  );

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative overflow-y-auto custom-scrollbar">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Mis Ventas"
        subtitle={`Bienvenido, ${session?.user?.name?.split(' ')[0] ?? 'empleado'}. Aquí tienes tu rendimiento personal.`}
      />

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Ingresos totales (pág)"
            value={`$${totalRevenue.toLocaleString('es-CO')}`}
            icon={Wallet}
            iconBg="bg-contrast/10"
            iconColor="text-contrast"
          />
          <StatCard
            label="Ventas hoy (pág)"
            value={salesToday.length}
            icon={TrendingUp}
            iconBg="bg-contrast/10"
            iconColor="text-contrast"
            change={`$${revenueToday.toLocaleString('es-CO')} generados`}
            trend="up"
          />
          <StatCard
            label="Ticket promedio"
            value={`$${avgTicket.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`}
            icon={Package}
            iconBg="bg-contrast/10"
            iconColor="text-contrast"
          />
          <StatCard
            label="Método principal"
            value={topMethod ? PAYMENT_LABELS[topMethod[0]] ?? topMethod[0] : '—'}
            icon={Star}
            iconBg="bg-contrast/10"
            iconColor="text-contrast"
            change={topMethod ? `${topMethod[1]} ventas` : 'Sin datos'}
            trend="neutral"
          />
        </div>
      )}

      {isLoading ? (
        <Loader size="lg" className="h-[40vh]" />
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col items-center gap-4">
          <p className="text-red-600 text-sm font-bold">{error}</p>
          <button 
            onClick={() => fetchSalesData()}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-black text-xs hover:bg-red-700 transition-colors"
          >
            Reintentar conexión
          </button>
        </div>
      ) : filteredSales.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Sin ventas registradas"
          description={searchTerm ? 'No hay ventas que coincidan con tu búsqueda.' : 'Aún no has registrado ninguna venta. ¡Usa el botón flotante para comenzar!'}
        />
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Registrar Nueva Venta" size="2xl">
        <SaleForm variants={variants} onSubmit={handleSaleSubmit} onCancel={handleCloseModal} submitting={isSaving} />
      </Modal>
      {selectedSaleForInvoice && (
        <InvoiceModal sale={selectedSaleForInvoice} onClose={() => setSelectedSaleForInvoice(null)} />
      )}
    </main>
  );
}
