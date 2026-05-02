import React from 'react';
import { UserPlus, UserCheck, Trash2 } from 'lucide-react';

interface CustomerSectionProps {
  paymentMethod: string;
  selectedCustomer: any;
  setShowCustomerSelector: (show: boolean) => void;
  setSelectedCustomerId: (id: string) => void;
}

export default function CustomerSection({ 
  paymentMethod, 
  selectedCustomer, 
  setShowCustomerSelector, 
  setSelectedCustomerId 
}: CustomerSectionProps) {
  if (paymentMethod !== 'debt' && !selectedCustomer) return null;

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">
        Cliente
      </label>
      
      {selectedCustomer ? (
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-navy/5 border border-navy/10 relative group">
          <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center text-white shrink-0">
            <UserCheck size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-primary uppercase tracking-tight truncate">
              {selectedCustomer.name}
            </p>
            <p className="text-[9px] font-bold text-secondary uppercase tracking-widest opacity-60">
              {selectedCustomer.phone}
            </p>
          </div>
          <button 
            onClick={() => setShowCustomerSelector(true)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Cambiar Cliente"
          />
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedCustomerId(''); }}
            className="p-2 hover:bg-red-50 text-secondary/40 hover:text-red-500 rounded-lg transition-all z-10"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowCustomerSelector(true)}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-foreground/10 hover:border-navy/30 hover:bg-navy/5 text-secondary hover:text-navy transition-all group"
        >
          <UserPlus size={16} className="opacity-40 group-hover:opacity-100" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Seleccionar Cliente</span>
        </button>
      )}
    </div>
  );
}
