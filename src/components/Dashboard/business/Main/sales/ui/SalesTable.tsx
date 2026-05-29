'use client';

import { Search } from 'lucide-react';
import SalesSearchHeader from './SalesSearchHeader';
import SalesTableRow from './SalesTableRow';
import SalesPagination from './SalesPagination';

interface SalesTableProps {
  sales: any[];
  newSaleId: string | null;
  onViewInvoice: (sale: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  hasMore: boolean;
  loading: boolean;
  page: number;
  onPageChange: (newPage: number) => void;
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  debt: 'Deuda',
  online: 'En Línea',
};

export function SalesTable({ sales, newSaleId, onViewInvoice, searchTerm, setSearchTerm, hasMore, loading, page, onPageChange }: SalesTableProps) {
  return (
    <div className="w-full space-y-6">
      <SalesSearchHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <header className="hidden lg:grid lg:grid-cols-6 gap-4 px-8 py-4 bg-foreground/2 border-b border-foreground/5 mb-2" aria-hidden="true">
        <span className="text-xs font-semibold tracking-tight text-foreground-muted">Fecha / Hora</span>
        <span className="text-xs font-semibold tracking-tight text-foreground-muted">Vendedor</span>
        <span className="text-xs font-semibold tracking-tight text-foreground-muted">Cliente</span>
        <span className="text-xs font-semibold tracking-tight text-foreground-muted">Método</span>
        <span className="text-xs font-semibold tracking-tight text-foreground-muted text-right">Total</span>
        <span className="text-xs font-semibold tracking-tight text-foreground-muted text-center">Acciones</span>
      </header>

      <div className="space-y-3" role="feed" aria-label="Historial de ventas">
        {sales.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-background-elevated/30 rounded-[32px] border border-dashed border-foreground/10" role="status">
            <figure className="w-16 h-16 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto text-foreground-muted/20" aria-hidden="true">
              <Search size={32} />
            </figure>
            <p className="text-sm font-medium text-foreground-muted">No se encontraron resultados</p>
          </div>
        ) : (
          sales.map((sale: any) => (
            <SalesTableRow 
              key={sale.saleId}
              sale={sale}
              isNew={newSaleId === sale.saleId}
              onViewInvoice={onViewInvoice}
              PAYMENT_LABELS={PAYMENT_LABELS}
            />
          ))
        )}
      </div>

      <SalesPagination 
        page={page} 
        hasMore={hasMore} 
        loading={loading} 
        onPageChange={onPageChange} 
      />
    </div>
  );
}
