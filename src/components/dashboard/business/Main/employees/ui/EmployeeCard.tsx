'use client';

import { Users, MoreVertical, Edit3, Trash2, Mail, Calendar, ShoppingCart, ChevronRight, User } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface EmployeeCardProps {
  emp: any;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onEdit: (emp: any) => void;
  onDelete: (emp: any) => void;
  onViewSales: (emp: any) => void;
  totalSalesAmount: (emp: any) => number;
}

export function EmployeeCard({ emp, activeMenuId, setActiveMenuId, onEdit, onDelete, onViewSales, totalSalesAmount }: EmployeeCardProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId === emp.userId) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [activeMenuId, emp.userId, setActiveMenuId]);

  return (
    <article className="group bg-background-elevated/40 border border-white/5 rounded-[40px] p-7 transition-all duration-500 hover:border-contrast/20 hover:bg-background-elevated/60 relative overflow-hidden flex flex-col h-full shadow-xl shadow-black/5">
      
      <div className="flex items-start justify-between relative z-10 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-contrast/10 flex items-center justify-center text-contrast shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/5">
            <User size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-black text-primary tracking-tight truncate uppercase leading-tight">
              {emp.name}
            </h3>
            <div className="flex items-center gap-1.5 text-foreground-muted mt-1 opacity-60">
              <Mail size={10} />
              <p className="text-[10px] font-bold truncate tracking-tight">{emp.email}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === emp.userId ? null : emp.userId); }}
            className={`p-2 rounded-xl transition-all ${activeMenuId === emp.userId ? 'bg-contrast text-white shadow-lg shadow-contrast/20' : 'hover:bg-foreground/5 text-foreground-muted'}`}
          >
            <MoreVertical size={18} />
          </button>

          {activeMenuId === emp.userId && (
            <div ref={menuRef} className="absolute right-0 mt-3 w-48 bg-background border border-white/10 rounded-[28px] shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); onEdit(emp); }}
                className="w-full px-4 py-3.5 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-foreground/5 rounded-2xl transition-all"
              >
                <Edit3 size={14} className="text-contrast" />
                Editar Perfil
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); onDelete(emp); }}
                className="w-full px-4 py-3.5 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/5 rounded-2xl transition-all"
              >
                <Trash2 size={14} />
                Desvincular
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-background/40 border border-white/5 rounded-[24px] p-4 text-center group-hover:bg-background/60 transition-colors">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground-muted opacity-40 mb-1">Ventas</p>
          <p className="text-xl font-black text-primary tracking-tighter">{emp._count?.sales ?? 0}</p>
        </div>
        <div className="bg-background/40 border border-white/5 rounded-[24px] p-4 text-center group-hover:bg-background/60 transition-colors">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground-muted opacity-40 mb-1">Total</p>
          <p className="text-xl font-black text-contrast tracking-tighter">${totalSalesAmount(emp).toLocaleString('es-ES')}</p>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-center gap-1.5 opacity-40">
          <Calendar size={10} className="text-foreground-muted" />
          <p className="text-[8px] font-black uppercase tracking-widest text-foreground-muted">Desde {new Date(emp.createdAt).toLocaleDateString('es-ES')}</p>
        </div>
        
        <button
          onClick={() => onViewSales(emp)}
          className="w-full py-4 rounded-2xl bg-foreground/5 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-contrast hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-2xl group-hover:shadow-contrast/20 active:scale-95"
        >
          <ShoppingCart size={13} />
          Ver Historial
          <ChevronRight size={13} className="opacity-40" />
        </button>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-6 -left-6 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 pointer-events-none">
        <Users size={120} className="text-contrast" />
      </div>
    </article>
  );
}
