export default function ProductVisibilityToggle({ isPublic, setIsPublic }: { isPublic: boolean, setIsPublic: (p: boolean) => void }) {
  return (
    <fieldset className="p-4 rounded-2xl bg-background border border-foreground/8 flex items-center justify-between gap-4">
      <legend className="sr-only">Visibilidad del producto</legend>
      <div className="space-y-1">
        <p className="font-semibold text-primary text-sm tracking-tight">Público</p>
        <p className="text-foreground/60 text-sm font-medium leading-relaxed">Mostrar en el catálogo para clientes.</p>
      </div>
      <button
        type="button"
        onClick={() => setIsPublic(!isPublic)}
        className={`w-14 h-7 rounded-full p-1 transition-all shrink-0 ${isPublic ? 'bg-contrast shadow-lg shadow-contrast/30' : 'bg-foreground/15'}`}
        aria-pressed={isPublic}
        aria-label={isPublic ? 'Hacer privado' : 'Hacer público'}
      >
        <span className={`w-5 h-5 rounded-full bg-white transition-all transform shadow-sm block ${isPublic ? 'translate-x-7' : 'translate-x-0'}`} />
      </button>
    </fieldset>
  );
}
