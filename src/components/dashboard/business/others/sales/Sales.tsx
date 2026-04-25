'use client';

import { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSales } from '@/hooks/employee/useSales';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  debt: 'Fiado',
  online: 'Online',
};

export default function Sales() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { sales, isLoading, error, fetchSalesData } = useSales(tenantId);

  useEffect(() => { fetchSalesData(); }, [fetchSalesData]);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Historial de Ventas"
        subtitle="Consulta todas las transacciones registradas en tu negocio."
      />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : sales.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="Sin ventas registradas" description="Las ventas de tus empleados aparecerán aquí." />
      ) : (
        <div className="bg-background border border-foreground/5 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-secondary">Fecha</th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-secondary">Vendedor</th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-secondary">Cliente</th>
                  <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-secondary">Método</th>
                  <th className="text-right px-6 py-4 text-xs font-black uppercase tracking-widest text-secondary">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {sales.map((sale: any) => (
                  <tr key={sale.saleId} className="hover:bg-foreground/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary">{new Date(sale.createdAt).toLocaleDateString('es-CO')}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{sale.user?.name || '—'}</td>
                    <td className="px-6 py-4 text-sm font-medium text-secondary">{sale.customer?.name || 'Sin cliente'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        sale.paymentMethod === 'debt' ? 'bg-red-50 text-red-600' :
                        sale.paymentMethod === 'cash' ? 'bg-green-50 text-green-700' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-black text-primary">
                      ${Number(sale.total).toLocaleString('es-CO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
