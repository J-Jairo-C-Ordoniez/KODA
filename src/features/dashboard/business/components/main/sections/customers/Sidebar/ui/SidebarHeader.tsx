'use client';

import { Users, Plus } from 'lucide-react';

interface SidebarHeaderProps {
  onNewCustomer: () => void;
}

export default function SidebarHeader({ onNewCustomer }: SidebarHeaderProps) {
  return (
    <div className="space-y-3 border-b border-primary/5 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary text-background flex items-center justify-center shadow-md">
          <Users size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold text-primary tracking-tight">Clientes</h2>
          <p className="text-xs font-medium text-primary/50">Cuaderno y deudas</p>
        </div>
      </div>

      <button
        onClick={onNewCustomer}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
      >
        <Plus size={15} /> Nuevo cliente
      </button>
    </div>
  );
}
