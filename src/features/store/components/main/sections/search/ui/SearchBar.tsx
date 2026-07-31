'use client';

import { Search, X } from 'lucide-react';

interface Props {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({ query, onChange, onClear }: Props) {
  return (
    <header className="max-w-2xl mx-auto mb-16 space-y-6 text-center">
      <hgroup className="space-y-1.5">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
          Encuentra tu prenda
        </h1>
      </hgroup>

      <div
        role="search"
        className="relative border-b border-primary/20 focus-within:border-primary transition-colors pt-2 pb-3"
      >
        <Search
          size={20}
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40"
        />
        <input
          type="search"
          id="store-search"
          aria-label="Buscar prendas por nombre o categoría"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe nombre o categoría..."
          autoFocus
          autoComplete="off"
          className="w-full pl-8 pr-8 bg-transparent text-base md:text-xl font-medium tracking-tight placeholder:text-primary/30 focus:outline-none text-primary"
        />
        {query && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
