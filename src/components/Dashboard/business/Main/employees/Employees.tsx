'use client';

import { useEffect, useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEmployees } from '@/hooks/admin/useEmployees';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { Toaster, useToast } from '@/components/ui/Toast';
import { EmployeeCard } from './ui/EmployeeCard';
import { EmployeeFormModal, EmployeeSalesModal, DeleteConfirmModal } from './ui/EmployeeModals';

const EMPTY_FORM = { name: '', email: '', password: '' };

export default function Employees() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { employees, isLoading, isSaving, error, fetchEmployees, createEmployee, updateEmployee, deleteEmployee } = useEmployees(tenantId);
  const { toasts, showToast, removeToast } = useToast();

  const [showCreate, setShowCreate] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [salesEmployee, setSalesEmployee] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const openCreate = () => {
    setFormData(EMPTY_FORM);
    setShowCreate(true);
  };

  const openEdit = (emp: any) => {
    setFormData({ name: emp.name, email: emp.email, password: '' });
    setEditingEmployee(emp);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createEmployee(formData);
    if (result.success) {
      showToast('success', 'Empleado registrado', `${formData.name} ya puede iniciar sesión.`);
      setShowCreate(false);
    } else {
      showToast('error', 'Error', result.error || 'No se pudo crear el empleado.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;
    const payload: any = { name: formData.name, email: formData.email };
    if (formData.password) payload.password = formData.password;
    const result = await updateEmployee(editingEmployee.userId, payload);
    if (result.success) {
      showToast('success', 'Actualizado', 'Los detalles del empleado han sido actualizados.');
      setEditingEmployee(null);
    } else {
      showToast('error', 'Error', result.error || 'No se pudo actualizar.');
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;

    if ((confirmDelete._count?.sales ?? 0) > 0) {
      showToast('error', 'No se puede eliminar', `El empleado ${confirmDelete.name} ya tiene ventas registradas en el sistema.`);
      setConfirmDelete(null);
      return;
    }

    const result = await deleteEmployee(confirmDelete.userId);
    if (result.success) {
      showToast('success', 'Eliminado', `${confirmDelete.name} fue removido del equipo.`);
      setConfirmDelete(null);
    } else {
      showToast('error', 'Error', result.error || 'No se pudo eliminar.');
    }
  };

  const totalSalesAmount = (emp: any) =>
    emp.sales?.reduce((acc: number, s: any) => acc + Number(s.total), 0) ?? 0;

  return (
    <main className="space-y-8 bg-background w-full min-h-full pt-6 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Equipo de Trabajo"
        subtitle="Gestiona los colaboradores de tu negocio y supervisa su rendimiento."
        action={
          <button
            onClick={openCreate}
            className="w-fit sm:w-auto flex items-center justify-center gap-3 bg-contrast text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-contrast-hover active:scale-95 transition-all shadow-2xl shadow-contrast/20"
          >
            <Plus size={18} />
            Registrar Empleado
          </button>
        }
      />

      {isLoading ? (
        <Loader size="lg" className="h-[40vh]" />
      ) : error ? (
        <p role="alert" className="text-red-400 text-sm font-medium bg-red-500/8 p-4 rounded-2xl border border-red-500/15">{error}</p>
      ) : employees.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Sin empleados registrados"
          description="Aún no has añadido colaboradores a tu equipo. ¡Registra al primero!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((emp: any) => (
            <EmployeeCard
              key={emp.userId}
              emp={emp}
              activeMenuId={activeMenuId}
              setActiveMenuId={setActiveMenuId}
              onEdit={openEdit}
              onDelete={setConfirmDelete}
              onViewSales={setSalesEmployee}
              totalSalesAmount={totalSalesAmount}
            />
          ))}
        </div>
      )}

      <EmployeeFormModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        formData={formData}
        setFormData={setFormData}
        isSaving={isSaving}
        isEdit={false}
      />

      <EmployeeFormModal
        isOpen={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        onSubmit={handleUpdate}
        formData={formData}
        setFormData={setFormData}
        isSaving={isSaving}
        isEdit={true}
        employeeName={editingEmployee?.name}
      />

      <EmployeeSalesModal
        isOpen={!!salesEmployee}
        onClose={() => setSalesEmployee(null)}
        salesEmployee={salesEmployee}
        totalSalesAmount={totalSalesAmount}
      />

      <DeleteConfirmModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        employee={confirmDelete}
        isSaving={isSaving}
      />
    </main>
  );
}
