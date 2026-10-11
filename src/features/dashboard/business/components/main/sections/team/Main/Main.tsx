'use client';

import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import type { Employee } from '@/features/dashboard/business/api/team.api';
import type { ToastType } from '@/shared/hooks/useToast';

import EmployeeCard from '@/features/dashboard/business/components/main/sections/team/Main/ui/EmployeeCard';
import EmployeeDrawer from '@/features/dashboard/business/components/main/sections/team/Main/ui/EmployeeDrawer';
import EmployeeForm from '@/features/dashboard/business/components/main/sections/team/Main/ui/EmployeeForm';
import Loader from '@/shared/components/Loader';
import Button from '@/shared/components/Button';

type ActiveView = 'grid' | 'create-employee';
type ToastHandler = (type: ToastType, message: string, description?: string) => void;

interface TeamMainProps {
  showToast: ToastHandler;
  selectedEmployeeId: string | null;
  employees: Employee[];
  isLoading: boolean;
  isSaving: boolean;
  createEmployee: (data: any) => Promise<{ success: boolean; error?: string }>;
  updateEmployee: (id: string, data: any) => Promise<{ success: boolean; error?: string }>;
  deleteEmployee: (id: string) => Promise<{ success: boolean; error?: string }>;
  /** Se activa cuando el usuario presiona "Nuevo empleado" en la sidebar */
  pendingNewEmployee?: boolean;
  /** Callback para notificar que se procesó el pending */
  onNewEmployeeHandled?: () => void;
  isSidebarOpen: boolean;
}

export default function TeamMain({
  showToast,
  selectedEmployeeId,
  employees,
  isLoading,
  isSaving,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  pendingNewEmployee,
  onNewEmployeeHandled,
  isSidebarOpen,
}: TeamMainProps) {
  const [activeView, setActiveView] = useState<ActiveView>('grid');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [drawerEmployee, setDrawerEmployee] = useState<Employee | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Reaccionar al trigger desde la sidebar
  useEffect(() => {
    if (pendingNewEmployee) {
      setEditingEmployee(null);
      setActiveView('create-employee');
      onNewEmployeeHandled?.();
    }
  }, [pendingNewEmployee, onNewEmployeeHandled]);

  const selectedEmployee = useMemo<Employee | null>(() => {
    if (!selectedEmployeeId) return null;
    return employees.find((e) => e.userId === selectedEmployeeId) ?? null;
  }, [employees, selectedEmployeeId]);

  const displayedEmployees = useMemo<Employee[]>(() => {
    let list = selectedEmployee ? [selectedEmployee] : employees;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (emp) =>
          emp.name.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [employees, selectedEmployee, searchQuery]);

  const handleOpenDrawer = (employee: Employee) => {
    setDrawerEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsDrawerOpen(false);
    setActiveView('create-employee');
  };

  const handleSave = async (data: any) => {
    if (editingEmployee) {
      const res = await updateEmployee(editingEmployee.userId, data);
      if (res.success) {
        showToast('success', 'Empleado actualizado', 'Los cambios se guardaron correctamente.');
        setActiveView('grid');
        setEditingEmployee(null);
      } else {
        showToast('error', 'Error al actualizar', res.error);
      }
      return res;
    } else {
      const res = await createEmployee(data);
      if (res.success) {
        showToast('success', 'Empleado creado', 'El nuevo miembro ya puede iniciar sesión.');
        setActiveView('grid');
      } else {
        showToast('error', 'Error al crear empleado', res.error);
      }
      return res;
    }
  };

  const handleDelete = async (employeeId: string) => {
    const emp = employees.find((e) => e.userId === employeeId);
    if (!emp) return { success: false, error: 'Empleado no encontrado' };
    if (confirm(`¿Estás seguro de que deseas eliminar al empleado "${emp.name}"?`)) {
      const res = await deleteEmployee(employeeId);
      if (res.success) {
        showToast('success', 'Empleado eliminado', 'El miembro fue removido del equipo.');
        setIsDrawerOpen(false);
      } else {
        showToast('error', 'Error al eliminar', res.error);
      }
      return res;
    }
    return { success: false };
  };

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background py-20">
        <Loader />
      </div>
    );
  }

  return (
    <main className="w-full space-y-8">
      {/* ── Form view ── */}
      {activeView === 'create-employee' && (
        <EmployeeForm
          editingEmployee={editingEmployee}
          onCancel={() => {
            setActiveView('grid');
            setEditingEmployee(null);
          }}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}

      {/* ── Grid view ── */}
      {activeView === 'grid' && (
        <section className="space-y-6 animate-in fade-in duration-500">
          <header className="border-b border-primary/10 pb-6">
            <div className="relative w-full max-w-xl">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary/40">
                <MagnifyingGlassIcon size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o correo..."
                className="w-full rounded-2xl border border-primary/10 bg-background py-3.5 pl-10 pr-10 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 hover:border-primary/20 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary/40 transition-colors hover:text-primary cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <XIcon size={18} />
                </button>
              )}
            </div>
          </header>

          {/* Grid */}
          {displayedEmployees.length === 0 ? (
            <div className="flex min-h-75 w-full flex-col items-center justify-center rounded-3xl border border-primary/10 bg-background/80 px-6 py-20 text-center shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-primary">
                {searchQuery ? 'No se encontraron miembros' : 'Sin empleados registrados'}
              </h3>
              <p className="my-2 max-w-md text-sm leading-relaxed text-foreground/65 sm:text-base">
                {searchQuery
                  ? `Ningún miembro coincide con "${searchQuery}".`
                  : 'Agrega el primer miembro de tu equipo para comenzar a registrar ventas con acceso individual.'}
              </p>
              {!searchQuery && (
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditingEmployee(null);
                    setActiveView('create-employee');
                  }}
                >
                  Crear primer empleado
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${isSidebarOpen ? 'xl:grid-cols-2' : 'xl:grid-cols-3'}`}>
              {displayedEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.userId}
                  employee={emp}
                  onOpenDrawer={handleOpenDrawer}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Drawer ── */}
      <EmployeeDrawer
        isOpen={isDrawerOpen}
        employee={drawerEmployee}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isSaving={isSaving}
      />
    </main>
  );
}
