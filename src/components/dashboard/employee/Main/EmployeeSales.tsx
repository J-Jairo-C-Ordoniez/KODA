'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const tenantId = session?.user?.tenantId;
  const { sales, variants, isLoading, isSaving, error, fetchSalesData, saveSale } = useSales(tenantId);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState<any>(null);
  const [newSaleId, setNewSaleId] = useState<string | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => { fetchSalesData(); }, [fetchSalesData]);

  useEffect(() => {
    if (searchParams.get('newSale') === 'true') setIsModalOpen(true);
  }, [searchParams]);

  const handleSaleSubmit = async (data: any) => {
    const result = await saveSale(data);
    if (result.success) {
      setIsModalOpen(false);
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
  const topMethod = Object.entries(paymentBreakdown).sort((a, b) => b[1] - a[1])[0];

  const filteredSales = sales.filter((s: any) =>
    s.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(s.createdAt).toLocaleDateString('es-CO').includes(searchTerm)
  );

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Mis Ventas"
        subtitle={`Bienvenido, ${session?.user?.name?.split(' ')[0] ?? 'empleado'}. Aquí tienes tu rendimiento personal.`}
        action={
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input
              type="text"
              placeholder="Buscar por cliente o fecha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[260px]"
            />
          </div>
        }
      />

      {/* === Metrics Grid === */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Ingresos totales */}
          <div className="bg-navy rounded-[28px] p-7 text-white shadow-xl shadow-navy/20 relative overflow-hidden group xl:col-span-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-14 -mt-14 transition-transform group-hover:scale-110" />
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <Wallet size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Ingresos Totales</p>
            <h4 className="text-2xl font-black">${totalRevenue.toLocaleString('es-CO')}</h4>
            <p className="text-xs opacity-50 mt-1 font-medium">{sales.length} ventas en total</p>
          </div>

          {/* Ventas hoy */}
          <div className="bg-background border border-foreground/5 rounded-[28px] p-7 space-y-3 hover:shadow-xl hover:shadow-navy/5 transition-all group">
            <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center group-hover:bg-navy transition-colors">
              <TrendingUp size={20} className="text-navy group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">Ventas Hoy</p>
              <h4 className="text-2xl font-black text-primary">{salesToday.length}</h4>
              <p className="text-xs font-bold text-secondary mt-0.5">${revenueToday.toLocaleString('es-CO')} generados</p>
            </div>
          </div>

          {/* Ticket promedio */}
          <div className="bg-background border border-foreground/5 rounded-[28px] p-7 space-y-3 hover:shadow-xl hover:shadow-navy/5 transition-all group">
            <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center group-hover:bg-navy transition-colors">
              <Package size={20} className="text-navy group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">Ticket Promedio</p>
              <h4 className="text-2xl font-black text-primary">
                ${avgTicket.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
              </h4>
              <p className="text-xs font-bold text-secondary mt-0.5">Valor medio por venta</p>
            </div>
          </div>

          {/* Método preferido */}
          <div className="bg-background border border-foreground/5 rounded-[28px] p-7 space-y-3 hover:shadow-xl hover:shadow-navy/5 transition-all group">
            <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center group-hover:bg-navy transition-colors">
              <Star size={20} className="text-navy group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">Método Top</p>
              <h4 className="text-xl font-black text-primary">
                {topMethod ? PAYMENT_LABELS[topMethod[0]] ?? topMethod[0] : '—'}
              </h4>
              <p className="text-xs font-bold text-secondary mt-0.5">
                {topMethod ? `${topMethod[1]} de ${sales.length} ventas` : 'Sin datos'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === Sales Table === */}
      {isLoading ? (
        <Loader size="lg" className="h-[40vh]" />
      ) : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredSales.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Sin ventas registradas"
          description={searchTerm ? 'No hay ventas que coincidan con tu búsqueda.' : 'Aún no has registrado ninguna venta. ¡Usa el botón flotante para comenzar!'}
        />
      ) : (
        <div className="bg-background border border-foreground/10 rounded-[40px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-foreground/[0.02] border-b border-foreground/5">
                  <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Fecha / Hora</th>
                  <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Cliente</th>
                  <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Método</th>
                  <th className="text-right px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Total</th>
                  <th className="text-center px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Factura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {filteredSales.map((sale: any) => (
                  <tr
                    key={sale.saleId}
                    className={`hover:bg-foreground/[0.01] transition-all duration-1000 group ${
                      newSaleId === sale.saleId ? 'bg-green-50 ring-2 ring-green-500 ring-inset animate-pulse' : ''
                    }`}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-secondary group-hover:bg-navy/10 group-hover:text-navy transition-colors">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{new Date(sale.createdAt).toLocaleDateString('es-CO')}</p>
                          <p className="text-[10px] font-medium text-secondary">{new Date(sale.createdAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-secondary">
                      {sale.customer?.name || <span className="opacity-40 italic">Consumidor Final</span>}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2 w-fit border ${PAYMENT_COLORS[sale.paymentMethod] ?? 'bg-foreground/5 text-secondary border-foreground/10'}`}>
                        <CreditCard size={12} />
                        {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <p className="text-lg font-black text-primary">${Number(sale.total).toLocaleString('es-CO')}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() => setSelectedSaleForInvoice(sale)}
                        className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-sm mx-auto"
                        title="Ver Factura"
                      >
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sale Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nueva Venta" size="2xl">
        <SaleForm variants={variants} onSubmit={handleSaleSubmit} onCancel={() => setIsModalOpen(false)} submitting={isSaving} />
      </Modal>

      {/* Invoice Modal */}
      {selectedSaleForInvoice && (
        <InvoiceModal sale={selectedSaleForInvoice} onClose={() => setSelectedSaleForInvoice(null)} />
      )}
    </main>
  );
}
