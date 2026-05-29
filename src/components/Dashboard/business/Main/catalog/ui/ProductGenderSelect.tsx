export default function ProductGenderSelect({ gender, setGender }: { gender: string, setGender: (g: string) => void }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-foreground/80 tracking-tight ml-1 mb-2">Género</legend>
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Selección de género">
        {['hombre', 'mujer', 'mixto'].map(g => (
          <button
            key={g}
            type="button"
            onClick={() => setGender(g)}
            aria-pressed={gender === g}
            className={`py-2.5 rounded-2xl border font-semibold text-sm capitalize transition-all active:scale-95 ${
              gender === g 
                ? 'bg-contrast text-white border-contrast shadow-lg shadow-contrast/20' 
                : 'bg-background text-foreground-muted border-foreground/10 hover:border-contrast/30 hover:text-primary'
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
