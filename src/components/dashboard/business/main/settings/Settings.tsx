'use client';

import { useEffect, useState, useRef } from 'react';
import { Settings as SettingsIcon, Info } from 'lucide-react';
import { useBusinessSettings } from '@/hooks/admin/useBusinessSettings';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { Toaster, useToast } from '@/components/ui/Toast';
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
    const result = await updateTenant({ ...form, socialLinks });
    if (result.success) {
      showToast('success', 'Settings saved', 'Changes will be applied across your business.');
    } else {
      showToast('error', 'Error saving', result.error || 'Could not update settings.');
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadLogo(file);
    if (result.success) {
      showToast('success', 'Logo updated', 'Your brand image has been renewed.');
    } else {
      showToast('error', 'Upload error', result.error || 'Could not load image.');
    }
  };

  const copyLink = () => {
    const link = `koda.app/${form.slug}`;
    navigator.clipboard.writeText(link);
    showToast('success', 'Link copied', 'You can now share your catalog on social media.');
  };

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader 
        title="Business Settings" 
        subtitle="Manage the visual identity, contact details, and digital presence of your brand." 
      />

      {isLoading ? <Loader size="lg" className="h-[50vh]" /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-6 rounded-[32px] border border-red-100 flex items-center gap-3 animate-in fade-in duration-300">
           <Info size={24} /> {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
          <BrandIdentityForm
            logo={settings?.aboutUs?.logo}
            slug={form.slug}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            onLogoChange={handleLogoChange}
            onCopyLink={copyLink}
          />

          <div className="xl:col-span-2 space-y-10 h-full">
            <div className="bg-background border border-foreground/5 rounded-[40px] p-10 space-y-12 shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <SettingsIcon size={120} strokeWidth={1} />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-3xl font-black text-primary tracking-tight">Business Details</h3>
                <p className="text-secondary text-sm font-medium">Define how your customers see you in the digital world.</p>
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
