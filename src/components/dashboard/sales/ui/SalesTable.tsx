import React from 'react';

export default function SalesTable({ sales }) {
    return (
        <section className="overflow-x-auto -mx-2 mt-6">
            <table className="w-full min-w-[800px] lg:min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-xs font-semibold uppercase text-secondary tracking-widest text-center">
                        <th className="pb-2 px-4 border-b border-primary/10 text-left">Referencia</th>
                        <th className="pb-2 px-4 border-b border-primary/10 text-left">Producto / Variante</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Fecha</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Pago</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Cant.</th>
                        <th className="pb-2 px-4 text-right border-b border-primary/10">Total</th>
                    </tr>
                </thead>
                <tbody className="space-y-2">
                    {sales.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-20 text-center">
                                <p className="text-md font-medium tracking-wider text-secondary">
                                    No se encontraron ventas registradas
                                </p>
                            </td>
                        </tr>
                    ) : (
                        sales.map((sale) => (
                            <tr key={sale.saleId} className="group transition-all duration-200">
                                <td className="rounded-l-xl py-3 px-4 group-hover:bg-primary/5 transition-colors text-left">
                                    <span className="text-[11px] font-mono text-secondary">#{sale.saleId}</span>
                                </td>
                                <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-left">
                                    <p className="text-primary leading-relaxed text-sm tracking-wider font-medium">
                                        {sale.variant.product.name}
                                    </p>
                                    <p className="text-xs text-secondary tracking-widest uppercase">
                                        {sale.variant.name} · {sale.variant.size} · {sale.variant.color}
                                    </p>
                                </td>
                                <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-center text-secondary text-xs tracking-wider">
                                    {new Date(sale.createdAt).toLocaleDateString('es-ES', { 
                                        day: '2-digit', month: '2-digit', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                                <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-center">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                                        {sale.paymentMethod}
                                    </span>
                                </td>
                                <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-center font-bold text-primary text-sm">
                                    {sale.amount}
                                </td>
                                <td className="rounded-r-xl py-3 px-4 group-hover:bg-primary/5 transition-colors text-right font-bold text-primary">
                                    ${sale.total.toLocaleString()}
                                </td>
                            </tr>
                ))
                    )}
            </tbody>
        </table>
        </section >
    );
}
