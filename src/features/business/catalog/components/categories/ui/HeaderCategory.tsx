import { Plus, Search } from 'lucide-react';

export default function HeaderCategory({ handleOpenModal, setSearchTerm, searchTerm, categories }) {
    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <h3 className="text-foreground/80 text-sm tracking-tight font-medium">
                    Categorías registradas:
                    <span className="text-primary text-lg font-bold ml-1">{categories.length}</span>
                </h3>
            </div>

            <article className="flex items-center gap-4">
                <div className="relative group flex-1 sm:w-56">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted group-focus-within:text-contrast transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary placeholder:text-foreground/60 text-sm shadow-sm"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="shrink-0 flex items-center gap-2 bg-contrast hover:bg-contrast-hover transition-all duration-300 text-white font-bold text-sm px-6 py-3.5 rounded-2xl cursor-pointer shadow-lg shadow-contrast/20 active:scale-95 whitespace-nowrap"
                >
                    <Plus className="h-4 w-4" />
                    Nueva Categoría
                </button>
            </article>
        </header>
    );
}
