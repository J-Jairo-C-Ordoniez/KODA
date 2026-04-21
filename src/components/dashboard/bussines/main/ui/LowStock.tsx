import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ExternalLink, AlertTriangle } from 'lucide-react';

export default function LowStock({ items }) {
    if (!items || items.length === 0) {
        return (
            <article className="rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden bg-foreground border-b-2 border-primary/10">
                <div className="w-full">
                    <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold uppercase">Alerta de Inventario Bajo</h3>
                    <p className="text-secondary leading-relaxed text-sm tracking-wider font-light pb-3 mb-3 border-b border-secondary/10">Revisión crítica de existencias</p>
                    <div className="text-center py-6 flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10">
                            <Package className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm font-medium tracking-wider text-secondary">
                            Inventario en estado óptimo.
                        </p>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="rounded-xl p-6 h-full flex flex-col gap-3 relative overflow-hidden bg-foreground border-b-2 border-primary/10">
            <div className="container">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-secondary/10">
                    <div>
                        <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold uppercase">Inventario Bajo</h3>
                        <p className="text-secondary leading-relaxed text-sm tracking-wider font-light">Revisión crítica de existencias</p>
                    </div>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center animate-pulse bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                </div>

                <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-xs font-semibold uppercase text-secondary tracking-widest">
                                <th className="pb-2 px-2">Producto</th>
                                <th className="pb-2 px-4 text-center">Stock</th>
                                <th className="pb-2 px-4 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {items.map((item) => (
                                <tr key={item.inventoryId} className="group transition-all duration-200">
                                    <td className="py-3 px-2 group-hover:bg-primary/10 transition-colors rounded-l-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-primary/10">
                                                <Image
                                                    src={item.variant.image}
                                                    alt={item.variant.product?.name}
                                                    className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300"
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold truncate">
                                                    {item.variant.product?.name}
                                                </span>
                                                <span className="text-secondary leading-relaxed text-xs tracking-wider font-light truncate">
                                                    {item.variant.name} · {item.variant.size}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center group-hover:bg-primary/10 transition-colors">
                                        <p className={`leading-relaxed text-sm tracking-wider font-bold py-1 rounded-lg ${item.stock === 0 ? 'text-red-500 bg-red-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                                            {item.stock} uds.
                                        </p>
                                    </td>
                                    <td className="rounded-r-xl py-3 px-4 text-right group-hover:bg-primary/10 transition-colors">
                                        <Link
                                            href={`/dashboard/inventory?variantId=${item.variantId}`}
                                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm group/btn"
                                            title="Ver stock"
                                        >
                                            <ExternalLink className="h-4 w-4 transform group-hover/btn:scale-110 transition-transform" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
    );
}
