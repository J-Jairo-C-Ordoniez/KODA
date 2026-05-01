import { Users, Phone, Clock, CreditCard } from 'lucide-react';

interface CustomerCardProps {
  customer: any;
  onViewHistory: (customer: any) => void;
  onRegisterPayment: (customer: any) => void;
}

export function CustomerCard({ customer, onViewHistory, onRegisterPayment }: CustomerCardProps) {
  return (
    <article 
      onClick={() => onViewHistory(customer)}
      className="bg-background border border-foreground/5 rounded-[28px] p-5 space-y-4 hover:shadow-xl hover:shadow-navy/5 hover:border-navy/10 transition-all group relative overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/3 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
          <Users size={18} className="text-navy group-hover:text-white" />
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-black uppercase tracking-widest text-red-400 mb-0.5">Deuda Pendiente</span>
          <span className="text-sm font-black text-red-600">
            ${Number(customer.totalDebt).toLocaleString('es-ES')}
          </span>
        </div>
      </div>

      <div className="space-y-0.5 relative z-10">
        <h3 className="text-sm font-black text-primary group-hover:text-navy transition-colors truncate uppercase tracking-tight">{customer.name}</h3>
        <div className="flex items-center gap-1.5 text-secondary text-xs font-bold">
          <Phone size={12} className="text-navy/40" />
          {customer.phone}
        </div>
      </div>

      <div className="pt-4 border-t border-foreground/5 flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between text-[10px] text-secondary font-black uppercase tracking-widest opacity-60">
          <span className="flex items-center gap-1"><Clock size={10} /> {new Date(customer.updatedAt).toLocaleDateString('es-ES')}</span>
          <span>Ver historial</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onRegisterPayment(customer); }}
          className="w-full py-3 rounded-xl bg-navy text-white font-black text-xs uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10"
        >
          <CreditCard size={14} />
          Registrar Abono
        </button>
      </div>
    </article>
  );
}
