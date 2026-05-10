'use client';

import { Plus, X, Check, Edit3, Eye, EyeOff, TrendingUp, AlertTriangle, Trash2, Mail, Lock, User, Info, Calendar, CreditCard } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../categories/ui/Modal';
import Loader from '@/components/ui/Loader';

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  online: 'En Línea',
  debt: 'Deuda',
};

function EmployeeFormFields({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  isEdit = false
}: {
  formData: any;
  setFormData: (d: any) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isEdit?: boolean;
}) {
  const inputClass = "w-full pl-12 pr-5 py-4 rounded-2xl border border-white/10 bg-background-elevated focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-foreground-muted/30";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted mb-2 ml-1 opacity-60";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted/40 group-focus-within:text-contrast transition-colors";

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className={labelClass}>Nombre Completo</label>
        <div className="relative group">
          <User size={18} className={iconClass} />
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))}
            className={inputClass}
            placeholder="Ej. Carlos Rodriguez"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label className={labelClass}>Correo Electrónico</label>
        <div className="relative group">
          <Mail size={18} className={iconClass} />
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData((p: any) => ({ ...p, email: e.target.value }))}
            className={inputClass}
            placeholder="empleado@negocio.com"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>{isEdit ? 'Nueva Contraseña (opcional)' : 'Contraseña'}</label>
        <div className="relative group">
          <Lock size={18} className={iconClass} />
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted/40 hover:text-contrast transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isSaving,
  isEdit = false,
  employeeName = ''
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? `Editar: ${employeeName}` : 'Registrar Colaborador'}
      size="lg"
    >
      <div className="px-1 py-2">
        <form onSubmit={onSubmit} className="space-y-8">
          <EmployeeFormFields formData={formData} setFormData={setFormData} showPassword={showPassword} setShowPassword={setShowPassword} isEdit={isEdit} />
          
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-[1.5] py-4 rounded-2xl bg-contrast text-white font-black text-[11px] uppercase tracking-widest hover:bg-contrast-hover transition-all shadow-2xl shadow-contrast/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader size="xs" color="border-white" /> : <><Check size={18} /> {isEdit ? 'Guardar Cambios' : 'Confirmar Registro'}</>}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export function EmployeeSalesModal({ isOpen, onClose, salesEmployee, totalSalesAmount }: any) {
  if (!isOpen || !salesEmployee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rendimiento del Empleado"
      size="xl"
    >
      <div className="space-y-8 px-1 py-2">
        <div className="bg-background-elevated/40 border border-white/5 rounded-[40px] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-8 shadow-2xl shadow-black/10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-contrast/10 flex items-center justify-center text-contrast shrink-0">
              <TrendingUp size={28} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted opacity-60">Estadísticas de</p>
              <h4 className="text-2xl font-black text-primary tracking-tight truncate">{salesEmployee.name}</h4>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial px-6 py-4 rounded-2xl bg-success/10 border border-success/20 text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-success opacity-70 mb-1">Total Generado</p>
              <p className="text-xl font-black text-success tracking-tighter">${totalSalesAmount(salesEmployee).toLocaleString('es-ES')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-4 bg-contrast rounded-full" />
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Historial de Ventas</h5>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {(!salesEmployee.sales || salesEmployee.sales.length === 0) ? (
              <div className="py-20 text-center opacity-10 space-y-4">
                <ShoppingCart size={60} className="mx-auto" />
                <p className="text-xs font-black uppercase tracking-widest">Sin ventas registradas</p>
              </div>
            ) : (
              salesEmployee.sales.map((sale: any) => (
                <div key={sale.saleId} className="flex items-center justify-between p-5 bg-background-elevated/50 border border-white/5 rounded-[24px] group hover:border-contrast/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-background-elevated flex items-center justify-center text-contrast border border-white/5 group-hover:bg-contrast group-hover:text-white transition-all">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-primary tracking-tight">Venta Realizada</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest opacity-60">
                          {new Date(sale.createdAt).toLocaleDateString('es-ES')}
                        </p>
                        <span className="w-1 h-1 rounded-full bg-foreground/20" />
                        <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest opacity-60">
                          {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-primary tracking-tighter">${Number(sale.total).toLocaleString('es-ES')}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <p className="text-[9px] font-medium text-foreground-muted opacity-40 uppercase tracking-widest">Registrada</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/5 flex justify-center">
          <button 
            onClick={onClose}
            className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 rounded-2xl transition-all"
          >
            Cerrar Historial
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, employee, isSaving }: any) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Acción"
      size="lg"
    >
      <div className="p-4 text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mx-auto text-red-500 shadow-2xl shadow-red-500/10">
          <AlertTriangle size={40} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-primary tracking-tight">¿Desvincular Empleado?</h3>
          <p className="text-sm font-medium text-foreground-muted leading-relaxed">
            Estás a punto de eliminar a <span className="text-primary font-black">{employee?.name}</span> de tu equipo. Perderá acceso inmediato a la plataforma.
          </p>
        </div>

        <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl flex items-center gap-3 text-left">
          <Info size={16} className="text-red-400 shrink-0" />
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-tight">Esta acción no se puede deshacer si el empleado no tiene registros.</p>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isSaving}
            className="flex-[1.5] py-4 rounded-2xl bg-red-500 text-white font-black text-[11px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl shadow-red-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <Loader size="xs" color="border-white" /> : <><Trash2 size={16} /> Eliminar Definitivamente</>}
          </button>
        </div>
      </div>
    </Modal>
  );
}
