import { Plus } from 'lucide-react';

interface SalesHeaderProps {
    saleCount: number;
    onOpenSaleModal: () => void;
}

export default function SalesHeader({ saleCount, onOpenSaleModal }: SalesHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-contrast/10 flex items-center justify-center text-contrast">
                    <Plus size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-primary tracking-tight">
                        Historial de Ventas
                    </h3>
                    <p className="text-sm font-medium text-secondary">
                        {saleCount} transacciones registradas en total
                    </p>
                </div>
            </div>

            <button
                onClick={onOpenSaleModal}
                className="flex items-center gap-2 bg-contrast hover:bg-contrast-hover transition-all duration-300 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-contrast/20 active:scale-[0.98]"
            >
                <Plus size={18} />
                Registrar Venta
            </button>
        </div>
    );
}
