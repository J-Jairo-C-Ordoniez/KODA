import { Search, Plus } from 'lucide-react';

export default function SalesHeader({ saleCount, onOpenSaleModal, searchTerm, setSearchTerm }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div>
                    <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium uppercase">
                        Registro de Ventas
                    </h3>
                    <p className="text-[10px] text-secondary tracking-widest uppercase">
                        {saleCount} Transacciones totales
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por ID o Producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                    />
                </div>
                <button
                    onClick={onOpenSaleModal}
                    className="flex items-center gap-2 bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50"
                >
                    <Plus className="h-4 w-4" />
                    Nueva Venta
                </button>
            </div>
        </div>
    );
}
