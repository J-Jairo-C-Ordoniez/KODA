import React from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function InventoryTable({ products, expandedProducts, onToggleExpand, loadingId, onUpdateStock }) {
    return (
        <section className="overflow-x-auto -mx-2 mt-6">
            <table className="w-full min-w-[800px] lg:min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-xs font-semibold uppercase text-secondary tracking-widest text-center">
                        <th className="pb-2 px-4 w-12 border-b border-primary/10"></th>
                        <th className="pb-2 px-4 border-b border-primary/10 text-left">Producto</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Categoría</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Género</th>
                        <th className="pb-2 px-4 border-b border-primary/10">Variantes</th>
                        <th className="pb-2 px-4 text-right border-b border-primary/10">Estado Global</th>
                    </tr>
                </thead>
                <tbody className="space-y-2">
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-20 text-center">
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
                                    <tr className="group transition-all duration-200">
                                        <td className="rounded-l-xl py-3 px-4 group-hover:bg-primary/5 transition-colors text-center">
                                            <button
                                                onClick={() => onToggleExpand(product.productId)}
                                                aria-label={isExpanded ? "Contraer inventario" : "Expandir inventario"}
                                                aria-expanded={isExpanded}
                                                className="p-1 rounded cursor-pointer transition-colors text-secondary hover:text-primary"
                                            >
                                                {isExpanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-left">
                                            <p className="text-primary leading-relaxed text-sm tracking-wider font-semibold">
                                                {product.name}
                                            </p>
                                        </td>
                                        <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-center">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                                                {product.category.name}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-center capitalize text-secondary text-sm">
                                            {product.gender}
                                        </td>
                                        <td className="py-3 px-4 group-hover:bg-primary/5 transition-colors text-center">
                                            <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
                                                {totalVariants}
                                            </span>
                                        </td>
                                        <td className="rounded-r-xl py-3 px-4 group-hover:bg-primary/5 transition-colors text-right">
                                            {outOfStock > 0 ? (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-500/10 text-red-500">
                                                    {outOfStock} Agotadas
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
                                                    Óptimo
                                                </span>
                                            )}
                                        </td>
                                    </tr>

                                    {/* Expanded variants list */}
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={6} className="p-0">
                                                <div className="bg-primary/5 rounded-xl border border-primary/10 my-2 overflow-hidden">
                                                    <table className="w-full min-w-[600px] lg:min-w-full text-left border-collapse">
                                                        <thead className="bg-secondary/5">
                                                            <tr className="text-[10px] font-bold uppercase tracking-widest text-secondary/70">
                                                                <th className="py-2 px-8">Variante</th>
                                                                <th className="py-2 px-4">SKU</th>
                                                                <th className="py-2 px-4">Estado</th>
                                                                <th className="py-2 px-4 text-center">Stock</th>
                                                                <th className="py-2 px-8 text-right">Actualizar</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {product.variants.map((v) => {
                                                                const inventory = v.inventories[0];
                                                                const stock = inventory ? inventory.stock : 0;
                                                                const isLowStock = stock <= 0;
                                                                return (
                                                                    <tr key={v.variantId} className="border-t border-primary/5 hover:bg-primary/5 transition-colors">
                                                                        <td className="py-4 px-8">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="h-10 w-10 rounded-lg overflow-hidden bg-secondary/5 border border-primary/5 shrink-0">
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
                                                                        <td className="py-4 px-4 font-mono text-[11px] text-secondary">
                                                                            {v.sku}
                                                                        </td>
                                                                        <td className="py-4 px-4">
                                                                            {isLowStock ? (
                                                                                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-500/10 text-red-500">
                                                                                    <AlertCircle className="h-2.5 w-2.5" /> Agotado
                                                                                </span>
                                                                            ) : (
                                                                                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                                                                                    <CheckCircle2 className="h-2.5 w-2.5" /> Óptimo
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="py-4 px-4 text-center">
                                                                            <span className={`text-lg font-bold ${isLowStock ? 'text-red-500' : 'text-primary'}`}>
                                                                                {stock}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-4 px-8 text-right">
                                                                            <form 
                                                                                className="flex items-center justify-end gap-2"
                                                                                onSubmit={(e) => {
                                                                                    e.preventDefault();
                                                                                    onUpdateStock(v.variantId, e.target.stock.value);
                                                                                }}
                                                                            >
                                                                                <input 
                                                                                    type="number" 
                                                                                    name="stock" 
                                                                                    defaultValue={stock} 
                                                                                    min="0" required 
                                                                                    className="w-16 bg-transparent border border-secondary/20 rounded p-1.5 text-right text-xs text-primary font-bold focus:outline-none focus:border-primary" 
                                                                                />
                                                                                <button 
                                                                                    type="submit" 
                                                                                    disabled={loadingId === v.variantId}
                                                                                    className="bg-primary/90 hover:bg-primary transition-colors text-foreground px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                                                                                >
                                                                                    {loadingId === v.variantId ? '...' : 'OK'}
                                                                                </button>
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
