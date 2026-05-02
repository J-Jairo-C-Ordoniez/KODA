import { Calendar, User, CreditCard, FileText } from 'lucide-react';

interface SalesTableProps {
  sales: any[];
  newSaleId: string | null;
  onViewInvoice: (sale: any) => void;
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  debt: 'Deuda',
  online: 'En Línea',
};

export function SalesTable({ sales, newSaleId, onViewInvoice }: SalesTableProps) {
  return (
    <div className="bg-background border border-foreground/10 rounded-[40px] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-foreground/2 border-b border-foreground/5">
              <th className="text-left px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Fecha / Hora</th>
              <th className="text-left px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Vendedor</th>
              <th className="text-left px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Cliente</th>
              <th className="text-left px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Método</th>
              <th className="text-right px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Total</th>
              <th className="text-center px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Factura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/5">
            {sales.map((sale: any) => (
              <tr 
                key={sale.saleId} 
                className={`hover:bg-foreground/1 transition-all duration-1000 group ${
                  newSaleId === sale.saleId ? 'bg-green-50 ring-2 ring-green-500 ring-inset animate-pulse' : ''
                }`}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-secondary group-hover:bg-navy/10 group-hover:text-navy transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{new Date(sale.createdAt).toLocaleDateString('es-ES')}</p>
                      <p className="text-xs font-medium text-secondary">{new Date(sale.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
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
                  <span className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2 w-fit ${
                    sale.paymentMethod === 'debt' ? 'bg-red-50 text-red-600 border border-red-100' :
                    sale.paymentMethod === 'cash' ? 'bg-green-50 text-green-700 border border-green-100' :
                    'bg-navy/5 text-navy border border-navy/10'
                  }`}>
                    <CreditCard size={12} />
                    {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-lg font-black text-primary">${Number(sale.total).toLocaleString('es-ES')}</p>
                </td>
                <td className="px-8 py-5 text-center">
                  <button 
                    onClick={() => onViewInvoice(sale)}
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
  );
}
