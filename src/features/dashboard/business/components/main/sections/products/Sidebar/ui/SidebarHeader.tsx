'use client';

import Button from "@/shared/components/Button";

interface SidebarHeaderProps {
  selectedProductId: string | null;
  onSelectAll: () => void;
}

export default function SidebarHeader({ selectedProductId, onSelectAll }: SidebarHeaderProps) {
  return (
    <header className="flex flex-col items-start gap-3 px-5 mb-6">
      <h2 className="text-xl font-bold text-primary tracking-tight leading-tight">
        Productos
      </h2>
      {selectedProductId && (
        <Button
          variant="secondary"
          className="shrink-0"
          size="sm"
          onClick={onSelectAll}
        >
          Ver Todo
        </Button>
      )}
    </header>
  );
}
