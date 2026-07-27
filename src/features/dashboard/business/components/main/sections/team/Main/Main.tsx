'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, UserPlus } from 'lucide-react';
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
}: TeamMainProps) {
  const [activeView, setActiveView] = useState<ActiveView>('grid');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [drawerEmployee, setDrawerEmployee] = useState<Employee | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    if (selectedEmployee) return [selectedEmployee];
    return employees;
  }, [employees, selectedEmployee]);

  const handleOpenDrawer = (employee: Employee) => {
    setDrawerEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleEditFromDrawer = (employee: Employee) => {
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
    const res = await deleteEmployee(employeeId);
    if (res.success) {
      showToast('success', 'Empleado eliminado', 'El miembro fue removido del equipo.');
    } else {
      showToast('error', 'Error al eliminar', res.error);
    }
    return res;
  };

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-7">

      {/* ── Form view ── */}
      {activeView === 'create-employee' && (
        <EmployeeForm
          editingEmployee={editingEmployee}
          onCancel={() => { setActiveView('grid'); setEditingEmployee(null); }}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}

      {/* ── Grid view ── */}
      {activeView === 'grid' && (
        <section className="space-y-6 animate-in fade-in duration-500">
          {/* Header + breadcrumb */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
            <nav
              className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary/60"
              aria-label="Ubicación del Equipo"
            >
              <span className="rounded-md bg-foreground-muted/40 px-3 py-1 text-sm text-primary/80">
                Equipo
              </span>
              <ChevronRight size={18} className="text-primary/25" />
              <span className="p-1 text-sm text-primary/80">
                {selectedEmployee ? selectedEmployee.name : 'Todos los empleados'}
              </span>
            </nav>
          </header>

          {/* Grid */}
          {displayedEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 w-full mx-auto">
              <h3 className="text-lg font-medium text-primary tracking-tight">
                Sin empleados registrados
              </h3>
              <p className="text-sm text-primary/60 leading-relaxed max-w-md my-2">
                Agrega el primer miembro de tu equipo para comenzar a registrar ventas con acceso individual.
              </p>
              <Button
                variant="primary"
                onClick={() => { setEditingEmployee(null); setActiveView('create-employee'); }}
              >
                <UserPlus size={15} />
                Crear primer empleado
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.userId}
                  employee={emp}
                  onClick={() => handleOpenDrawer(emp)}
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
        onEdit={handleEditFromDrawer}
        onDelete={handleDelete}
        isSaving={isSaving}
      />
    </div>
  );
}
