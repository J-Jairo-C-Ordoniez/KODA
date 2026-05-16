import { ShoppingBag, Search, X } from 'lucide-react';

interface SalesSearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SalesSearchHeader({ searchTerm, setSearchTerm }: SalesSearchHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-3">
        <figure className="w-8 h-8 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast shrink-0" aria-hidden="true">
          <ShoppingBag size={16} />
        </figure>
        <hgroup>
          <h4 className="text-xl font-bold tracking-tight text-primary leading-none">Listado de transacciones</h4>
          <p className="text-sm font-medium text-foreground-muted mt-1">Gestiona y revisa cada venta</p>
        </hgroup>
      </div>

      <nav className="relative group w-full sm:w-auto" aria-label="Buscar transacciones">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors duration-200" size={16} aria-hidden="true" />
        <input 
          type="search" 
          placeholder="Buscar por vendedor o cliente..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[280px] pl-11 pr-10 py-3 rounded-2xl bg-background-elevated border border-foreground/8 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-xs text-primary placeholder:text-foreground-muted/40"
          aria-label="Buscar por vendedor o cliente"
        />
        {searchTerm && (
          <button 
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-foreground/5 text-foreground-muted transition-all"
            aria-label="Limpiar búsqueda"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </nav>
    </header>
  );
}
