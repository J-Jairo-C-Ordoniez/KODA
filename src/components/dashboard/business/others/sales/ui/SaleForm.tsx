import React, { useState, useEffect } from 'react';

export default function SaleForm({ variants, onSubmit, onCancel, submitting }) {
    const [formData, setFormData] = useState({
        variantId: '',
        amount: 1,
        paymentMethod: 'Efectivo',
    });
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (formData.variantId) {
            const v = variants.find(v => v.variantId.toString() === formData.variantId.toString());
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedVariant(v);
             
            if (v) setTotal(v.price * formData.amount);
        } else {
             
            setSelectedVariant(null);
             
            setTotal(0);
        }
    }, [formData.variantId, formData.amount, variants]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.variantId) return;
        onSubmit({
            ...formData,
            variantId: parseInt(formData.variantId),
            total: total
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="space-y-4">
                <div className="space-y-3 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">
                        Seleccionar Producto / Variante
                    </label>

                    <div className="grid grid-cols-1 gap-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {variants.map((v) => (
                            <div
                                key={v.variantId}
                                onClick={() => setFormData({ ...formData, variantId: v.variantId.toString() })}
                                className={`
                                    flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer
                                    ${formData.variantId === v.variantId.toString()
                                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                                        : 'border-primary/10 bg-transparent hover:border-primary/30'}
                                `}
                            >
                                <div className="w-12 h-16 bg-secondary/5 rounded-lg overflow-hidden shrink-0 border border-secondary/10">
                                    {v.image ? (
                                        <img
                                            src={v.image}
                                            alt={v.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[8px] text-secondary/40">N/A</div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 text-left">
                                    <h4 className="text-xs font-bold text-primary truncate uppercase tracking-tight">
                                        {v.product.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] px-2 py-0.5 bg-secondary/10 rounded-full text-secondary font-medium">
                                            Talla {v.size}
                                        </span>
                                        <span className="text-[10px] text-secondary/60 italic">
                                            {v.color}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-secondary/40 mt-1 uppercase tracking-tighter">SKU: {v.sku || 'S/N'}</p>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className="text-sm font-bold text-primary">
                                        ${v.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            min="1"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 1 })}
                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                        />
                    </div>

                    <div className="space-y-1.5 text-left relative">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">
                            Método de Pago
                        </label>
                        <select
                            value={formData.paymentMethod}
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
                        >
                            <option value="Efectivo" className="bg-[#f8f9fa] text-primary">Efectivo</option>
                            <option value="Transferencia" className="bg-[#f8f9fa] text-primary">Transferencia</option>
                            <option value="Tarjeta" className="bg-[#f8f9fa] text-primary">Tarjeta</option>
                        </select>
                        <div className="pointer-events-none absolute bottom-4 right-4 text-secondary/50">
                            <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {selectedVariant && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex justify-between items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <p className="text-[10px] text-secondary tracking-widest uppercase font-bold">Resumen de Venta</p>
                            <p className="text-xs text-primary font-medium mt-1">
                                {selectedVariant.product.name} ({selectedVariant.size}/{selectedVariant.color})
                            </p>
                            <p className="text-[10px] text-secondary/60">Unitario: ${selectedVariant.price.toLocaleString()} x {formData.amount}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-secondary tracking-widest uppercase font-bold">Total a Cobrar</p>
                            <p className="text-xl font-black text-primary leading-none mt-1">${total.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-3 border border-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-secondary hover:bg-primary/5 transition-all active:scale-95"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={submitting || !formData.variantId}
                    className="flex-2 px-8 py-3 bg-primary/90 hover:bg-primary text-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:grayscale"
                >
                    {submitting ? 'Procesando...' : 'Confirmar Venta'}
                </button>
            </div>
        </form>
    );
}