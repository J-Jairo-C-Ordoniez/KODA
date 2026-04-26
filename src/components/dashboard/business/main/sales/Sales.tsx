'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCart, Calendar, User, CreditCard, ArrowUpRight, Filter, Search, Download, Plus, FileText } from 'lucide-react';
import { useSales } from '@/hooks/employee/useSales';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import Modal from '../categories/ui/Modal';
import SaleForm from './ui/SaleForm';
import InvoiceModal from './ui/InvoiceModal';
import { Toaster, useToast } from '@/components/ui/Toast';

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  debt: 'Fiado',
  online: 'Online',
};

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
      showToast('success', 'Venta registrada', 'La transacción se completó correctamente.');
      // Highlight new sale
      if (result.data?.saleId) {
        setNewSaleId(result.data.saleId);
        setTimeout(() => setNewSaleId(null), 5000); // Remove highlight after 5s
      }
    } else {
      showToast('error', 'Error al registrar', result.error || 'No se pudo completar la operación.');
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
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Buscar venta..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-foreground/5 border-transparent focus:bg-background focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm min-w-[280px]"
              />
            </div>
            <button className="p-3 rounded-2xl bg-foreground/5 text-secondary hover:bg-navy hover:text-white transition-all shadow-sm">
              <Download size={20} />
            </button>
          </div>
        }
      />

      {/* Stats Summary */}
      {!isLoading && sales.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-navy rounded-[32px] p-8 text-white shadow-xl shadow-navy/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Total Ingresos</p>
            <h4 className="text-3xl font-black">${totalRevenue.toLocaleString('es-CO')}</h4>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
              <ArrowUpRight size={14} /> +12.5% este mes
            </div>
          </div>
          <div className="bg-background border border-foreground/5 rounded-[32px] p-8 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Total Ventas</p>
            <h4 className="text-3xl font-black text-primary">{sales.length}</h4>
            <p className="text-xs font-medium text-secondary">Transacciones completadas</p>
          </div>
          <div className="bg-background border border-foreground/5 rounded-[32px] p-8 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Promedio por Venta</p>
            <h4 className="text-3xl font-black text-primary">
              ${(totalRevenue / (sales.length || 1)).toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </h4>
            <p className="text-xs font-medium text-secondary">Valor medio de ticket</p>
          </div>
        </div>
      )}

      {isLoading ? <Loader size="lg" className="h-[40vh]" /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : filteredSales.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="Sin ventas" description="No hay registros que coincidan con tu búsqueda." />
      ) : (
        <div className="bg-background border border-foreground/10 rounded-[40px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-foreground/[0.02] border-b border-foreground/5">
                  <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Fecha / Hora</th>
                  <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-secondary">Vendedor</th>
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
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center text-navy">
                          <User size={12} />
                        </div>
                        <p className="text-sm font-bold text-primary">{sale.user?.name || '—'}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-secondary">
                      {sale.customer?.name || <span className="opacity-40 italic">Consumidor Final</span>}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2 w-fit ${
                        sale.paymentMethod === 'debt' ? 'bg-red-50 text-red-600 border border-red-100' :
                        sale.paymentMethod === 'cash' ? 'bg-green-50 text-green-700 border border-green-100' :
                        'bg-navy/5 text-navy border border-navy/10'
                      }`}>
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

      {/* Sale Registration Modal */}
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

      {/* Invoice View Modal */}
      {selectedSaleForInvoice && (
        <InvoiceModal 
          sale={selectedSaleForInvoice} 
          onClose={() => setSelectedSaleForInvoice(null)} 
        />
      )}
    </main>
  );
}
