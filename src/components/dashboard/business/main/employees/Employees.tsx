'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Users, Plus, Trash2, X, Check, ShoppingCart,
  ChevronRight, Mail, Calendar, TrendingUp, Eye, EyeOff,
  AlertTriangle, MoreVertical, Edit3
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEmployees } from '@/hooks/admin/useEmployees';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import { EmptyState } from '@/components/dashboard/business/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { Toaster, useToast } from '@/components/ui/Toast';

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  online: 'En línea',
  debt: 'Fiado',
};

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
  const [showPassword, setShowPassword] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openCreate = () => {
    setFormData(EMPTY_FORM);
    setShowPassword(false);
    setShowCreate(true);
  };

  const openEdit = (emp: any) => {
    setFormData({ name: emp.name, email: emp.email, password: '' });
    setShowPassword(false);
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
      showToast('success', 'Actualizado', 'Los datos del empleado han sido actualizados.');
      setEditingEmployee(null);
    } else {
      showToast('error', 'Error', result.error || 'No se pudo actualizar.');
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const result = await deleteEmployee(confirmDelete.userId);
    if (result.success) {
      showToast('success', 'Eliminado', `${confirmDelete.name} fue eliminado del equipo.`);
      setConfirmDelete(null);
    } else {
      showToast('error', 'Error', result.error || 'No se pudo eliminar.');
    }
  };

  const totalSalesAmount = (emp: any) =>
    emp.sales?.reduce((acc: number, s: any) => acc + Number(s.total), 0) ?? 0;

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Empleados"
        subtitle="Administra el equipo de tu negocio. Registra, edita y consulta las ventas de cada colaborador."
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-navy text-white px-5 py-3 rounded-2xl font-black text-sm hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-navy/20"
          >
            <Plus size={18} />
            Registrar Empleado
          </button>
        }
      />

      {isLoading ? (
        <Loader size="lg" className="h-[40vh]" />
      ) : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : employees.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Sin empleados registrados"
          description="Aún no has añadido colaboradores a tu equipo. ¡Registra el primero!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((emp: any) => (
            <article
              key={emp.userId}
              className="bg-background border border-foreground/5 rounded-[28px] p-5 space-y-4 hover:shadow-xl hover:shadow-navy/5 hover:border-navy/10 transition-all group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-navy/[0.03] rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />

              {/* Header */}
              <div className={`flex items-center justify-between relative ${activeMenuId === emp.userId ? 'z-30' : 'z-10'}`}>
                <div className="w-11 h-11 rounded-xl bg-navy/10 flex items-center justify-center group-hover:bg-navy transition-colors">
                  <Users size={20} className="text-navy group-hover:text-white transition-colors" />
                </div>

                {/* 3-dot menu */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === emp.userId ? null : emp.userId); }}
                    className="p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeMenuId === emp.userId && (
                    <div ref={menuRef} className="absolute right-0 mt-2 w-52 bg-background border border-foreground/10 rounded-[24px] shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); openEdit(emp); }}
                        className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-primary hover:bg-navy/5 hover:text-navy rounded-2xl transition-all group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-navy/5 flex items-center justify-center group-hover/item:bg-navy group-hover/item:text-white transition-colors">
                          <Edit3 size={16} />
                        </div>
                        Editar
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); setConfirmDelete(emp); }}
                        className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-red-100/50 flex items-center justify-center group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">
                          <Trash2 size={16} />
                        </div>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-0.5 relative z-10">
                <h3 className="text-sm font-black text-primary group-hover:text-navy transition-colors truncate uppercase tracking-tight">{emp.name}</h3>
                <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold">
                  <Mail size={11} className="text-navy/40" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold">
                  <Calendar size={11} className="text-navy/40" />
                  Desde {new Date(emp.createdAt).toLocaleDateString('es-CO')}
                </div>
              </div>

              {/* Stats */}
              <div className="pt-3 border-t border-foreground/5 grid grid-cols-2 gap-3 relative z-10">
                <div className="bg-foreground/[0.03] rounded-xl p-3">
                  <p className="text-[8px] font-black uppercase tracking-widest text-secondary mb-1">Ventas</p>
                  <p className="text-lg font-black text-primary">{emp._count?.sales ?? 0}</p>
                </div>
                <div className="bg-foreground/[0.03] rounded-xl p-3">
                  <p className="text-[8px] font-black uppercase tracking-widest text-secondary mb-1">Total</p>
                  <p className="text-sm font-black text-green-600">${totalSalesAmount(emp).toLocaleString('es-CO')}</p>
                </div>
              </div>

              {/* Ver ventas button */}
              <button
                onClick={() => setSalesEmployee(emp)}
                className="w-full py-3 rounded-xl bg-foreground/5 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-navy hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative z-10"
              >
                <ShoppingCart size={13} />
                Ver historial de ventas
                <ChevronRight size={13} />
              </button>
            </article>
          ))}
        </div>
      )}

      {/* ========== MODAL CREAR ========== */}
      {showCreate && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-foreground/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <Plus size={24} className="text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary">Registrar Empleado</h3>
                  <p className="text-secondary text-xs font-medium">Los datos son sus credenciales de acceso</p>
                </div>
              </div>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-8 space-y-5">
              <EmployeeFormFields formData={formData} setFormData={setFormData} showPassword={showPassword} setShowPassword={setShowPassword} />
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-[2] py-4 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : <><Check size={16} /> Registrar</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL EDITAR ========== */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-foreground/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <Pencil size={22} className="text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary">Editar Empleado</h3>
                  <p className="text-secondary text-xs font-medium truncate max-w-[180px]">{editingEmployee.name}</p>
                </div>
              </div>
              <button onClick={() => setEditingEmployee(null)} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-5">
              <EmployeeFormFields formData={formData} setFormData={setFormData} showPassword={showPassword} setShowPassword={setShowPassword} isEdit />
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setEditingEmployee(null)} className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-[2] py-4 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : <><Check size={16} /> Guardar Cambios</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL VENTAS ========== */}
      {salesEmployee && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] w-full max-w-lg shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-foreground/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
                  <TrendingUp size={22} className="text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary">Historial de Ventas</h3>
                  <p className="text-secondary text-xs font-medium">{salesEmployee.name} · {salesEmployee._count?.sales ?? 0} ventas registradas</p>
                </div>
              </div>
              <button onClick={() => setSalesEmployee(null)} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Summary */}
            <div className="px-8 pt-6 pb-4 grid grid-cols-2 gap-4 shrink-0">
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                <p className="text-[9px] font-black uppercase tracking-widest text-green-500 mb-1">Total Generado</p>
                <p className="text-xl font-black text-green-700">${totalSalesAmount(salesEmployee).toLocaleString('es-CO')}</p>
              </div>
              <div className="p-4 rounded-2xl bg-navy/5 border border-navy/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-navy/60 mb-1">N° de Ventas</p>
                <p className="text-xl font-black text-navy">{salesEmployee._count?.sales ?? 0}</p>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-3 custom-scrollbar">
              {(!salesEmployee.sales || salesEmployee.sales.length === 0) ? (
                <div className="py-12 text-center">
                  <p className="text-secondary font-medium italic opacity-50">Este empleado aún no ha registrado ventas.</p>
                </div>
              ) : (
                salesEmployee.sales.map((sale: any) => (
                  <div key={sale.saleId} className="flex items-center justify-between p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:bg-white transition-all">
                    <div>
                      <p className="text-xs font-black text-primary tracking-tight">
                        {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                      </p>
                      <p className="text-[10px] text-secondary font-bold mt-0.5">
                        {new Date(sale.createdAt).toLocaleDateString('es-CO')} · {new Date(sale.createdAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <p className="text-sm font-black text-green-600">+${Number(sale.total).toLocaleString('es-CO')}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL CONFIRMAR ELIMINAR ========== */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-background rounded-[40px] w-full max-w-sm shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-black text-primary">¿Eliminar empleado?</h3>
                <p className="text-secondary text-sm font-medium mt-2">
                  <span className="font-black text-primary">{confirmDelete.name}</span> perderá acceso al sistema inmediatamente.
                </p>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="flex-[1.5] py-4 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? 'Eliminando...' : <><Trash2 size={15} /> Eliminar</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ---- Sub-componente reutilizable de formulario ----
function EmployeeFormFields({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  isEdit = false
}: {
  formData: { name: string; email: string; password: string };
  setFormData: (d: any) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isEdit?: boolean;
}) {
  const inputClass = "w-full px-5 py-4 rounded-2xl border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary bg-foreground/[0.02]";
  const labelClass = "block text-[10px] font-black uppercase tracking-widest text-secondary mb-2 ml-1";

  return (
    <>
      <div>
        <label className={labelClass}>Nombre completo</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))}
          className={inputClass}
          placeholder="Ej. Carlos Rodríguez"
        />
      </div>
      <div>
        <label className={labelClass}>Correo electrónico</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData((p: any) => ({ ...p, email: e.target.value }))}
          className={inputClass}
          placeholder="empleado@negocio.com"
        />
      </div>
      <div>
        <label className={labelClass}>{isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'}</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required={!isEdit}
            minLength={6}
            value={formData.password}
            onChange={e => setFormData((p: any) => ({ ...p, password: e.target.value }))}
            className={`${inputClass} pr-14`}
            placeholder={isEdit ? 'Dejar vacío para no cambiar' : 'Mínimo 6 caracteres'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </>
  );
}
