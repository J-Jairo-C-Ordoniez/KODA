'use client';

import { useEffect, useState } from 'react';
import { SpinnerGapIcon } from '@phosphor-icons/react';
import { Customer, SaveCustomerDto } from '@/features/dashboard/business/api/customers.api';
import Button from '@/shared/components/Button';

interface CustomerFormProps {
  editingCustomer: Customer | null;
  onCancel: () => void;
  onSave: (data: SaveCustomerDto, customerId?: string) => Promise<any>;
  isSaving: boolean;
}

export default function CustomerForm({ editingCustomer, onCancel, onSave, isSaving }: CustomerFormProps) {
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
    <section className="w-full space-y-5 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-primary">
          {editingCustomer ? 'Editar cliente' : 'Registrar cliente'}
        </h2>
        <p className="max-w-3xl text-base font-normal leading-relaxed text-foreground/75 sm:text-lg md:text-xl">
          {editingCustomer
            ? 'Actualiza los datos de contacto del cliente.'
            : 'Registra a un cliente de confianza para llevar control de sus compras y deudas.'}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 border-t border-primary/10 pt-8">
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div>
            <label className="block text-base font-medium leading-relaxed text-foreground/75 sm:text-lg">
              Nombre completo *
            </label>
            <p className="mt-1 text-sm font-normal leading-relaxed text-foreground/75 sm:text-base">
              Usa el nombre con el que lo identifica habitualmente en el negocio.
            </p>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div>
            <label className="block text-base font-medium leading-relaxed text-foreground/75 sm:text-lg">
              Teléfono / WhatsApp *
            </label>
            <p className="mt-1 text-sm font-normal leading-relaxed text-foreground/75 sm:text-base">
              Este número se usará para enviar recordatorios de cobro y recibos de abono directamente por WhatsApp.
            </p>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ej: 3001234567"
            className="w-full rounded-2xl border border-primary/10 bg-background px-4 py-3.5 text-sm font-medium leading-relaxed text-primary outline-none transition-all placeholder:text-foreground/35 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 sm:text-base"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            disabled={isSaving}
            type='submit'
          >
            {isSaving ? (
              <>
                <SpinnerGapIcon size={16} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                {editingCustomer ? 'Guardar cambios' : 'Guardar cliente'}
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
