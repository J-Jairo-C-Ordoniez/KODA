import { Plus, Search } from 'lucide-react';

export default function HeaderCategory({ handleOpenModal, setSearchTerm, searchTerm, categories }) {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <h3 className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium uppercase">
                    Categorías Registradas:
                    <span className="text-primary leading-relaxed text-lg tracking-wider font-bold"> {categories.length}</span>
                </h3>
            </div>

            <article className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50"
                >
                    <Plus className="h-4 w-4" />
                    Nueva Categoría
                </button>
            </article>
        </header>
    );
}
