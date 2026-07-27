'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Plus } from 'lucide-react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import SidebarHeader from '@/features/dashboard/business/components/main/sections/team/Sidebar/ui/SidebarHeader';

interface SidebarProps {
  employees: Employee[];
  selectedEmployeeId: string | null;
  onSelectEmployee: (id: string | null) => void;
  onNewEmployee: () => void;
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
  onNewEmployee,
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

  const triggerMobileClose = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleSelect = (id: string | null) => {
    onSelectEmployee(id);
    triggerMobileClose();
  };

  const handleNewEmployee = () => {
    onNewEmployee();
    triggerMobileClose();
  };

  return (
    <aside
      ref={containerRef}
      className="w-full h-full bg-background p-4 pt-20 flex flex-col gap-6 overflow-y-auto"
    >
      <SidebarHeader title="Equipo" />

      <nav className="flex flex-col gap-8">
        <section className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold text-primary/40 uppercase tracking-wider px-2 mb-2">
            Acciones
          </h3>
          <button
            onClick={handleNewEmployee}
            className="gsap-menu-item flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-primary/60 transition-colors duration-200 hover:bg-foreground-muted/40 hover:text-primary cursor-pointer"
          >
            <Plus size={18} />
            Nuevo empleado
          </button>
        </section>

        <section className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold text-primary/40 uppercase tracking-wider px-2 mb-2">
            Empleados
          </h3>

          {employees.length === 0 ? (
            <p className="px-2 py-6 text-sm font-medium leading-relaxed text-primary/60">
              No hay empleados registrados.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {employees.map((employee) => {
                const isSelected = selectedEmployeeId === employee.userId;

                return (
                  <li key={employee.userId}>
                    <button
                      onClick={() => handleSelect(employee.userId)}
                      className={`gsap-menu-item group/employee flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-foreground-muted/40 text-primary font-medium'
                          : 'text-primary/60 hover:bg-foreground-muted/40 hover:text-primary'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-foreground-muted/60 text-xs font-bold text-primary">
                          {employee.avatar ? (
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            getInitials(employee.name)
                          )}
                        </div>
                        <span className="truncate text-sm">{employee.name}</span>
                      </div>

                      <span className="text-sm font-medium text-primary/40">
                        {employee._count.sales}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </nav>
    </aside>
  );
}
