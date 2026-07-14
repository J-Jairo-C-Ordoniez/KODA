export const labelClasses = "text-sm font-medium text-foreground/80 tracking-tight ml-1 block mb-1";
export const inputClasses = "w-full px-4 py-2.5 rounded-2xl border border-foreground/10 focus:border-contrast focus:ring-4 focus:ring-contrast/15 outline-none transition-all font-medium text-primary bg-background text-sm placeholder:text-foreground/50";

export default function VariantInput({ label, name, icon: Icon, defaultValue, type = "text", step, prefix, placeholder }: any) {
  return (
    <div className="space-y-1">
      <label className={labelClasses} htmlFor={name}>{label}</label>
      <div className="relative group">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/30 group-focus-within:text-contrast transition-colors" size={13} />}
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/40 font-black text-xs group-focus-within:text-contrast transition-colors">{prefix}</span>}
        <input 
          id={name}
          required 
          type={type} 
          step={step} 
          name={name} 
          defaultValue={defaultValue} 
          className={`${inputClasses} ${Icon ? 'pl-9' : prefix ? 'pl-7' : ''}`} 
          placeholder={placeholder || label} 
        />
      </div>
    </div>
  );
}
