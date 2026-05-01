import { Plus, X, Check, Edit3, Eye, EyeOff, TrendingUp, AlertTriangle, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
  const inputClass = "w-full px-5 py-4 rounded-2xl border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary bg-foreground/[0.02]";
  const labelClass = "block text-xs font-black uppercase tracking-widest text-secondary mb-2 ml-1";

  return (
    <>
      <div>
        <label className={labelClass}>Nombre Completo</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))}
          className={inputClass}
          placeholder="Ej. Carlos Rodriguez"
        />
      </div>
      <div>
        <label className={labelClass}>Correo Electrónico</label>
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
        <label className={labelClass}>{isEdit ? 'Nueva Contraseña (opcional)' : 'Contraseña'}</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required={!isEdit}
            minLength={6}
            value={formData.password}
            onChange={e => setFormData((p: any) => ({ ...p, password: e.target.value }))}
            className={`${inputClass} pr-14`}
            placeholder={isEdit ? 'Dejar vacío para mantener actual' : 'Mínimo 6 caracteres'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors p-1"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </>
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
        <header className="p-8 border-b border-foreground/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
              {isEdit ? <Edit3 size={22} className="text-navy" /> : <Plus size={24} className="text-navy" />}
            </div>
            <div>
              <h3 className="text-xl font-black text-primary">{isEdit ? 'Editar Empleado' : 'Registrar Empleado'}</h3>
              <p className="text-secondary text-xs font-medium truncate max-w-[180px]">
                {isEdit ? employeeName : 'Estas son sus credenciales de acceso'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors" aria-label="Cerrar">
            <X size={24} />
          </button>
        </header>

        <form onSubmit={onSubmit} className="p-8 space-y-5">
          <EmployeeFormFields formData={formData} setFormData={setFormData} showPassword={showPassword} setShowPassword={setShowPassword} isEdit={isEdit} />
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-[2] py-4 rounded-2xl bg-navy text-white font-black text-xs uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : <><Check size={16} /> {isEdit ? 'Guardar Cambios' : 'Registrar'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EmployeeSalesModal({ isOpen, onClose, salesEmployee, totalSalesAmount }: any) {
  if (!isOpen || !salesEmployee) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] w-full max-w-lg shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        <header className="p-8 border-b border-foreground/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
              <TrendingUp size={22} className="text-navy" />
            </div>
            <div>
              <h3 className="text-xl font-black text-primary">Historial de Ventas</h3>
              <p className="text-secondary text-xs font-medium">{salesEmployee.name} · {salesEmployee._count?.sales ?? 0} ventas registradas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors" aria-label="Cerrar">
            <X size={24} />
          </button>
        </header>

        <div className="px-8 pt-6 pb-4 grid grid-cols-2 gap-4 shrink-0">
          <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-1">Total Generado</p>
            <p className="text-xl font-black text-green-700">${totalSalesAmount(salesEmployee).toLocaleString('es-ES')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-navy/5 border border-navy/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-navy/60 mb-1">Número de Ventas</p>
            <p className="text-xl font-black text-navy">{salesEmployee._count?.sales ?? 0}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-3 custom-scrollbar">
          {(!salesEmployee.sales || salesEmployee.sales.length === 0) ? (
            <div className="py-12 text-center">
              <p className="text-secondary font-medium italic opacity-50">Este empleado aún no ha registrado ventas.</p>
            </div>
          ) : (
            salesEmployee.sales.map((sale: any) => (
              <div key={sale.saleId} className="flex items-center justify-between p-4 rounded-2xl bg-foreground/2 border border-foreground/5 hover:bg-white transition-all">
                <div>
                  <p className="text-xs font-black text-primary tracking-tight">
                    {PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}
                  </p>
                  <p className="text-xs text-secondary font-bold mt-0.5">
                    {new Date(sale.createdAt).toLocaleDateString('es-ES')} · {new Date(sale.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <p className="text-sm font-black text-green-600">+${Number(sale.total).toLocaleString('es-ES')}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, employee, isSaving }: any) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] w-full max-w-sm shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
        <div className="p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary">¿Eliminar Empleado?</h3>
            <p className="text-secondary text-sm font-medium mt-2">
              <span className="font-black text-primary">{employee.name}</span> perderá el acceso al sistema inmediatamente.
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              disabled={isSaving}
              className="flex-[1.5] py-4 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSaving ? 'Eliminando...' : <><Trash2 size={15} /> Eliminar</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
