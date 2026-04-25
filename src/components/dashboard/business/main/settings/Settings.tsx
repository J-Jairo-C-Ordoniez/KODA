'use client';

import { useEffect, useState, useRef } from 'react';
import { Settings, Upload, CheckCircle, Smartphone, Globe, Instagram, Facebook, Twitter, Mail, Info } from 'lucide-react';
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
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', twitter: '' });
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
      if (settings.aboutUs?.socialLinks) {
        setSocialLinks(settings.aboutUs.socialLinks);
      }
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateTenant({ ...form, socialLinks });
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
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20">
      <SectionHeader title="Configuración del Negocio" subtitle="Gestiona la identidad visual y datos públicos de tu marca." />

      {isLoading ? <Loader /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
          {/* Sidebar: Logo and Social Preview */}
          <div className="space-y-10">
            <div className="bg-background border border-foreground/5 rounded-[40px] p-10 space-y-8 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-primary">Identidad de Marca</h3>
                <p className="text-secondary text-xs font-medium">El logo aparecerá en facturas y el catálogo público.</p>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-40 h-40 rounded-[48px] border-2 border-dashed border-navy/20 flex items-center justify-center bg-navy/5 overflow-hidden transition-all group-hover:border-navy group-hover:bg-navy/[0.08]">
                    {settings?.aboutUs?.logo ? (
                      <img src={settings.aboutUs.logo} alt="Logo" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-navy/40">
                        <Upload size={32} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Subir Logo</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-navy text-white flex items-center justify-center shadow-xl shadow-navy/20 scale-0 group-hover:scale-100 transition-transform">
                    <Upload size={18} />
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full py-4 rounded-2xl bg-navy text-white font-black text-sm hover:bg-navy/90 transition-all disabled:opacity-50 shadow-lg shadow-navy/20"
                  >
                    {isUploading ? 'Procesando...' : 'Cambiar Imagen'}
                  </button>
                  <p className="text-[10px] font-bold text-secondary text-center uppercase tracking-widest">JPG, PNG • Máximo 2MB</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              </div>
            </div>

            {/* Business Status Card */}
            <div className="bg-navy/5 border border-navy/10 rounded-[40px] p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                  <Globe size={20} />
                </div>
                <h4 className="font-black text-navy">Presencia Online</h4>
              </div>
              <div className="p-5 rounded-3xl bg-background border border-navy/10 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Slug del Negocio</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-navy">koda.app/{settings?.tenant?.slug}</span>
                  <button className="text-[10px] font-black text-navy uppercase hover:underline">Copiar Link</button>
                </div>
              </div>
              <p className="text-[10px] font-medium text-navy/60 leading-relaxed italic">
                * Tu catálogo es generado automáticamente y se sincroniza con tu inventario.
              </p>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="xl:col-span-2 space-y-10">
            <div className="bg-background border border-foreground/5 rounded-[40px] p-10 space-y-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Settings className="text-foreground/5" size={80} />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-black text-primary">Información General</h3>
                <p className="text-secondary text-sm font-medium">Cuéntales a tus clientes de qué trata tu negocio.</p>
              </div>

              {feedback && (
                <div className={`px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                  feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {feedback.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
                  {feedback.msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nombre Comercial</label>
                    <input 
                      value={form.businessName} 
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })} 
                      className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">WhatsApp de Contacto</label>
                    <div className="relative">
                      <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/40" size={20} />
                      <input 
                        value={form.whatsApp} 
                        onChange={(e) => setForm({ ...form, whatsApp: e.target.value })} 
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02]" 
                        placeholder="300 000 0000" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Giro de Negocio</label>
                    <select 
                      value={form.type} 
                      onChange={(e) => setForm({ ...form, type: e.target.value })} 
                      className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] appearance-none cursor-pointer"
                    >
                      <option value="ropa">Ropa y Moda</option>
                      <option value="calzado">Calzado</option>
                      <option value="accesorios">Accesorios</option>
                      <option value="boutique">Boutique</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Descripción de la Tienda</label>
                  <textarea 
                    rows={4} 
                    value={form.description} 
                    onChange={(e) => setForm({ ...form, description: e.target.value })} 
                    className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] resize-none" 
                    placeholder="Escribe algo que enamore a tus clientes..." 
                  />
                </div>

                <div className="pt-10 border-t border-foreground/5 space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-primary flex items-center gap-2">Redes Sociales</h4>
                    <p className="text-secondary text-xs font-medium">Conecta tus perfiles externos para mayor confianza.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
                        <input 
                          value={socialLinks.instagram} 
                          onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} 
                          placeholder="@usuario"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-foreground/10 focus:border-navy outline-none transition-all font-bold text-xs bg-foreground/[0.01]" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
                        <input 
                          value={socialLinks.facebook} 
                          onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} 
                          placeholder="facebook.com/..."
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-foreground/10 focus:border-navy outline-none transition-all font-bold text-xs bg-foreground/[0.01]" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
                        <input 
                          value={socialLinks.twitter} 
                          onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })} 
                          placeholder="@usuario"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-foreground/10 focus:border-navy outline-none transition-all font-bold text-xs bg-foreground/[0.01]" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSaving} 
                    className="w-full md:w-auto px-12 py-5 rounded-[24px] bg-navy text-white font-black hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-navy/20 flex items-center justify-center gap-3"
                  >
                    {isSaving ? 'Guardando...' : <><CheckCircle size={20} /> Guardar Configuración</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
