'use client';

import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
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
    <section className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          {isEditing ? 'Editar empleado' : 'Nuevo empleado'}
        </h2>
        <p className="text-gray-500 text-base mt-1 max-w-2xl">
          {isEditing
            ? 'Actualiza la información del miembro del equipo.'
            : 'Agrega un nuevo miembro al equipo para que pueda registrar ventas con acceso individual.'}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 border-t border-primary/10 pt-8"
        aria-label="Formulario de empleado"
      >
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
            {error}
          </div>
        )}

        {/* Nombre */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Nombre completo *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Nombre real del empleado tal como aparecerá en reportes y registros de ventas.
            </p>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María González"
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        {/* Email */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Correo electrónico *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Esta dirección se usará como credencial de inicio de sesión para el empleado.
            </p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="empleado@correo.com"
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        {/* Contraseña */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Contraseña {isEditing ? '(opcional)' : '*'}
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              {isEditing
                ? 'Déjala vacía si no deseas cambiar la contraseña actual.'
                : 'Mínimo 8 caracteres. El empleado podrá cambiarla después.'}
            </p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isEditing ? 'Nueva contraseña (opcional)' : 'Mínimo 8 caracteres'}
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>{isEditing ? 'Guardar cambios' : 'Crear empleado'}</>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
