import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function TopProducts({ products }) {
    if (!products || products.length === 0) {
        return (
            <article className="rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden bg-foreground border-b-2 border-primary/10">
                <div className="w-full">
                    <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold uppercase">Productos Top 5</h3>
                    <p className="text-secondary leading-relaxed text-sm tracking-wider font-light mb-8">Variantes por popularidad</p>
                    <div className="flex justify-center py-20">
                        <p className="text-md font-medium tracking-wider text-secondary">
                            No hay productos más vendidos.
                        </p>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="rounded-xl p-6 h-full flex flex-col gap-3 relative overflow-hidden bg-foreground border-b-2 border-primary/10">
            <div className="w-full">
                <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold uppercase">Productos Top 5</h3>
                <p className="text-secondary leading-relaxed text-sm tracking-wider font-light pb-3 mb-3 border-b border-secondary/10">Variantes por popularidad</p>

                <div className="w-full">
                    <table className="w-full text-left lg:border-separate lg:border-spacing-y-2">
                        <thead className="hidden lg:table-header-group">
                            <tr className="text-xs font-semibold uppercase text-secondary tracking-widest">
                                <th className="pb-2 px-4 w-12 text-center">ID</th>
                                <th className="pb-2 px-2">Producto</th>
                                <th className="pb-2 px-4 text-center">Popularidad</th>
                                <th className="pb-2 px-4 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="block lg:table-row-group space-y-4 lg:space-y-0">
                            {products.map((variant, idx) => (
                                <tr key={variant.variantId} className="group transition-all duration-200 block lg:table-row bg-background lg:bg-transparent rounded-2xl lg:rounded-none border border-primary/10 lg:border-none p-4 lg:p-0 shadow-sm lg:shadow-none">
                                    <td className="block lg:table-cell lg:rounded-l-xl py-2 lg:py-3 px-2 lg:px-4 text-xs font-bold lg:text-center text-primary/70 lg:group-hover:bg-primary/10 transition-colors border-b border-primary/5 lg:border-none mb-2 lg:mb-0">
                                        <div className="flex items-center justify-between lg:justify-center">
                                            <span className="lg:hidden text-xs font-bold uppercase text-secondary">Posición</span>
                                            <span>#{idx + 1}</span>
                                        </div>
                                    </td>
                                    <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:group-hover:bg-primary/10 transition-colors">
                                        <div className="flex items-center justify-between lg:justify-start w-full gap-4">
                                            <span className="lg:hidden text-xs font-bold uppercase text-secondary">Producto</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-primary/10">
                                                    <Image
                                                        src={variant.image}
                                                        alt={variant.product?.name}
                                                        className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div className="flex flex-col min-w-0 text-right lg:text-left">
                                                    <span className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold">
                                                        {variant.product?.name}
                                                    </span>
                                                    <span className="text-secondary leading-relaxed text-xs tracking-wider font-light">
                                                        {variant.name} · {variant.sku}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:text-center lg:group-hover:bg-primary/10 transition-colors">
                                        <div className="flex items-center justify-between lg:justify-center">
                                            <span className="lg:hidden text-xs font-bold uppercase text-secondary">Popularidad</span>
                                            <p className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium">{variant.popularity} pop</p>
                                        </div>
                                    </td>

                                    <td className="block lg:table-cell lg:rounded-r-xl py-2 lg:py-3 px-2 lg:px-4 lg:text-right lg:group-hover:bg-primary/10 transition-colors mt-2 lg:mt-0 border-t border-primary/5 lg:border-none">
                                        <div className="flex items-center justify-between lg:justify-end">
                                            <span className="lg:hidden text-xs font-bold uppercase text-secondary">Acción</span>
                                            <Link
                                                href={`/dashboard/catalog?variantId=${variant.variantId}`}
                                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm group/btn"
                                                title="Ver detalle"
                                            >
                                                <ExternalLink className="h-4 w-4 transform group-hover/btn:scale-110 transition-transform" />
                                            </Link>
                                        </div>
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
