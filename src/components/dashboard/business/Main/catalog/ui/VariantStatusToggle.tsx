import { Layers } from 'lucide-react';
import { labelClasses } from './VariantInput';

export default function VariantStatusToggle({ isActive, setIsActive }: any) {
  return (
    <fieldset className="space-y-1">
      <legend className={labelClasses}>Estado</legend>
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className="w-full p-3.5 rounded-2xl border border-foreground/10 bg-background flex items-center justify-between gap-2 hover:border-contrast/30 transition-all"
        aria-pressed={isActive}
      >
        <span className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-contrast/10 border border-contrast/20' : 'bg-foreground/5 border border-foreground/10'}`}>
            <Layers size={14} className={isActive ? 'text-contrast' : 'text-foreground/50'} />
          </span>
          <span className="text-left flex flex-col">
            <span className="font-semibold text-sm text-primary leading-none">{isActive ? 'Público' : 'Oculto'}</span>
            <p className="text-foreground/60 text-xs">Visibilidad</p>
          </span>
        </span>
        <span className={`w-12 h-6 rounded-full p-0.5 transition-all shrink-0 ${isActive ? 'bg-contrast shadow-lg shadow-contrast/30' : 'bg-foreground/15'}`}>
          <span className={`w-5 h-5 rounded-full bg-white transition-all transform shadow-sm block ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
        </span>
      </button>
    </fieldset>
  );
}
