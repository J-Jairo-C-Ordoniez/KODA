'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Customer, SaveCustomerDto } from '@/features/dashboard/business/api/customers.api';

interface CustomerFormProps {
  editingCustomer: Customer | null;
  onCancel: () => void;
  onSave: (data: SaveCustomerDto, customerId?: string) => Promise<any>;
  isSaving: boolean;
}

export default function CustomerForm({
  editingCustomer,
  onCancel,
  onSave,
  isSaving,
}: CustomerFormProps) {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      name: editingCustomer?.name || '',
      phone: editingCustomer?.phone || '',
    });
    setError(null);
  }, [editingCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }
    if (!formData.phone.trim()) {
      setError('El teléfono es requerido');
      return;
    }

    const res = await onSave(
      { name: formData.name.trim(), phone: formData.phone.trim() },
      editingCustomer?.customerId
    );
    if (!res.success) {
      setError(res.error || 'Error al guardar el cliente');
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          {editingCustomer ? 'Editar cliente' : 'Registrar cliente'}
        </h2>
        <p className="text-gray-500 text-base mt-1 max-w-2xl">
          {editingCustomer
            ? 'Actualiza los datos de contacto del cliente.'
            : 'Registra a un cliente de confianza para llevar control de sus compras y deudas.'}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 border-t border-primary/10 pt-8">
        {error && (
          <div className="rounded-lg border border-accent-red/20 bg-accent-red/5 p-3.5 text-sm font-medium text-accent-red">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Nombre completo *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Usa el nombre con el que lo identifica habitualmente en el negocio.
            </p>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/55">
              Teléfono / WhatsApp *
            </label>
            <p className="mt-2 text-sm leading-relaxed text-primary/50">
              Este número se usará para enviar recordatorios de cobro y recibos de abono directamente por WhatsApp.
            </p>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ej: 3001234567"
            className="w-full border-b border-primary/15 bg-transparent py-3 text-base font-medium text-primary outline-none transition-all placeholder:text-primary/25 focus:border-accent"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-primary/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-foreground-muted/40 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-secondary disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} /> {isSaving ? 'Guardando...' : editingCustomer ? 'Guardar cambios' : 'Registrar cliente'}
          </button>
        </div>
      </form>
    </section>
  );
}
