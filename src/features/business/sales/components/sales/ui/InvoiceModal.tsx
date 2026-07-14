'use client';

import { FileText, Printer, Share2, X, MapPin, Phone, Calendar, User, CreditCard, Clock, Tag } from 'lucide-react';
import { useRef } from 'react';

interface InvoiceModalProps {
  sale: any;
  onClose: () => void;
}

export default function InvoiceModal({ sale, onClose }: InvoiceModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = 'Print' + uniqueName;
    const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura ${sale.saleId.slice(-6).toUpperCase()}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @media print {
                body { padding: 0; margin: 0; background: white !important; color: black !important; }
                .no-print { display: none !important; }
                .printable-area { background: white !important; color: black !important; }
                .printable-area * { border-color: #eee !important; color: black !important; }
                .badge-debt { background: #fee2e2 !important; color: #b91c1c !important; border: 1px solid #fecaca !important; }
              }
            </style>
          </head>
          <body class="bg-white">
            <div class="p-10 font-sans printable-area">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const invoiceNumber = sale.saleId.slice(-6).toUpperCase();
  const date = new Date(sale.createdAt).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const time = new Date(sale.createdAt).toLocaleTimeString('es-CO', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-background w-full max-w-4xl rounded-[40px] shadow-2xl border border-foreground/10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Actions Header */}
        <div className="px-8 py-5 border-b border-foreground/5 flex items-center justify-between bg-background-elevated">
          <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
            <div className="w-8 h-8 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast">
              <FileText size={16} />
            </div>
            Detalle de Factura <span className="text-foreground-muted ml-1">#{invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-contrast text-white text-[10px] font-black uppercase tracking-widest hover:bg-contrast-hover transition-all shadow-lg shadow-contrast/20 active:scale-95"
            >
              <Printer size={16} /> Imprimir
            </button>
            <button
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-foreground/5 text-foreground-muted text-[10px] font-black uppercase tracking-widest hover:bg-foreground/10 transition-all active:scale-95"
            >
              <Share2 size={16} /> Compartir
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-500/10 text-foreground-muted hover:text-red-500 transition-all active:scale-90"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 bg-background custom-scrollbar" ref={printRef}>
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-contrast flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-contrast/30">
                  {sale.tenant?.businessName?.charAt(0) || 'K'}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-primary tracking-tighter leading-none">{sale.tenant?.businessName || 'KODA Business'}</h2>
                  <p className="text-foreground-muted font-bold text-xs uppercase tracking-widest mt-2">{sale.tenant?.description || 'Tienda Oficial'}</p>
                </div>
              </div>
              <div className="space-y-2 text-[11px] text-foreground-muted font-bold uppercase tracking-widest">
                <div className="flex items-center gap-3"><Phone size={14} className="text-contrast" /> {sale.tenant?.whatsApp}</div>
                <div className="flex items-center gap-3"><MapPin size={14} className="text-contrast" /> Colombia • Tienda Virtual</div>
              </div>
            </div>

            <div className="bg-background-elevated border border-foreground/10 p-8 rounded-[40px] min-w-[280px] space-y-6 shadow-xl shadow-black/20">
              <div className="space-y-1 text-right md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted opacity-50">Número de Control</p>
                <p className="text-3xl font-black text-contrast tracking-tight">#{invoiceNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-foreground/5 pt-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-foreground-muted">Fecha Emisión</p>
                  <p className="text-xs font-black text-primary">{date}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-foreground-muted">Hora</p>
                  <p className="text-xs font-black text-primary uppercase">{time}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-foreground/8">
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground-muted flex items-center gap-2">
                <User size={14} className="text-contrast" /> Datos del Cliente
              </h3>
              <div className="bg-background-elevated/50 p-6 rounded-3xl border border-foreground/5">
                <p className="text-xl font-black text-primary tracking-tight">{sale.customer?.name || 'Consumidor Final'}</p>
                {sale.customer?.phone && (
                  <div className="flex items-center gap-2 mt-2 text-foreground-muted">
                    <Phone size={12} />
                    <p className="text-xs font-bold">{sale.customer.phone}</p>
                  </div>
                )}
                {!sale.customer && <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted/40 mt-2">Venta Rápida / Sin Registro</p>}
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground-muted flex items-center gap-2">
                <CreditCard size={14} className="text-contrast" /> Estado del Pago
              </h3>
              <div className={`p-6 rounded-3xl border flex items-center gap-4 ${sale.paymentMethod === 'debt' ? 'bg-red-500/5 border-red-500/20' : 'bg-background-elevated/50 border-foreground/5'
                }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${sale.paymentMethod === 'debt' ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-contrast text-white shadow-contrast/20'
                  }`}>
                  <CreditCard size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted opacity-60">Método Utilizado</p>
                  <p className={`text-base font-black uppercase tracking-wider ${sale.paymentMethod === 'debt' ? 'text-red-400' : 'text-primary'}`}>
                    {sale.paymentMethod === 'cash' ? 'Efectivo' :
                      sale.paymentMethod === 'transfer' ? 'Transferencia' :
                        sale.paymentMethod === 'debt' ? 'Fiado (Deuda)' : 'Online'}
                  </p>
                  {sale.paymentMethod === 'debt' && (
                    <span className="inline-block text-[9px] font-black uppercase tracking-[0.2em] bg-red-500/10 text-red-500 px-2.5 py-1 rounded-lg border border-red-500/20 mt-1 badge-debt">Pendiente</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 ml-2">
              <Tag size={14} className="text-contrast" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">Detalle de Transacción</h3>
            </div>
            <div className="bg-background-elevated/30 border border-foreground/10 rounded-[32px] overflow-hidden">
              <table className="w-full">
                <thead className="bg-foreground/3 border-b border-foreground/8">
                  <tr>
                    <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground-muted">Producto</th>
                    <th className="text-center px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground-muted">Cant.</th>
                    <th className="text-right px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground-muted">Unitario</th>
                    <th className="text-right px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground-muted">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {sale.items?.map((item: any) => (
                    <tr key={item.itemId} className="hover:bg-foreground/2 transition-colors">
                      <td className="px-8 py-5">
                        <p className="text-sm font-black text-primary tracking-tight uppercase">{item.variant?.product?.name || 'Producto'}</p>
                        <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mt-1 opacity-60">
                          {item.variant?.name} {item.variant?.color && `• ${item.variant.color}`} {item.variant?.size && `• ${item.variant.size}`}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-center text-sm font-black text-primary">{item.quantity}</td>
                      <td className="px-8 py-5 text-right text-sm font-bold text-foreground-muted">
                        ${Number(item.variant?.price || 0).toLocaleString()}
                      </td>
                      <td className="px-8 py-5 text-right text-base font-black text-primary">
                        ${(item.quantity * Number(item.variant?.price || 0)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-foreground/10">
            <div className="flex items-center gap-4 text-foreground-muted opacity-40">
              <Clock size={20} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest">Atendido por</p>
                <p className="text-xs font-bold">{sale.user?.name || 'Koda System'}</p>
              </div>
            </div>

            <div className="w-full md:w-80 space-y-4">
              <div className="flex justify-between items-center px-4">
                <p className="text-[10px] font-black text-foreground-muted uppercase tracking-widest">Base Imponible</p>
                <p className="text-sm font-bold text-primary">${Number(sale.total).toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center px-4">
                <p className="text-[10px] font-black text-foreground-muted uppercase tracking-widest">Impuestos (0%)</p>
                <p className="text-sm font-bold text-primary">$0</p>
              </div>
              <div className="bg-contrast rounded-3xl p-6 shadow-2xl shadow-contrast/20 border border-white/10 flex justify-between items-center">
                <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Total Final</p>
                <p className="text-4xl font-black text-white tracking-tighter">${Number(sale.total).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-8 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-foreground/10" />
              <p className="text-[10px] font-black text-contrast uppercase tracking-[0.3em]">Gracias por tu compra</p>
              <div className="w-8 h-px bg-foreground/10" />
            </div>
            <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest leading-relaxed max-w-md mx-auto opacity-40">
              Este documento es un comprobante de venta digital. Presenta este código para cambios o garantías antes de 15 días.
            </p>
          </div>
        </div>

        {/* Mobile Actions Footer */}
        <div className="sm:hidden p-6 bg-background-elevated border-t border-foreground/10 grid grid-cols-2 gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-contrast text-white text-[10px] font-black uppercase tracking-widest"
          >
            <Printer size={16} /> Imprimir
          </button>
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-foreground/5 text-foreground-muted text-[10px] font-black uppercase tracking-widest">
            <Share2 size={16} /> Compartir
          </button>
        </div>
      </div>
    </div>
  );
}
