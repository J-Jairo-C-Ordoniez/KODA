'use client';

import { FileText, Printer, Share2, X, MapPin, Phone, Mail, Calendar, User, CreditCard } from 'lucide-react';
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
                body { padding: 0; margin: 0; }
                .no-print { display: none !important; }
              }
            </style>
          </head>
          <body>
            <div class="p-10 font-sans">
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-navy/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Actions Header */}
        <div className="px-8 py-6 border-b border-foreground/5 flex items-center justify-between bg-foreground/[0.02]">
          <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs">
            <FileText size={20} className="text-navy" />
            Factura #{invoiceNumber}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy text-white text-xs font-black hover:bg-navy/90 transition-all shadow-lg shadow-navy/20"
            >
              <Printer size={16} /> Imprimir
            </button>
            <button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground/5 text-secondary text-xs font-black hover:bg-foreground/10 transition-all"
            >
              <Share2 size={16} /> Compartir
            </button>
            <button 
              onClick={onClose}
              className="ml-2 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-white" ref={printRef}>
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-navy/20">
                   {sale.tenant?.businessName?.charAt(0) || 'K'}
                 </div>
                 <div>
                   <h2 className="text-3xl font-black text-primary tracking-tight">{sale.tenant?.businessName || 'KODA Business'}</h2>
                   <p className="text-secondary font-medium text-sm">{sale.tenant?.description || 'Tienda de Moda & Accesorios'}</p>
                 </div>
              </div>
              <div className="space-y-2 text-sm text-secondary font-medium">
                <div className="flex items-center gap-2"><Phone size={14} className="text-navy" /> {sale.tenant?.whatsApp}</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-navy" /> Colombia</div>
              </div>
            </div>

            <div className="bg-foreground/[0.03] border border-foreground/5 p-6 rounded-[32px] min-w-[240px] space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary">No. Factura</p>
                <p className="text-2xl font-black text-navy tracking-tight">#{invoiceNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-foreground/5 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Fecha</p>
                  <p className="text-xs font-bold text-primary">{date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Hora</p>
                  <p className="text-xs font-bold text-primary">{time}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-foreground/5">
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                <User size={12} className="text-navy" /> Cliente
              </h3>
              <div className="space-y-1">
                <p className="text-lg font-black text-primary">{sale.customer?.name || 'Consumidor Final'}</p>
                {sale.customer?.phone && <p className="text-sm font-medium text-secondary">{sale.customer.phone}</p>}
                {!sale.customer && <p className="text-xs italic text-secondary/50">Venta rápida sin registro de cliente</p>}
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                <CreditCard size={12} className="text-navy" /> Pago
              </h3>
              <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                   sale.paymentMethod === 'debt' ? 'bg-red-500 text-white' : 'bg-navy/5 text-navy'
                 }`}>
                   <CreditCard size={20} />
                 </div>
                 <div className="space-y-1">
                   <p className={`text-sm font-black uppercase tracking-wide ${sale.paymentMethod === 'debt' ? 'text-red-600' : 'text-primary'}`}>
                     {sale.paymentMethod === 'cash' ? 'Efectivo' : 
                      sale.paymentMethod === 'transfer' ? 'Transferencia' : 
                      sale.paymentMethod === 'debt' ? 'FIADO (CRÉDITO)' : 'Online'}
                   </p>
                   {sale.paymentMethod === 'debt' ? (
                     <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-full w-fit">PENDIENTE DE PAGO</p>
                   ) : (
                     <p className="text-xs font-medium text-secondary">Vendedor: {sale.user?.name}</p>
                   )}
                 </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary ml-2">Detalle de Productos</h3>
            <div className="bg-foreground/[0.02] border border-foreground/5 rounded-[32px] overflow-hidden">
              <table className="w-full">
                <thead className="bg-foreground/[0.03] border-b border-foreground/5">
                  <tr>
                    <th className="text-left px-8 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Cant.</th>
                    <th className="text-left px-8 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Descripción</th>
                    <th className="text-right px-8 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Precio</th>
                    <th className="text-right px-8 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {sale.items?.map((item: any) => (
                    <tr key={item.itemId}>
                      <td className="px-8 py-4 text-sm font-black text-navy">{item.quantity}</td>
                      <td className="px-8 py-4">
                        <p className="text-sm font-bold text-primary">{item.variant?.product?.name || 'Producto'}</p>
                        <p className="text-[10px] font-medium text-secondary uppercase tracking-tighter">
                          {item.variant?.name} {item.variant?.color && `• ${item.variant.color}`} {item.variant?.size && `• ${item.variant.size}`}
                        </p>
                      </td>
                      <td className="px-8 py-4 text-right text-sm font-medium text-primary">
                        ${Number(item.variant?.price || 0).toLocaleString()}
                      </td>
                      <td className="px-8 py-4 text-right text-sm font-black text-primary">
                        ${(item.quantity * Number(item.variant?.price || 0)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-8">
            <div className="w-full max-w-xs space-y-4">
               <div className="flex justify-between items-center px-4">
                 <p className="text-xs font-bold text-secondary uppercase tracking-widest">Subtotal</p>
                 <p className="text-sm font-bold text-primary">${Number(sale.total).toLocaleString()}</p>
               </div>
               <div className="flex justify-between items-center px-4">
                 <p className="text-xs font-bold text-secondary uppercase tracking-widest">IVA (0%)</p>
                 <p className="text-sm font-bold text-primary">$0</p>
               </div>
               <div className="h-px bg-foreground/5 mx-4" />
               <div className="flex justify-between items-center bg-navy/5 p-6 rounded-2xl border border-navy/10">
                 <p className="text-sm font-black text-navy uppercase tracking-[0.2em]">Total</p>
                 <p className="text-3xl font-black text-navy tracking-tight">${Number(sale.total).toLocaleString()}</p>
               </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-12 space-y-2 border-t border-foreground/5">
             <p className="text-xs font-bold text-primary">¡Gracias por tu compra!</p>
             <p className="text-[10px] font-medium text-secondary">Este documento es un comprobante de venta. Para cambios o garantías, presenta esta factura antes de 15 días.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
