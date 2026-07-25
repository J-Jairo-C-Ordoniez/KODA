'use client';

import Button from '@/shared/components/Button';

interface SidebarHeaderProps {
  selectedEmployeeId: string | null;
  onSelectAll: () => void;
}

export default function SidebarHeader({ selectedEmployeeId, onSelectAll }: SidebarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-2 mt-2">
      <h2 className="text-lg font-medium text-primary tracking-tight">
        Equipo
      </h2>
      <Button
        variant="secondary"
        className="px-2 py-1"
        disabled={selectedEmployeeId === null}
        size="sm"
        onClick={onSelectAll}
      >
        Ver Todo
      </Button>
    </header>
  );
}
