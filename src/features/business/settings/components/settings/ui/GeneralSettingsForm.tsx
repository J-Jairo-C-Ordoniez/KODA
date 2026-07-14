'use client';

import { Smartphone, CheckCircle, Info, Store, Briefcase } from 'lucide-react';
import Loader from '@/shared/components/ui/Loader';

interface GeneralSettingsProps {
  form: any;
  setForm: (form: any) => void;
  socialLinks: any;
  setSocialLinks: (links: any) => void;
  isSaving: boolean;
}

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

export function GeneralSettingsForm({ form, setForm, socialLinks, setSocialLinks, isSaving }: GeneralSettingsProps) {
  const inputClass = "w-full px-6 py-4 rounded-2xl border border-white/10 bg-background focus:border-contrast/30 focus:ring-4 focus:ring-contrast/5 outline-none transition-all font-bold text-sm text-primary placeholder:text-foreground-muted/20 shadow-inner";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted mb-2 ml-1 opacity-60";

  return (
    <div className="space-y-12 relative z-10">
      <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-xl bg-contrast/10 flex items-center justify-center text-contrast">
              <Store size={16} />
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Información General</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Nombre del Negocio</label>
              <input 
                value={form.businessName} 
                onChange={(e) => setForm({ ...form, businessName: e.target.value })} 
                className={inputClass} 
                placeholder="Ej. Koda Boutique"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Tipo de Negocio</label>
              <div className="relative group">
                <select 
                  value={form.type} 
                  onChange={(e) => setForm({ ...form, type: e.target.value })} 
                  className={`${inputClass} appearance-none cursor-pointer pr-12`}
                >
                  <option value="ropa">Ropa y Moda</option>
                  <option value="calzado">Calzado y Zapatos</option>
                  <option value="accesorios">Accesorios y Joyería</option>
                  <option value="boutique">Boutique Multimarca</option>
                  <option value="deportes">Artículos Deportivos</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                    <Info size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>WhatsApp de Ventas</label>
              <div className="relative group">
                <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground-muted/40 group-focus-within:text-contrast transition-colors" size={18} />
                <input 
                  value={form.whatsApp} 
                  onChange={(e) => setForm({ ...form, whatsApp: e.target.value })} 
                  className={`${inputClass} pl-14`} 
                  placeholder="300 000 0000" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Descripción de la Marca</label>
              <textarea 
                rows={3} 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                className={`${inputClass} resize-none min-h-[120px]`} 
                placeholder="Define tu estilo, misión o lo que hace única a tu tienda..." 
              />
            </div>
          </div>
      </div>

      <div className="pt-8 border-t border-white/5 space-y-8">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Smartphone size={16} />
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Redes Sociales</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative group">
            <InstagramIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-muted/40 group-focus-within:text-pink-500 transition-colors w-5 h-5" />
            <input 
              value={socialLinks.instagram} 
              onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} 
              placeholder="@usuario"
              className={`${inputClass} pl-14 text-xs`} 
            />
          </div>
          
          <div className="relative group">
            <FacebookIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-muted/40 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input 
              value={socialLinks.facebook} 
              onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} 
              placeholder="Facebook URL"
              className={`${inputClass} pl-14 text-xs`} 
            />
          </div>

          <div className="relative group">
            <TwitterIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground-muted/40 group-focus-within:text-sky-400 transition-colors w-5 h-5" />
            <input 
              value={socialLinks.twitter} 
              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })} 
              placeholder="Twitter / X"
              className={`${inputClass} pl-14 text-xs`} 
            />
          </div>
        </div>
      </div>

      <div className="pt-10">
        <button 
          type="submit" 
          disabled={isSaving} 
          className="w-full sm:w-auto px-12 py-5 rounded-[24px] bg-contrast text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-contrast-hover transition-all disabled:opacity-50 shadow-2xl shadow-contrast/20 flex items-center justify-center gap-3 active:scale-95"
        >
          {isSaving ? <Loader size="xs" color="border-white" /> : <><CheckCircle size={20} /> Guardar Cambios</>}
        </button>
      </div>
    </div>
  );
}
