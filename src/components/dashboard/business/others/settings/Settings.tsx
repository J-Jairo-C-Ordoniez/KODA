'use client';

import { useEffect, useState, useRef } from 'react';
import { Settings, Upload, CheckCircle } from 'lucide-react';
import { useBusinessSettings } from '@/hooks/admin/useBusinessSettings';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function BusinessSettings() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { settings, isLoading, isSaving, isUploading, error, fetchSettings, updateTenant, uploadLogo } = useBusinessSettings(tenantId);

  const [form, setForm] = useState({ businessName: '', description: '', whatsApp: '', type: 'ropa' });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  useEffect(() => {
    if (settings?.tenant) {
      setForm({
        businessName: settings.tenant.businessName || '',
        description: settings.tenant.description || '',
        whatsApp: settings.tenant.whatsApp || '',
        type: settings.tenant.type || 'ropa',
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateTenant(form);
    setFeedback(result.success ? { type: 'success', msg: 'Configuración guardada correctamente' } : { type: 'error', msg: result.error || 'Error al guardar' });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadLogo(file);
    setFeedback(result.success ? { type: 'success', msg: 'Logo actualizado correctamente' } : { type: 'error', msg: result.error || 'Error al subir logo' });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-8">
      <SectionHeader title="Mi Negocio" subtitle="Configura la información pública de tu tienda." />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Upload */}
          <div className="bg-background border border-foreground/5 rounded-3xl p-8 space-y-6">
            <h3 className="text-base font-black text-primary">Logo del Negocio</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-foreground/10 flex items-center justify-center bg-foreground/[0.02] overflow-hidden relative group">
                {settings?.aboutUs?.logo ? (
                  <Image src={settings.aboutUs.logo} alt="Logo" fill className="object-cover" />
                ) : (
                  <Upload size={28} className="text-secondary" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-3 rounded-2xl bg-navy/5 text-navy font-bold text-sm hover:bg-navy hover:text-white transition-all disabled:opacity-50"
              >
                {isUploading ? 'Subiendo...' : 'Cambiar Logo'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              <p className="text-secondary text-xs text-center font-medium">PNG o JPG, máximo 2MB. Se optimiza automáticamente.</p>
            </div>
          </div>

          {/* Business Info */}
          <div className="lg:col-span-2 bg-background border border-foreground/5 rounded-3xl p-8 space-y-6">
            <h3 className="text-base font-black text-primary">Información del Negocio</h3>

            {feedback && (
              <div className={`px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 ${
                feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
              }`}>
                {feedback.type === 'success' && <CheckCircle size={16} />}
                {feedback.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-secondary mb-2 block">Nombre del Negocio</label>
                  <input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-secondary mb-2 block">WhatsApp</label>
                  <input value={form.whatsApp} onChange={(e) => setForm({ ...form, whatsApp: e.target.value })} className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all font-medium" placeholder="3001234567" />
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-secondary mb-2 block">Tipo de Negocio</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all font-medium bg-background">
                  <option value="ropa">Ropa y Moda</option>
                  <option value="calzado">Calzado</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="boutique">Boutique</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-secondary mb-2 block">Descripción</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all font-medium resize-none" placeholder="Una descripción corta de tu negocio..." />
              </div>
              <div className="pt-2 border-t border-foreground/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-secondary">Slug del Negocio</span>
                  <span className="text-sm font-bold text-navy bg-navy/5 px-3 py-1 rounded-full">{settings?.tenant?.slug}</span>
                  <span className="text-xs text-secondary font-medium">(no editable)</span>
                </div>
              </div>
              <button type="submit" disabled={isSaving} className="w-full py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all">
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
