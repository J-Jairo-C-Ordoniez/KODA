'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, UserPlus, Save } from 'lucide-react';
import { Customer, SaveCustomerDto } from '@/features/dashboard/business/api/customers.api';

interface CustomerFormModalProps {
  isOpen: boolean;
  editingCustomer: Customer | null;
  onClose: () => void;
  onSave: (data: SaveCustomerDto, customerId?: string) => Promise<any>;
  isSaving: boolean;
}

export default function CustomerFormModal({
  isOpen,
  editingCustomer,
  onClose,
  onSave,
  isSaving,
}: CustomerFormModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name || '');
      setPhone(editingCustomer.phone || '');
    } else {
      setName('');
      setPhone('');
    }
    setError(null);
  }, [editingCustomer, isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError('El nombre es requerido');
    if (!phone.trim()) return setError('El teléfono es requerido');

    const res = await onSave(
      { name: name.trim(), phone: phone.trim() },
      editingCustomer?.customerId
    );

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Error al guardar el cliente');
    }
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="bg-background border border-primary/10 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-primary/5 bg-background-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-background flex items-center justify-center font-bold">
                <UserPlus size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary tracking-tight">
                  {editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}
                </h3>
                <p className="text-xs font-medium text-primary/55">
                  {editingCustomer ? editingCustomer.name : 'Registra un cliente de confianza'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary/40 hover:text-primary hover:bg-foreground-muted/40 rounded-xl transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            {/* Nombre */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/65 block mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-4 py-3 text-xs text-primary font-medium outline-none transition-all"
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/65 block mb-1">
                Teléfono / WhatsApp *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 3001234567"
                className="w-full bg-foreground-muted/40 hover:bg-foreground-muted/60 focus:bg-background border border-primary/8 focus:border-primary/20 rounded-xl px-4 py-3 text-xs text-primary font-medium outline-none transition-all"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-primary/5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-primary cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 py-2.5 px-5 bg-primary hover:bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Save size={14} /> {isSaving ? 'Guardando...' : editingCustomer ? 'Actualizar' : 'Crear Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
