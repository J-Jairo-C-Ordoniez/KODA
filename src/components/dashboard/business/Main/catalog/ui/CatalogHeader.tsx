import { Plus, Search, Filter } from 'lucide-react';

interface CatalogHeaderProps {
    productCount: number;
    onOpenProductModal: () => void;
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    categories: any[];
    selectedCategory?: string;
    setSelectedCategory?: (val: string) => void;
}

export default function CatalogHeader({ 
    productCount, 
    onOpenProductModal, 
    searchTerm, 
    setSearchTerm,
    categories = [],
    selectedCategory = 'all',
    setSelectedCategory = () => {}
}: CatalogHeaderProps) {
    return (
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium uppercase">
                    Productos Registrados:
                    <span className="text-primary leading-relaxed text-lg tracking-wider font-bold"> {productCount}</span>
                </h3>
            </div>

            <article className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                <div className="relative group w-full sm:w-56 lg:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted group-focus-within:text-contrast transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-bold text-primary placeholder:font-medium placeholder:text-foreground-muted text-sm shadow-sm"
                    />
                </div>
                
                <div className="relative group w-full sm:w-48 lg:w-56 shrink-0">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted group-focus-within:text-contrast transition-colors z-10 pointer-events-none" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-bold text-primary text-sm shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="all">Todas las Categorías</option>
                        {categories.map(cat => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>

                <button
                    onClick={onOpenProductModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-contrast hover:bg-contrast-hover transition-all duration-300 text-white font-black text-sm px-6 py-3.5 rounded-2xl cursor-pointer whitespace-nowrap shadow-lg shadow-contrast/20 active:scale-95 shrink-0"
                >
                    <Plus className="h-4 w-4" />
                    Nuevo Producto
                </button>
            </article>
        </header>
    );
}
