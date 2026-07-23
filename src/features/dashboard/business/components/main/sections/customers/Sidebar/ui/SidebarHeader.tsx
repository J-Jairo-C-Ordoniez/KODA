'use client';

interface SidebarHeaderProps {
  filterType: string;
  onSelectAll: () => void;
}

export default function SidebarHeader({ filterType, onSelectAll }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mt-2">
      <h2 className="text-lg font-medium text-primary tracking-tight">Clientes</h2>
      <button
        onClick={onSelectAll}
        className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          filterType === 'all'
            ? 'bg-foreground-muted/40 text-primary'
            : 'text-primary/45 hover:bg-foreground-muted/40 hover:text-primary'
        }`}
      >
        Ver todos
      </button>
    </div>
  );
}
