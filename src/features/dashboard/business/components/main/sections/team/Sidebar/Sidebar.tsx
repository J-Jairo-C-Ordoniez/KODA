'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Users } from 'lucide-react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import { formatCurrency } from '@/lib/formatters';
import SidebarHeader from '@/features/dashboard/business/components/main/sections/team/Sidebar/ui/SidebarHeader';

interface SidebarProps {
  employees: Employee[];
  selectedEmployeeId: string | null;
  onSelectEmployee: (id: string | null) => void;
  onCloseMobile?: () => void;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Sidebar({
  employees,
  selectedEmployeeId,
  onSelectEmployee,
  onCloseMobile,
}: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-menu-item', {
        x: -10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (id: string | null) => {
    onSelectEmployee(id);
    if (typeof window !== 'undefined' && window.innerWidth < 768 && onCloseMobile) {
      onCloseMobile();
    }
  };

  const totalSales = employees.reduce((sum, e) => sum + e._count.sales, 0);

  return (
    <aside
      ref={containerRef}
      className="w-full h-full bg-background p-4 pt-20 flex flex-col gap-6 overflow-y-auto"
    >
      <SidebarHeader
        selectedEmployeeId={selectedEmployeeId}
        onSelectAll={() => handleSelect(null)}
      />

      {/* Summary pill */}
      <div className="gsap-menu-item px-2">
        <button
          onClick={() => handleSelect(null)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
            selectedEmployeeId === null
              ? 'bg-primary text-background border-primary shadow-xs'
              : 'border-primary/8 text-primary/70 hover:bg-foreground-muted/40'
          }`}
        >
          <div className={`p-1.5 rounded-lg ${selectedEmployeeId === null ? 'bg-white/20' : 'bg-foreground-muted/60'}`}>
            <Users size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">Todos los empleados</p>
            <p className="text-[10px] opacity-70">{employees.length} miembros · {totalSales} ventas</p>
          </div>
        </button>
      </div>

      {/* Employee list */}
      <div className="flex flex-col gap-1 px-2">
        {employees.map((emp) => {
          const totalAmount = emp.sales.reduce((sum, s) => sum + s.total, 0);
          const isSelected = selectedEmployeeId === emp.userId;

          return (
            <button
              key={emp.userId}
              onClick={() => handleSelect(emp.userId)}
              className={`gsap-menu-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
                isSelected
                  ? 'bg-primary text-background border-primary shadow-xs'
                  : 'border-transparent text-primary/70 hover:bg-foreground-muted/40 hover:border-primary/8'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isSelected
                    ? 'bg-white/20 text-background'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                {emp.avatar ? (
                  <img src={emp.avatar} alt={emp.name} className="w-full h-full rounded-lg object-cover" />
                ) : (
                  getInitials(emp.name)
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{emp.name}</p>
                <p className={`text-[10px] truncate ${isSelected ? 'opacity-70' : 'text-primary/45'}`}>
                  {emp._count.sales} ventas · {formatCurrency(totalAmount)}
                </p>
              </div>

              {/* Sales badge */}
              <span
                className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20' : 'bg-foreground-muted/60 text-primary/60'
                }`}
              >
                {emp._count.sales}
              </span>
            </button>
          );
        })}

        {employees.length === 0 && (
          <p className="text-xs text-primary/40 text-center py-4">Sin empleados registrados</p>
        )}
      </div>
    </aside>
  );
}
