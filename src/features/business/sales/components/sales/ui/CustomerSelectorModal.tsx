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
    <div className="absolute inset-0 z-100 bg-background flex flex-col animate-in slide-in-from-bottom-10 duration-500 rounded-[32px] overflow-hidden shadow-2xl border border-foreground/10">
      <header className="p-6 border-b border-foreground/5 flex items-center justify-between bg-background-elevated">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast shadow-inner">
            <UserCheck size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-primary tracking-tight">Seleccionar Cliente</h3>
            <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Busca o registra un cliente</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center hover:bg-red-500/10 text-foreground-muted hover:text-red-500 rounded-xl transition-all active:scale-90"
          aria-label="Cerrar selector"
        >
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col bg-background">
        {!isRegistering ? (
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors" size={18} />
              <input
                autoFocus
                type="text"
                placeholder="Nombre o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-foreground-muted/40"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredCustomers.length === 0 && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto text-foreground-muted/20">
                    <User size={32} />
                  </div>
                  <p className="text-xs font-bold text-foreground-muted uppercase tracking-widest">No se encontraron clientes</p>
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="px-8 py-3 bg-contrast text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-contrast-hover transition-all shadow-lg shadow-contrast/20 active:scale-95"
                  >
                    Registrar Nuevo
                  </button>
                </div>
              )}

              {filteredCustomers.map((c) => (
                <button
                  key={c.customerId}
                  onClick={() => onSelect(c.customerId)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 bg-background-elevated hover:border-contrast/30 hover:bg-contrast/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-foreground-muted shrink-0 group-hover:bg-contrast group-hover:text-white transition-all shadow-sm">
                    <User size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-black text-primary uppercase tracking-tight group-hover:text-contrast transition-colors">{c.name}</p>
                    <p className="text-[10px] font-bold text-foreground-muted flex items-center gap-1 mt-0.5">
                      <Phone size={10} /> {c.phone}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-contrast opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-foreground/5">
              <button
                onClick={() => setIsRegistering(true)}
                className="w-full py-4 bg-contrast text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-contrast/20 hover:bg-contrast-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={18} /> Registrar Nuevo Cliente
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-8 space-y-8 animate-in slide-in-from-right-10 duration-500 overflow-y-auto">
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-primary tracking-tight">Nuevo Cliente</h4>
              <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest">Ingresa los datos para el registro</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted ml-1">Nombre Completo</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors" size={18} />
                  <input
                    autoFocus
                    placeholder="Ej. Juan Pérez"
                    value={newCustomer.name}
                    onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-foreground-muted/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted ml-1">Teléfono</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-contrast transition-colors" size={18} />
                  <input
                    placeholder="Ej. 300 123 4567"
                    value={newCustomer.phone}
                    onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-background-elevated border border-foreground/10 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-foreground-muted/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setIsRegistering(false)}
                className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-foreground/10"
              >
                Volver a la lista
              </button>
              <button
                onClick={handleCreate}
                disabled={isCreating || !newCustomer.name || !newCustomer.phone}
                className="flex-1 py-4 bg-contrast text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-contrast/20 hover:bg-contrast-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCreating ? 'Guardando...' : <><Check size={16} /> Guardar</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
