'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PlusIcon, UserCircleIcon, UsersIcon } from '@phosphor-icons/react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import Button from '@/shared/components/Button';

interface SidebarProps {
  employees: Employee[];
  selectedEmployeeId: string | null;
  onSelectEmployee: (id: string | null) => void;
  onNewEmployee: () => void;
  onCloseMobile?: () => void;
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
      className="flex h-full w-full flex-col overflow-y-auto bg-background px-2 py-4 md:px-4 xl:px-10"
    >
      <header className="mb-6 flex flex-col items-start gap-3 px-5">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-primary">Equipo</h2>
        {selectedEmployeeId && (
          <Button variant="secondary" size="sm" onClick={() => handleSelect(null)}>
            Ver todos
          </Button>
        )}
      </header>

      <nav className="flex flex-col gap-7">
        <section className="flex flex-col gap-1 pt-4">
          <h3 className="mb-2 px-5 text-sm font-medium uppercase leading-tight tracking-tight text-primary/40">
            Acciones
          </h3>
          <button
            onClick={handleNewEmployee}
            className="gsap-menu-item flex items-center gap-5 rounded-full px-5 py-3.5 text-left text-xl font-medium leading-tight tracking-tight text-primary/80 transition-colors duration-200 hover:bg-primary/5 hover:text-primary cursor-pointer"
          >
            <PlusIcon size={28} weight="regular" />
            Nuevo empleado
          </button>
        </section>

        <section className="flex flex-col gap-1 pt-4">
          <h3 className="mb-2 px-5 text-sm font-medium uppercase leading-tight tracking-tight text-primary/40">
            Miembros
          </h3>

          {employees.length === 0 ? (
            <p className="px-5 py-6 text-sm font-medium leading-relaxed text-primary/60">
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
                      className={`gsap-menu-item flex w-full items-center justify-between rounded-full px-5 py-3.5 text-xl font-medium leading-tight tracking-tight transition-colors duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-primary/10 text-primary'
                          : 'text-primary/65 hover:bg-primary/5 hover:text-primary'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-5">
                        <UserCircleIcon size={28} weight={isSelected ? 'fill' : 'regular'} className="shrink-0" />
                        <span className="truncate">{employee.name}</span>
                      </div>

                      <span className="text-sm font-medium text-primary/50">
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

      <div className="mt-auto flex items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-background/80 p-4">
        <div>
          <p className="text-sm font-medium leading-relaxed text-foreground/60">Total miembros</p>
          <p className="text-2xl font-bold leading-tight tracking-tight text-primary">
            {employees.length}
          </p>
        </div>
        <UsersIcon size={26} weight="regular" className="shrink-0 text-primary/40" />
      </div>
    </aside>
  );
}
