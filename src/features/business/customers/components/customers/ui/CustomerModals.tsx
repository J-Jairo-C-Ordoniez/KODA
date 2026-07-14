'use client';

import React from 'react';
import { X, Wallet, Check, History, Calendar, CreditCard, User, Info } from 'lucide-react';
import Modal from '../../categories/ui/Modal';
import Loader from '@/shared/components/ui/Loader';

interface CustomerPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
  paymentAmount: string;
  setPaymentAmount: (val: string) => void;
  paymentNote: string;
  setPaymentNote: (val: string) => void;
}

export function CustomerPaymentModal({
  isOpen,
  onClose,
  customer,
  onSubmit,
  isSaving,
  paymentAmount,
  setPaymentAmount,
  paymentNote,
  setPaymentNote
}: CustomerPaymentModalProps) {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Abono"
      size="lg"
    >
      <form onSubmit={onSubmit} className="space-y-8 px-1 py-2">
        <div className="bg-background-elevated/40 p-6 rounded-[32px] border border-white/5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-contrast/10 flex items-center justify-center text-contrast shrink-0">
              <User size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted opacity-60">Cliente</p>
              <h4 className="text-xl font-black text-primary tracking-tight truncate">{customer.name}</h4>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted opacity-60">Deuda Actual</p>
            <p className="text-2xl font-black text-red-400 tracking-tight">${Number(customer.totalDebt).toLocaleString('es-ES')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted ml-1">Monto del Abono</label>
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-contrast group-focus-within:scale-110 transition-transform">$</span>
              <input 
                autoFocus
                type="number" 
                placeholder="0.00" 
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full pl-14 pr-6 py-6 rounded-[32px] bg-background-elevated border border-white/10 focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-black text-3xl text-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-foreground-muted ml-1">Nota u Observación</label>
            <textarea 
              placeholder="Escribe un detalle opcional..." 
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              rows={3}
              className="w-full px-6 py-4 rounded-[24px] bg-background-elevated border border-white/10 focus:border-contrast/30 outline-none transition-all font-bold text-sm text-primary resize-none placeholder:text-foreground-muted/30"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button"
            onClick={onClose} 
            className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 rounded-2xl transition-all"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={isSaving || !paymentAmount}
            className="flex-[1.5] py-4 bg-contrast text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-contrast/20 hover:bg-contrast-hover transition-all active:scale-95 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader size="xs" color="border-white" /> : <><Check size={18} /> Confirmar Abono</>}
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface CustomerHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  onRegisterPayment: () => void;
}

export function CustomerHistoryModal({
  isOpen,
  onClose,
  customer,
  onRegisterPayment
}: CustomerHistoryModalProps) {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Historial de Pagos"
      size="xl"
    >
      <div className="space-y-8 px-1 py-2">
        <div className="bg-background-elevated/40 border border-white/5 rounded-[40px] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-contrast/10 flex items-center justify-center text-contrast shrink-0">
              <History size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted opacity-60">Historial de</p>
              <h4 className="text-xl font-black text-primary tracking-tight truncate">{customer.name}</h4>
            </div>
          </div>
          <button 
            onClick={onRegisterPayment}
            className="w-full sm:w-auto px-8 py-4 bg-contrast text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-contrast/20 hover:bg-contrast-hover transition-all active:scale-95"
          >
            Nuevo Abono
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1 h-4 bg-contrast rounded-full" />
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Últimas Transacciones</h5>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {customer.payments?.length === 0 ? (
              <div className="py-20 text-center opacity-10 space-y-4">
                <Calendar size={60} className="mx-auto" />
                <p className="text-xs font-black uppercase tracking-widest">Sin pagos registrados</p>
              </div>
            ) : (
              customer.payments?.map((payment: any) => (
                <div key={payment.paymentId} className="flex items-center justify-between p-5 bg-background-elevated/50 border border-white/5 rounded-[24px] group hover:border-contrast/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-background-elevated flex items-center justify-center text-success border border-white/5 group-hover:bg-success/10 transition-colors">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-primary tracking-tight">Abono Recibido</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest opacity-60">
                          {new Date(payment.createdAt).toLocaleDateString('es-ES')}
                        </p>
                        <span className="w-1 h-1 rounded-full bg-foreground/20" />
                        <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest opacity-60">
                          {new Date(payment.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-success">+${Number(payment.amount).toLocaleString('es-ES')}</p>
                    {payment.note && (
                      <div className="flex items-center justify-end gap-1.5 mt-1 opacity-60">
                        <Info size={10} className="text-foreground-muted" />
                        <p className="text-[10px] font-medium text-foreground-muted max-w-[150px] truncate">{payment.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/5 flex justify-center">
          <button 
            onClick={onClose}
            className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-foreground-muted hover:bg-foreground/5 rounded-2xl transition-all"
          >
            Cerrar Historial
          </button>
        </div>
      </div>
    </Modal>
  );
}
