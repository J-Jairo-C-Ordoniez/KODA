import React from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function InventoryTable({ products, expandedProducts, onToggleExpand, loadingId, onUpdateStock }) {
    return (
        <section className="mt-6 w-full">
            <table className="w-full text-left border-separate border-spacing-y-4 lg:border-spacing-y-2">
                <thead className="hidden lg:table-header-group">
                    <tr className="text-xs font-semibold uppercase text-secondary tracking-widest text-center">
                        <th className="pb-2 px-4 w-12 border-b border-primary/10"></th>
                        <th className="pb-2 px-4 border-b border-primary/10 text-left">Producto</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Categoría</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Género</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Variantes</th>
                        <th className="pb-2 px-4 text-right border-b border-primary/10">Estado Global</th>
                    </tr>
                </thead>
                <tbody className="block lg:table-row-group space-y-4 lg:space-y-0">
                    {products.length === 0 ? (
                        <tr className="block lg:table-row">
                            <td colSpan={6} className="block lg:table-cell py-20 text-center">
                                <p className="text-md font-medium tracking-wider text-secondary">
                                    No se encontraron resultados
                                </p>
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => {
                            const isExpanded = expandedProducts[product.productId];
                            const totalVariants = product.variants.length;
                            const outOfStock = product.variants.filter(v => (v.inventories[0]?.stock || 0) <= 0).length;

                            return (
                                <React.Fragment key={product.productId}>
                                    <tr className="group transition-all duration-200 block lg:table-row bg-foreground lg:bg-transparent rounded-2xl lg:rounded-none border border-primary/10 lg:border-none p-4 lg:p-0 shadow-sm lg:shadow-none">
                                        <td className="block lg:table-cell lg:rounded-l-xl py-2 lg:py-3 px-2 lg:px-4 text-left lg:text-center lg:group-hover:bg-primary/5 transition-colors border-b border-primary/5 lg:border-none mb-2 lg:mb-0">
                                            <div className="flex items-center justify-between lg:justify-center w-full">
                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Inventario</span>
                                                <button
                                                    onClick={() => onToggleExpand(product.productId)}
                                                    aria-label={isExpanded ? "Contraer inventario" : "Expandir inventario"}
                                                    aria-expanded={isExpanded}
                                                    className="p-2 rounded cursor-pointer transition-colors text-secondary hover:text-primary bg-primary/5 lg:bg-transparent flex items-center gap-2"
                                                >
                                                    <span className="lg:hidden text-xs font-bold">{totalVariants} Variantes</span>
                                                    {isExpanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:group-hover:bg-primary/5 transition-colors text-left">
                                            <div className="flex items-center justify-between lg:justify-start w-full">
                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Producto</span>
                                                <p className="text-right lg:text-left text-primary leading-relaxed text-sm tracking-wider font-semibold">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:group-hover:bg-primary/5 transition-colors text-center">
                                            <div className="flex items-center justify-between lg:justify-center w-full">
                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Categoría</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                                                    {product.category.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:group-hover:bg-primary/5 transition-colors lg:text-center capitalize text-secondary text-sm">
                                            <div className="flex items-center justify-between lg:justify-center w-full">
                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Género</span>
                                                <span>{product.gender}</span>
                                            </div>
                                        </td>
                                        <td className="hidden lg:table-cell py-2 lg:py-3 px-2 lg:px-4 lg:group-hover:bg-primary/5 transition-colors text-center">
                                            <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
                                                {totalVariants}
                                            </span>
                                        </td>
                                        <td className="block lg:table-cell lg:rounded-r-xl py-4 lg:py-3 px-2 lg:px-4 lg:group-hover:bg-primary/5 transition-colors lg:text-right mt-4 lg:mt-0 border-t border-primary/5 lg:border-none">
                                            <div className="flex items-center justify-between lg:justify-end w-full">
                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Estado Global</span>
                                                {outOfStock > 0 ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-500/10 text-red-500">
                                                        {outOfStock} Agotadas
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
                                                        Óptimo
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expanded variants list */}
                                    {isExpanded && (
                                        <tr className="block lg:table-row mt-2 lg:mt-0">
                                            <td colSpan={6} className="block lg:table-cell px-2 lg:px-0 py-0">
                                                <div className="bg-primary/5 rounded-xl border border-primary/10 my-2 overflow-hidden">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead className="hidden lg:table-header-group bg-secondary/5">
                                                            <tr className="text-[10px] font-bold uppercase tracking-widest text-secondary/70">
                                                                <th className="py-2 px-8">Variante</th>
                                                                <th className="py-2 px-4">SKU</th>
                                                                <th className="py-2 px-4">Estado</th>
                                                                <th className="py-2 px-4 text-center">Stock</th>
                                                                <th className="py-2 px-8 text-right">Actualizar</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="block lg:table-row-group">
                                                            {product.variants.map((v) => {
                                                                const inventory = v.inventories[0];
                                                                const stock = inventory ? inventory.stock : 0;
                                                                const isLowStock = stock <= 0;
                                                                return (
                                                                    <tr key={v.variantId} className="block lg:table-row border-t border-primary/5 hover:bg-primary/5 transition-colors p-4 lg:p-0">
                                                                        <td className="block lg:table-cell py-2 lg:py-4 px-2 lg:px-8">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="h-14 w-14 lg:h-10 lg:w-10 rounded-lg overflow-hidden bg-secondary/5 border border-primary/5 shrink-0">
                                                                                    {v.image ? (
                                                                                        <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                                                                                    ) : (
                                                                                        <div className="h-full w-full flex items-center justify-center text-[8px] text-secondary/30">IMG</div>
                                                                                    )}
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-xs font-bold text-primary truncate uppercase">{v.name}</p>
                                                                                    <p className="text-[10px] text-secondary tracking-widest uppercase">{v.size} · {v.color}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="block lg:table-cell py-2 lg:py-4 px-2 lg:px-4 font-mono text-[11px] text-secondary">
                                                                            <div className="flex items-center justify-between lg:justify-start">
                                                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">SKU</span>
                                                                                <span>{v.sku}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="block lg:table-cell py-2 lg:py-4 px-2 lg:px-4">
                                                                            <div className="flex items-center justify-between lg:justify-start">
                                                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Estado</span>
                                                                                {isLowStock ? (
                                                                                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-500/10 text-red-500">
                                                                                        <AlertCircle className="h-2.5 w-2.5" /> Agotado
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                                                                                        <CheckCircle2 className="h-2.5 w-2.5" /> Óptimo
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </td>
                                                                        <td className="block lg:table-cell py-2 lg:py-4 px-2 lg:px-4 lg:text-center">
                                                                            <div className="flex items-center justify-between lg:justify-center">
                                                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Stock Actual</span>
                                                                                <span className={`text-lg font-bold ${isLowStock ? 'text-red-500' : 'text-primary'}`}>
                                                                                    {stock}
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="block lg:table-cell py-4 lg:py-4 px-2 lg:px-8 lg:text-right border-t border-primary/5 lg:border-none mt-2 lg:mt-0">
                                                                            <form 
                                                                                className="flex items-center justify-between lg:justify-end gap-2"
                                                                                onSubmit={(e) => {
                                                                                    e.preventDefault();
                                                                                    onUpdateStock(v.variantId, e.target.stock.value);
                                                                                }}
                                                                            >
                                                                                <span className="lg:hidden text-xs font-bold uppercase text-secondary">Actualizar</span>
                                                                                <div className="flex items-center gap-3">
                                                                                    <input 
                                                                                        type="number" 
                                                                                        name="stock" 
                                                                                        defaultValue={stock} 
                                                                                        min="0" required 
                                                                                        className="w-20 lg:w-16 bg-foreground/10 border border-primary/10 rounded-lg p-2.5 lg:p-2 text-center text-sm lg:text-xs text-primary font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" 
                                                                                    />
                                                                                    <button 
                                                                                        type="submit" 
                                                                                        disabled={loadingId === v.variantId}
                                                                                        className="bg-navy hover:bg-navy/90 transition-all text-white px-5 lg:px-4 py-2.5 lg:py-2 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-navy/20 hover:shadow-navy/40 hover:-translate-y-0.5 active:translate-y-0"
                                                                                    >
                                                                                        {loadingId === v.variantId ? '...' : 'OK'}
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })
                    )}
                </tbody>
            </table>
        </section>
    );
}
