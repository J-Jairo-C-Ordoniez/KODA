'use client';

import { useEffect, useState, useRef } from 'react';
import { Settings as SettingsIcon, Info } from 'lucide-react';
import { useBusinessSettings } from '@/features/business/settings/hooks/useBusinessSettings';
import { SectionHeader } from '@/features/business/dashboard/components/Summary/Main/ui/SectionHeader';
import Loader from '@/shared/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { Toaster, useToast } from '@/shared/components/ui/Toast';
import { BrandIdentityForm } from './ui/BrandIdentityForm';
import { GeneralSettingsForm } from './ui/GeneralSettingsForm';

export default function BusinessSettings() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId;
  const { settings, isLoading, isSaving, isUploading, error, fetchSettings, updateTenant, uploadLogo } = useBusinessSettings(tenantId);
  const { toasts, showToast, removeToast } = useToast();

  const [form, setForm] = useState({ businessName: '', description: '', whatsApp: '', type: 'ropa', slug: '' });
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', twitter: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  useEffect(() => {
    if (settings?.tenant) {
      setForm({
        businessName: settings.tenant.businessName || '',
        description: settings.tenant.description || '',
        whatsApp: settings.tenant.whatsApp || '',
        type: settings.tenant.type || 'ropa',
        slug: settings.tenant.slug || '',
      });
      if (settings.aboutUs?.socialLinks) {
        setSocialLinks(settings.aboutUs.socialLinks);
      }
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateTenant({ ...form });
    if (result.success) {
      showToast('success', 'Configuración guardada', 'Los cambios se aplicarán en todo tu negocio.');
    } else {
      showToast('error', 'Error al guardar', result.error || 'No se pudo actualizar la configuración.');
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadLogo(file);
    if (result.success) {
      showToast('success', 'Logo actualizado', 'Tu imagen de marca ha sido renovada.');
    } else {
      showToast('error', 'Error de subida', result.error || 'No se pudo cargar la imagen.');
    }
  };

  return (
    <main className="space-y-10 bg-background w-full min-h-full pt-8 px-4 sm:px-6 lg:px-10 pb-24 relative">
      <Toaster toasts={toasts} removeToast={removeToast} />

      <SectionHeader
        title="Mi Negocio"
        subtitle="Personaliza la identidad visual y los detalles operativos de tu marca."
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <Loader size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[32px] flex items-center gap-4">
          <Info className="text-red-400 shrink-0" size={24} />
          <p role="alert" className="text-red-400 text-sm font-bold uppercase tracking-tight">
            {error}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Brand Identity */}
          <div className="lg:col-span-4 xl:col-span-3">
            <BrandIdentityForm
              logo={settings?.aboutUs?.logo}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
              onLogoChange={handleLogoChange}
            />
          </div>

          {/* Right Column: General Settings */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-background-elevated/50 lg:bg-background-elevated border border-white/5 lg:border-white/10 rounded-[40px] p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-black/10">
              <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none">
                <SettingsIcon size={300} strokeWidth={1} />
              </div>

              <div className="relative z-10 space-y-4 mb-12">
                <h3 className="text-3xl font-black text-primary tracking-tight">Detalles Operativos</h3>
                <p className="text-foreground-muted text-sm font-medium opacity-60">Define la información principal de tu comercio para el público.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <GeneralSettingsForm
                  form={form}
                  setForm={setForm}
                  socialLinks={socialLinks}
                  setSocialLinks={setSocialLinks}
                  isSaving={isSaving}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
