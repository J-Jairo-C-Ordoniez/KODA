'use client';

import { useSession, signOut } from 'next-auth/react';
import EmployeeHeader from '@/features/dashboard/employee/components/header/Header';
import { User, LogOut, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import Button from '@/shared/components/Button';

export default function ProfileView() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="w-full p-6 md:p-10 space-y-8 max-w-4xl">
      <EmployeeHeader
        title="Mi Turno Operativo"
        subtitle="Información de perfil de empleado en turno y gestión de sesión."
      />

      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary text-background flex items-center justify-center font-bold text-2xl shadow-lg">
            {user?.name?.[0]?.toUpperCase() || 'E'}
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              {user?.name || 'Empleado'}
            </h2>
            <p className="text-sm font-medium text-primary/60">
              {user?.email || 'Sin correo asociado'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 size={12} />
                Turno Activo
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-primary/10">
          <div className="p-4 rounded-2xl bg-background border border-primary/5 space-y-1">
            <span className="text-xs text-primary/40 font-medium block">Rol de Usuario</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <ShieldCheck size={16} className="text-primary/60" />
              <span>Operador / Empleado</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-background border border-primary/5 space-y-1">
            <span className="text-xs text-primary/40 font-medium block">Estado de la Sesión</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Clock size={16} className="text-primary/60" />
              <span>Conectado en turno</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-primary/10 flex justify-end">
          <Button
            variant="secondary"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="gap-2 text-red-600 border-red-500/20 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            <span>Cerrar Turno / Salir</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
