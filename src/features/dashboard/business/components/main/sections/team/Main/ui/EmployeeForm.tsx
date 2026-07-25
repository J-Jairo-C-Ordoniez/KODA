'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import Button from '@/shared/components/Button';

interface EmployeeFormProps {
  editingEmployee?: {
    userId: string;
    name: string;
    email: string;
  } | null;
  onCancel: () => void;
  onSave: (data: { name: string; email: string; password?: string }) => Promise<{ success: boolean; error?: string }>;
  isSaving: boolean;
}

export default function EmployeeForm({ editingEmployee, onCancel, onSave, isSaving }: EmployeeFormProps) {
  const isEditing = Boolean(editingEmployee);

  const [name, setName] = useState(editingEmployee?.name ?? '');
  const [email, setEmail] = useState(editingEmployee?.email ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Nombre y correo son requeridos.');
      return;
    }
    if (!isEditing && !password.trim()) {
      setError('La contraseña es requerida para nuevos empleados.');
      return;
    }

    const payload: any = { name: name.trim(), email: email.trim() };
    if (password.trim()) payload.password = password.trim();

    const res = await onSave(payload);
    if (!res.success) {
      setError(res.error ?? 'Error al guardar el empleado');
    }
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/5 pb-4">
        <div>
          <h2 className="text-lg font-medium text-primary tracking-tight">
            {isEditing ? 'Editar empleado' : 'Nuevo empleado'}
          </h2>
          <p className="text-sm text-primary/45 mt-0.5">
            {isEditing ? 'Actualiza la información del miembro del equipo.' : 'Agrega un nuevo miembro al equipo.'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-primary hover:bg-primary/4 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer self-start"
        >
          <X size={18} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="max-w-md space-y-5">
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
            Nombre completo *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María González"
            className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-sm text-primary font-medium outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
            Correo electrónico *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="empleado@correo.com"
            className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-sm text-primary font-medium outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary/65 uppercase tracking-widest block">
            Contraseña {isEditing ? '(dejar vacío para no cambiar)' : '*'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isEditing ? 'Nueva contraseña (opcional)' : 'Mínimo 8 caracteres'}
            className="w-full bg-foreground-muted/40 border border-primary/8 focus:border-primary/20 rounded-xl px-3.5 py-2.5 text-sm text-primary font-medium outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button variant="secondary" onClick={onCancel} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : isEditing ? 'Guardar cambios' : 'Crear empleado'}
          </Button>
        </div>
      </form>
    </section>
  );
}
