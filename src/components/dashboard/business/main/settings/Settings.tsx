'use client';

import { useEffect, useState, useRef } from 'react';
import { Settings, Upload, CheckCircle, Smartphone, Globe, Mail, Info, Copy, ExternalLink, ShieldCheck, Palette, Layout } from 'lucide-react';
import { useBusinessSettings } from '@/hooks/admin/useBusinessSettings';
import { SectionHeader } from '@/components/dashboard/business/ui/SectionHeader';
import Loader from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { Toaster, useToast } from '@/components/ui/Toast';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  );
}

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
      showToast('success', 'Logo actualizado', 'La imagen de marca se ha renovado.');
    } else {
      showToast('error', 'Error al subir', result.error || 'No se pudo cargar la imagen.');
    }
  };

  const copyLink = () => {
    const link = `koda.app/${form.slug}`;
    navigator.clipboard.writeText(link);
    showToast('success', 'Link copiado', 'Ya puedes compartir tu catálogo en redes.');
  };

  return (
    <main className="space-y-10 bg-background w-full pt-8 px-12 overflow-y-auto pb-20 custom-scrollbar relative">
      <Toaster toasts={toasts} removeToast={removeToast} />
      
      <SectionHeader 
        title="Configuración del Negocio" 
        subtitle="Gestiona la identidad visual, datos de contacto y presencia digital de tu marca." 
      />

      {isLoading ? <Loader size="lg" className="h-[50vh]" /> : error ? (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-6 rounded-[32px] border border-red-100 flex items-center gap-3 animate-in fade-in duration-300">
           <Info size={24} /> {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
          {/* Sidebar: Brand & Catalog Preview */}
          <div className="space-y-8 h-full">
            <div className="bg-background border border-foreground/5 rounded-[40px] p-8 space-y-8 shadow-sm">
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
                   <Palette size={16} className="text-navy" /> Identidad Visual
                </h3>
                <p className="text-secondary text-[10px] font-bold uppercase tracking-tight opacity-60">Tu logo es la cara de tu negocio.</p>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div 
                  className="relative group cursor-pointer w-full aspect-square max-w-[240px]" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-full h-full rounded-[48px] border-2 border-dashed border-navy/10 flex items-center justify-center bg-navy/[0.02] overflow-hidden transition-all group-hover:border-navy/30 group-hover:bg-navy/[0.05]">
                    {settings?.aboutUs?.logo ? (
                      <img src={settings.aboutUs.logo} alt="Logo" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-navy/30">
                        <Upload size={40} strokeWidth={1.5} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Subir Logo</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[48px] backdrop-blur-[2px]">
                     <div className="w-12 h-12 rounded-2xl bg-white text-navy flex items-center justify-center shadow-2xl">
                        <Upload size={20} />
                     </div>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full py-4 rounded-2xl bg-navy text-white font-black text-[10px] uppercase tracking-widest hover:bg-navy/90 transition-all disabled:opacity-50 shadow-xl shadow-navy/10"
                  >
                    {isUploading ? 'Procesando...' : 'Cambiar Imagen'}
                  </button>
                  <p className="text-[9px] font-black text-secondary text-center uppercase tracking-[0.2em] opacity-40">JPG, PNG • Máximo 2MB</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              </div>
            </div>

            {/* Catalog Link Card */}
            <div className="bg-navy/[0.03] border border-navy/10 rounded-[40px] p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-navy/[0.05] rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                  <Globe size={20} />
                </div>
                <div>
                   <h4 className="font-black text-navy text-xs uppercase tracking-widest">Catálogo Público</h4>
                   <p className="text-[9px] font-bold text-navy/40 uppercase tracking-tight">Tu vitrina 24/7</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-navy/10 space-y-4 shadow-sm relative z-10 transition-transform group-hover:translate-y-[-2px]">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-secondary/60">Slug Personalizado</p>
                  <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <span className="text-xs font-black text-navy truncate">koda.app/{form.slug}</span>
                    <button onClick={copyLink} className="p-2 hover:bg-navy/5 text-navy rounded-lg transition-all shrink-0"><Copy size={14} /></button>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.open(`https://koda.app/${form.slug}`, '_blank')}
                  className="w-full py-2.5 rounded-xl border border-navy/20 text-navy text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-navy hover:text-white transition-all"
                >
                  <ExternalLink size={12} /> Visitar Catálogo
                </button>
              </div>

              <div className="flex items-start gap-3 p-4 bg-navy/5 rounded-2xl border border-navy/10 relative z-10">
                 <ShieldCheck size={16} className="text-navy shrink-0 mt-0.5" />
                 <p className="text-[9px] font-bold text-navy/60 leading-relaxed uppercase tracking-tight">
                   Tu catálogo se sincroniza en tiempo real con tu inventario. Lo que vendas aquí, se descuenta allá.
                 </p>
              </div>
            </div>
          </div>

          {/* Main Configuration Area */}
          <div className="xl:col-span-2 space-y-10 h-full">
            <div className="bg-background border border-foreground/5 rounded-[40px] p-10 space-y-12 shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Settings size={120} strokeWidth={1} />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-3xl font-black text-primary tracking-tight">Datos del Negocio</h3>
                <p className="text-secondary text-sm font-medium">Define cómo te ven tus clientes en el mundo digital.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-8">
                   <div className="flex items-center gap-3 pb-2 border-b border-foreground/5">
                      <Layout size={18} className="text-navy" />
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Información General</h4>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Nombre Comercial</label>
                      <input 
                        value={form.businessName} 
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })} 
                        className="w-full px-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] shadow-inner" 
                        placeholder="Ej. Koda Boutique"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Giro de Negocio</label>
                      <div className="relative">
                        <select 
                          value={form.type} 
                          onChange={(e) => setForm({ ...form, type: e.target.value })} 
                          className="w-full px-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] appearance-none cursor-pointer shadow-inner"
                        >
                          <option value="ropa">Ropa y Moda</option>
                          <option value="calzado">Calzado y Zapatos</option>
                          <option value="accesorios">Accesorios y Joyería</option>
                          <option value="boutique">Boutique Multimarca</option>
                          <option value="deportes">Artículos Deportivos</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                           <Info size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Identificador en URL (Slug)</label>
                      <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/40 font-bold text-sm">koda.app/</div>
                        <input 
                          value={form.slug} 
                          onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s/g, '-') })} 
                          className="w-full pl-[92px] pr-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-black text-navy bg-foreground/[0.02] shadow-inner" 
                        />
                      </div>
                      <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest ml-1">Esto cambia tu link público. Úsalo con cuidado.</p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">WhatsApp de Ventas</label>
                      <div className="relative">
                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-navy" size={18} />
                        <input 
                          value={form.whatsApp} 
                          onChange={(e) => setForm({ ...form, whatsApp: e.target.value })} 
                          className="w-full pl-14 pr-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] shadow-inner" 
                          placeholder="300 000 0000" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Descripción de la Marca</label>
                    <textarea 
                      rows={3} 
                      value={form.description} 
                      onChange={(e) => setForm({ ...form, description: e.target.value })} 
                      className="w-full px-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/[0.02] resize-none shadow-inner" 
                      placeholder="Define tu estilo, tu misión o lo que hace única a tu tienda..." 
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-foreground/5 space-y-8">
                  <div className="flex items-center gap-3">
                     <Smartphone size={18} className="text-navy" />
                     <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Presencia en Redes</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="relative group">
                        <InstagramIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-navy group-focus-within:scale-110 transition-transform w-5 h-5" />
                        <input 
                          value={socialLinks.instagram} 
                          onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} 
                          placeholder="Instagram @usuario"
                          className="w-full pl-14 pr-4 py-4 rounded-2xl border border-foreground/10 focus:border-navy outline-none transition-all font-bold text-xs bg-background shadow-sm" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="relative group">
                        <FacebookIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-navy group-focus-within:scale-110 transition-transform w-5 h-5" />
                        <input 
                          value={socialLinks.facebook} 
                          onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} 
                          placeholder="Facebook URL"
                          className="w-full pl-14 pr-4 py-4 rounded-2xl border border-foreground/10 focus:border-navy outline-none transition-all font-bold text-xs bg-background shadow-sm" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="relative group">
                        <TwitterIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-navy group-focus-within:scale-110 transition-transform w-5 h-5" />
                        <input 
                          value={socialLinks.twitter} 
                          onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })} 
                          placeholder="Twitter / X"
                          className="w-full pl-14 pr-4 py-4 rounded-2xl border border-foreground/10 focus:border-navy outline-none transition-all font-bold text-xs bg-background shadow-sm" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSaving} 
                    className="w-full md:w-auto px-16 py-5 rounded-[28px] bg-navy text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-navy/20 flex items-center justify-center gap-3"
                  >
                    {isSaving ? 'Guardando cambios...' : <><CheckCircle size={20} /> Actualizar Configuración</>}
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
