'use client';

import React, { useState, useMemo } from 'react';
import { Search, UserPlus, User, Phone, Check, X, ArrowRight, UserCheck } from 'lucide-react';

interface CustomerSelectorModalProps {
  customers: any[];
  onSelect: (customerId: string) => void;
  onCreateCustomer: (data: { name: string, phone: string }) => Promise<void>;
  onClose: () => void;
  isCreating: boolean;
}

export default function CustomerSelectorModal({ customers, onSelect, onCreateCustomer, onClose, isCreating }: CustomerSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });

  const filteredCustomers = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(search) || 
      c.phone.includes(search)
    );
  }, [customers, searchTerm]);

  const handleCreate = async () => {
    if (!newCustomer.name || !newCustomer.phone) return;
    await onCreateCustomer(newCustomer);
  };

  return (
    <div className="absolute inset-0 z-60 bg-background flex flex-col animate-in slide-in-from-bottom-10 duration-500 rounded-[32px] overflow-hidden shadow-2xl">
      <header className="p-8 border-b border-foreground/5 flex items-center justify-between bg-navy/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center text-navy shadow-inner">
            <UserCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary tracking-tight">Seleccionar Cliente</h3>
            <p className="text-xs font-medium text-secondary">Busca o registra un cliente para la deuda</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-3 hover:bg-navy/10 text-secondary hover:text-navy rounded-2xl transition-all active:scale-90"
          aria-label="Cerrar selector"
        >
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col">
        {!isRegistering ? (
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-navy transition-colors" size={20} />
              <input 
                autoFocus
                type="text" 
                placeholder="Buscar por nombre o teléfono..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-8 py-5 rounded-[24px] bg-foreground/3 border-2 border-transparent focus:bg-background focus:border-navy/20 focus:ring-8 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-secondary/40"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredCustomers.length === 0 && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-foreground/5 rounded-[24px] flex items-center justify-center mx-auto text-secondary/20">
                    <User size={32} />
                  </div>
                  <p className="text-sm font-medium text-secondary/60">No se encontraron clientes</p>
                  <button 
                    onClick={() => setIsRegistering(true)}
                    className="px-8 py-3 bg-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-navy/90 transition-all shadow-lg shadow-navy/20 active:scale-95"
                  >
                    Registrar Nuevo
                  </button>
                </div>
              )}

              {filteredCustomers.map((c) => (
                <button 
                  key={c.customerId}
                  onClick={() => onSelect(c.customerId)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 bg-background hover:border-navy/30 hover:bg-navy/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy shrink-0 group-hover:bg-navy group-hover:text-white transition-all">
                    <User size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-black text-primary uppercase tracking-tight">{c.name}</p>
                    <p className="text-[10px] font-bold text-secondary flex items-center gap-1">
                      <Phone size={10} /> {c.phone}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-navy opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                </button>
              ))}
            </div>

             <div className="pt-4 border-t border-foreground/5">
               <button 
                onClick={() => setIsRegistering(true)}
                className="w-full py-5 bg-navy text-white text-xs font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-navy/20 hover:bg-navy/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
               >
                 <UserPlus size={18} /> Registrar Nuevo Cliente
               </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-10 space-y-10 animate-in slide-in-from-right-10 duration-500">
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-primary tracking-tight">Nuevo Cliente</h4>
              <p className="text-sm font-medium text-secondary">Ingresa los datos para registrar la deuda</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Nombre Completo</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-navy transition-colors" size={20} />
                  <input 
                    autoFocus
                    placeholder="Ej. Juan Pérez" 
                    value={newCustomer.name}
                    onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full pl-14 pr-8 py-5 rounded-[24px] bg-foreground/3 border-2 border-transparent focus:bg-background focus:border-navy/20 focus:ring-8 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-secondary/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Teléfono</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-navy transition-colors" size={20} />
                  <input 
                    placeholder="Ej. 300 123 4567" 
                    value={newCustomer.phone}
                    onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="w-full pl-14 pr-8 py-5 rounded-[24px] bg-foreground/3 border-2 border-transparent focus:bg-background focus:border-navy/20 focus:ring-8 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-secondary/40"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setIsRegistering(false)}
                className="flex-1 py-5 text-xs font-black uppercase tracking-widest text-secondary hover:bg-foreground/5 rounded-3xl transition-all active:scale-95"
              >
                Volver a la lista
              </button>
              <button 
                onClick={handleCreate}
                disabled={isCreating || !newCustomer.name || !newCustomer.phone}
                className="flex-1 py-5 bg-navy text-white text-xs font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-navy/20 hover:bg-navy/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCreating ? 'Guardando...' : <><Check size={18} /> Guardar y Seleccionar</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
