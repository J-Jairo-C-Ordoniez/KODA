import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SalesPaginationProps {
  page: number;
  hasMore: boolean;
  loading: boolean;
  onPageChange: (newPage: number) => void;
}

export default function SalesPagination({ page, hasMore, loading, onPageChange }: SalesPaginationProps) {
  return (
    <nav className="flex items-center justify-between border-t border-foreground/5 pt-4 px-2 sm:px-4 mt-2" aria-label="Paginación de ventas">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground-muted">
          Página <strong className="text-primary">{page}</strong>
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || loading}
          className="p-2 sm:px-4 sm:py-2 rounded-xl border border-foreground/10 bg-background text-primary text-sm font-semibold hover:bg-foreground/5 hover:border-foreground/20 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Anterior</span>
        </button>
        
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore || loading}
          className="p-2 sm:px-4 sm:py-2 rounded-xl border border-foreground/10 bg-background text-primary text-sm font-semibold hover:bg-foreground/5 hover:border-foreground/20 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
          aria-label="Página siguiente"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
