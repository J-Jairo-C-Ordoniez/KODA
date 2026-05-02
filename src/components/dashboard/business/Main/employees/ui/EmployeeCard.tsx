import { Users, MoreVertical, Edit3, Trash2, Mail, Calendar, ShoppingCart, ChevronRight } from 'lucide-react';
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
    <article className="bg-background border border-foreground/5 rounded-[28px] p-5 space-y-4 hover:shadow-xl hover:shadow-navy/5 hover:border-navy/10 transition-all group relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-navy/3 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />

      <div className={`flex items-center justify-between relative ${activeMenuId === emp.userId ? 'z-30' : 'z-10'}`}>
        <div className="w-11 h-11 rounded-xl bg-navy/10 flex items-center justify-center group-hover:bg-navy transition-colors">
          <Users size={20} className="text-navy group-hover:text-white transition-colors" />
        </div>

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
                onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); onEdit(emp); }}
                className="w-full px-4 py-4 flex items-center gap-3 text-sm font-black text-primary hover:bg-navy/5 hover:text-navy rounded-2xl transition-all group/item"
              >
                <div className="w-8 h-8 rounded-xl bg-navy/5 flex items-center justify-center group-hover/item:bg-navy group-hover/item:text-white transition-colors">
                  <Edit3 size={16} />
                </div>
                Editar
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); onDelete(emp); }}
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

      <div className="space-y-0.5 relative z-10">
        <h3 className="text-sm font-black text-primary group-hover:text-navy transition-colors truncate uppercase tracking-tight">{emp.name}</h3>
        <div className="flex items-center gap-1.5 text-secondary text-xs font-bold">
          <Mail size={11} className="text-navy/40" />
          <span className="truncate">{emp.email}</span>
        </div>
        <div className="flex items-center gap-1.5 text-secondary text-xs font-bold">
          <Calendar size={11} className="text-navy/40" />
          Desde {new Date(emp.createdAt).toLocaleDateString('es-ES')}
        </div>
      </div>

      <div className="pt-3 border-t border-foreground/5 grid grid-cols-2 gap-3 relative z-10">
        <div className="bg-foreground/3 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Ventas</p>
          <p className="text-lg font-black text-primary">{emp._count?.sales ?? 0}</p>
        </div>
        <div className="bg-foreground/3 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Total</p>
          <p className="text-sm font-black text-green-600">${totalSalesAmount(emp).toLocaleString('es-ES')}</p>
        </div>
      </div>

      <button
        onClick={() => onViewSales(emp)}
        className="w-full py-3 rounded-xl bg-foreground/5 text-primary font-black text-xs uppercase tracking-widest hover:bg-navy hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative z-10"
      >
        <ShoppingCart size={13} />
        Ver Historial
        <ChevronRight size={13} />
      </button>
    </article>
  );
}
