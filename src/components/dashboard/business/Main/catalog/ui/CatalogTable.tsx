import React from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Plus } from 'lucide-react';

export default function CatalogTable({ 
    products, 
    expandedProducts, 
    onToggleExpand, 
    onAddVariant, 
    onEditProduct, 
    onDeleteProduct, 
    onEditVariant, 
    onDeleteVariant 
}) {
    return (
        <section className="overflow-x-auto -mx-2 mt-2">
            <table className="w-full min-w-[800px] lg:min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-xs font-semibold uppercase text-secondary tracking-widest text-center">
                        <th className="pb-2 px-4 w-12 text-center border-b border-primary/10"></th>
                        <th className="pb-2 px-2 border-b border-primary/10">Categoría</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Nombre</th>
                        <th className="pb-2 px-4 text-center border-b border-primary/10 text-nowrap">Género</th>
                        <th className="pb-2 px-4 text-center border-b border-primary/10">Variantes</th>
                        <th className="pb-2 px-4 text-right border-b border-primary/10">Acciones</th>
                    </tr>
                </thead>
                <tbody className="space-y-2">
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-20 text-center">
                                <p className="text-md font-medium tracking-wider text-secondary">
                                    No se encontraron productos
                                </p>
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <React.Fragment key={product.productId}>
                                <tr className="group transition-all duration-200">
                                    <td className="rounded-l-xl py-3 px-4 text-center group-hover:bg-primary/5 transition-colors">
                                        <button
                                            onClick={() => onToggleExpand(product.productId)}
                                            aria-label={expandedProducts[product.productId] ? "Contraer variantes" : "Expandir variantes"}
                                            aria-expanded={expandedProducts[product.productId]}
                                            className="p-1 rounded cursor-pointer transition-colors text-secondary hover:text-primary"
                                        >
                                            {expandedProducts[product.productId]
                                                ? <ChevronUp className="h-4 w-4" />
                                                : <ChevronDown className="h-4 w-4" />}
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors">
                                        <span className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors">
                                        <p className="text-center text-primary/80 leading-relaxed text-sm tracking-wider font-medium">
                                            {product.name}
                                        </p>
                                    </td>
                                    <td className="py-3 px-4 text-center capitalize group-hover:bg-primary/5 transition-colors text-secondary text-sm">
                                        {product.gender}
                                    </td>
                                    <td className="py-3 px-4 text-center group-hover:bg-primary/5 transition-colors">
                                        <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
                                            {product.variants.length}
                                        </span>
                                    </td>
                                    <td className="rounded-r-xl py-3 px-4 text-right group-hover:bg-primary/5 transition-colors">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onAddVariant(product.productId)}
                                                aria-label="Añadir Variante"
                                                className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg bg-primary/5 text-primary hover:bg-primary/20 transition-all shadow-sm"
                                                title="Añadir Variante"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onEditProduct(product)}
                                                aria-label="Editar Producto"
                                                className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onDeleteProduct(product.productId)}
                                                aria-label="Eliminar Producto"
                                                className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Expanded variants */}
                                {expandedProducts[product.productId] && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 bg-primary/5 rounded-xl border border-primary/10">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                                                    Variantes del producto
                                                </h4>
                                                {product.variants.length === 0 ? (
                                                    <table className="w-full min-w-[600px] lg:min-w-full text-left border-collapse">
                                                        <tbody>
                                                            <tr>
                                                                <td className="text-sm text-secondary italic py-2">No hay variantes registradas.</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {product.variants.map((v) => (
                                                            <div
                                                                key={v.variantId}
                                                                className="flex gap-4 p-4 rounded-xl bg-foreground border border-primary/10 shadow-sm transition-all hover:border-primary/30"
                                                            >
                                                                <div className="h-20 w-20 rounded-lg overflow-hidden shrink-0 bg-secondary/5 flex items-center justify-center border border-primary/5">
                                                                    {v.image ? (
                                                                        <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                                                                    ) : (
                                                                        <ImageIcon className="h-8 w-8 text-secondary/30" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-bold text-primary truncate uppercase tracking-tight">{v.name}</p>
                                                                    <p className="text-[10px] text-secondary font-medium tracking-widest uppercase mt-0.5">
                                                                        SKU: {v.sku} · {v.size}
                                                                    </p>
                                                                    <div className="flex items-center gap-2 mt-3">
                                                                        <span className="text-sm font-bold text-primary">
                                                                            ${Number(v.price).toLocaleString('es-CO')}
                                                                        </span>
                                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                                                                            {v.color}
                                                                        </span>
                                                                        <div className="flex-1"></div>
                                                                        <div className="flex gap-1">
                                                                            <button onClick={() => onEditVariant(product.productId, v)}
                                                                                aria-label={`Editar variante ${v.name}`}
                                                                                className="h-7 w-7 flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                                                                            >
                                                                                <Edit2 className="h-3.5 w-3.5" aria-hidden="true" />
                                                                            </button>
                                                                            <button onClick={() => onDeleteVariant(v.variantId)}
                                                                                aria-label={`Eliminar variante ${v.name}`}
                                                                                className="h-7 w-7 flex items-center justify-center rounded-lg text-secondary hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                                            >
                                                                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}
