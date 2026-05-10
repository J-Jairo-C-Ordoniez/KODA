interface StepsProps {
    step: number;
}

export default function Steps({ step }: StepsProps) {
    return (
        <div className="mb-10 flex items-center justify-between px-1">
            <span className={`flex items-center gap-3 ${step >= 1 ? 'text-contrast' : 'text-foreground-muted/30'}`}>
                <p className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-300 ${
                    step >= 1 ? 'border-contrast bg-contrast/10 text-contrast' : 'border-foreground/10 text-foreground-muted/30'
                }`}>1</p>
                <p className="text-xs uppercase font-bold tracking-widest hidden sm:inline">Negocio</p>
            </span>
            <span className="h-px grow mx-4 bg-foreground/10 relative rounded-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-contrast rounded-full"
                />
            </span>
            <span className={`flex items-center gap-3 ${step === 2 ? 'text-contrast' : 'text-foreground-muted/30'}`}>
                <p className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm border-2 ${
                    step === 2 ? 'border-contrast bg-contrast/10 text-contrast' : 'border-foreground/10 text-foreground-muted/30'
                }`}>2</p>
                <span className="text-xs uppercase font-bold tracking-widest hidden sm:inline">Dueño</span>
            </span>
        </div>
    );
}