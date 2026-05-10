'use client';

import React from 'react';
import { UserPlus, UserCheck, Trash2, User } from 'lucide-react';

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
  // If not debt and no customer, don't show the placeholder unless the user clicks something
  // But for better UX, if it's debt, it's REQUIRED.
  if (paymentMethod !== 'debt' && !selectedCustomer) return null;

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted">
          Cliente
        </label>
        {paymentMethod === 'debt' && (
          <span className="text-[8px] font-black uppercase tracking-widest text-red-400">Requerido</span>
        )}
      </div>
      
      {selectedCustomer ? (
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-contrast/5 border border-contrast/10 relative group hover:border-contrast/30 transition-all">
          <div className="w-9 h-9 rounded-xl bg-contrast flex items-center justify-center text-white shrink-0 shadow-lg shadow-contrast/20">
            <UserCheck size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-primary uppercase tracking-tight truncate">
              {selectedCustomer.name}
            </p>
            <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest mt-0.5">
              {selectedCustomer.phone || 'Sin teléfono'}
            </p>
          </div>
          <button 
            onClick={() => setShowCustomerSelector(true)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Cambiar Cliente"
          />
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedCustomerId(''); }}
            className="p-2 hover:bg-red-500/10 text-foreground-muted/40 hover:text-red-500 rounded-lg transition-all z-10"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowCustomerSelector(true)}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-foreground/10 hover:border-contrast/30 hover:bg-contrast/5 text-foreground-muted hover:text-contrast transition-all group"
        >
          <UserPlus size={18} className="opacity-40 group-hover:opacity-100" />
          <span className="text-[10px] font-black uppercase tracking-widest">Seleccionar Cliente</span>
        </button>
      )}
    </div>
  );
}
