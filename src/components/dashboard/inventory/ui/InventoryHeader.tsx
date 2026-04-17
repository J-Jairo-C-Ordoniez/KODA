import { Search } from 'lucide-react';

export default function InventoryHeader({ variantCount, searchTerm, setSearchTerm }) {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div>
                    <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium uppercase">
                        Control de Existencias
                    </h3>
                    <p className="text-primary leading-relaxed text-lg tracking-wider font-bold">
                        {variantCount} <span className="text-sm font-medium text-secondary/70">Variantes</span>
                    </p>
                </div>
            </div>

            <div className="relative group min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Buscar por SKU, producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                />
            </div>
        </header>
    );
}
