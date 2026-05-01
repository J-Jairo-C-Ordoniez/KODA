import { Layout, Smartphone, Info, CheckCircle } from 'lucide-react';

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
  return (
    <div className="space-y-10 relative z-10">
      <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-foreground/5">
            <Layout size={18} className="text-navy" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">General Information</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Business Name</label>
            <input 
              value={form.businessName} 
              onChange={(e) => setForm({ ...form, businessName: e.target.value })} 
              className="w-full px-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/2 shadow-inner" 
              placeholder="E.g. Koda Boutique"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Business Type</label>
            <div className="relative">
              <select 
                value={form.type} 
                onChange={(e) => setForm({ ...form, type: e.target.value })} 
                className="w-full px-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/2 appearance-none cursor-pointer shadow-inner"
              >
                <option value="ropa">Clothing & Fashion</option>
                <option value="calzado">Footwear & Shoes</option>
                <option value="accesorios">Accessories & Jewelry</option>
                <option value="boutique">Multibrand Boutique</option>
                <option value="deportes">Sporting Goods</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <Info size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">URL Identifier (Slug)</label>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/40 font-bold text-sm">koda.app/</div>
              <input 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s/g, '-') })} 
                className="w-full pl-[92px] pr-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-black text-navy bg-foreground/2 shadow-inner" 
              />
            </div>
            <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest ml-1">This changes your public link. Use with caution.</p>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Sales WhatsApp</label>
            <div className="relative">
              <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-navy" size={18} />
              <input 
                value={form.whatsApp} 
                onChange={(e) => setForm({ ...form, whatsApp: e.target.value })} 
                className="w-full pl-14 pr-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/2 shadow-inner" 
                placeholder="300 000 0000" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Brand Description</label>
          <textarea 
            rows={3} 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            className="w-full px-6 py-4 rounded-[20px] border-2 border-foreground/5 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary bg-foreground/2 resize-none shadow-inner" 
            placeholder="Define your style, mission, or what makes your store unique..." 
          />
        </div>
      </div>

      <div className="pt-6 border-t border-foreground/5 space-y-8">
        <div className="flex items-center gap-3">
            <Smartphone size={18} className="text-navy" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Social Media</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="relative group">
              <InstagramIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-navy group-focus-within:scale-110 transition-transform w-5 h-5" />
              <input 
                value={socialLinks.instagram} 
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} 
                placeholder="Instagram @user"
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
          {isSaving ? 'Saving changes...' : <><CheckCircle size={20} /> Update Settings</>}
        </button>
      </div>
    </div>
  );
}
