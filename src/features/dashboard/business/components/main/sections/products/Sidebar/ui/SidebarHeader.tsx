'use client';

import Button from "@/shared/components/Button";

interface SidebarHeaderProps {
  selectedProductId: string | null;
  onSelectAll: () => void;
}

export default function SidebarHeader({ selectedProductId, onSelectAll }: SidebarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-2 mt-2">
      <h2 className="text-lg font-medium text-primary tracking-tight">
        Productos
      </h2>
      <Button
        variant="secondary"
        className="px-2 py-1"
        disabled={selectedProductId === null}
        size="sm"
        onClick={onSelectAll}
      >
        Ver Todo
      </Button>
    </header>
  );
}
