import { Wallet, X, CreditCard, Check, Clock, Plus } from 'lucide-react';
import { useState } from 'react';

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
}: any) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <header className="bg-background rounded-[40px] w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-foreground/5 bg-foreground/1 flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
            <Wallet size={24} className="text-navy" />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary">Registrar Abono</h3>
            <p className="text-secondary text-xs font-medium truncate max-w-[200px]">Cliente: {customer.name}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors" aria-label="Cerrar">
          <X size={24} />
        </button>
      </header>

      <div className="p-8 space-y-6">
        <div className="p-6 rounded-3xl bg-red-50/50 border border-red-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">Deuda actual</p>
            <p className="text-2xl font-black text-red-600">${Number(customer.totalDebt).toLocaleString('es-ES')}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
            <CreditCard size={24} />
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Monto a abonar (COP)</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-navy">$</span>
              <input
                autoFocus
                type="number"
                required
                min="1"
                max={customer.totalDebt}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full pl-12 pr-6 py-5 rounded-[24px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-black text-2xl text-primary bg-foreground/2"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Nota o Referencia</label>
            <textarea
              rows={2}
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-sm text-primary bg-foreground/2 resize-none"
              placeholder="Ej. Transferencia Bancaria..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-secondary hover:bg-foreground/5 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving || !paymentAmount}
              className="flex-2 py-4 rounded-2xl bg-navy text-white font-black text-xs uppercase tracking-widest hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
            >
              {isSaving ? 'Procesando...' : <><Check size={16} /> Confirmar Abono</>}
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}

export function CustomerHistoryModal({ isOpen, onClose, customer, onRegisterPayment }: any) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] w-full max-w-lg shadow-2xl shadow-navy/20 border border-white/20 overflow-hidden scale-95 animate-in zoom-in-95 duration-300 flex flex-col max-h-[80vh]">
        <header className="p-8 border-b border-foreground/5 bg-foreground/1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center">
              <Clock size={24} className="text-navy" />
            </div>
            <div>
              <h3 className="text-xl font-black text-primary">Historial de Abonos</h3>
              <p className="text-secondary text-xs font-medium truncate max-w-[200px]">{customer.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-50 text-secondary hover:text-red-500 transition-colors" aria-label="Cerrar">
            <X size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {(!customer.payments || customer.payments.length === 0) ? (
            <div className="py-12 text-center space-y-4">
              <p className="text-secondary font-medium italic opacity-50">No hay abonos registrados para este cliente.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {customer.payments.map((p: any) => (
                <div key={p.paymentId} className="flex items-start gap-4 p-5 rounded-3xl bg-foreground/2 border border-foreground/5 hover:bg-white transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <Plus size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-black text-primary tracking-tight">Abono Recibido</p>
                      <p className="text-sm font-black text-green-600">+${Number(p.amount).toLocaleString('es-ES')}</p>
                    </div>
                    <p className="text-xs font-bold text-secondary flex items-center gap-1 uppercase tracking-widest">
                      <Clock size={10} /> {new Date(p.createdAt).toLocaleDateString('es-ES')} • {new Date(p.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {p.note && (
                      <div className="mt-3 p-3 rounded-xl bg-background border border-foreground/5 text-xs font-medium text-secondary leading-relaxed">
                        {p.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-foreground/5 bg-foreground/1">
          <button
            onClick={onRegisterPayment}
            className="w-full py-4 rounded-2xl bg-navy text-white font-black text-xs uppercase tracking-widest hover:bg-navy/90 transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2"
          >
            <CreditCard size={16} /> Nuevo Abono
          </button>
        </div>
      </div>
    </div>
  );
}
