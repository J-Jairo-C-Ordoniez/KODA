interface PolicyHeroProps {
    title: string;
    subtitle?: string;
}

export default function PolicyHero({ title, subtitle }: PolicyHeroProps) {
    return (
        <section className="relative w-full flex flex-col items-center bg-background px-6 pt-8 lg:pt-10 pb-12 overflow-hidden">
            <div className="container relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
                <p className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-contrast/10 border border-contrast/20 text-contrast text-[10px] md:text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-contrast animate-ping" />
                    Legal y Privacidad
                </p>

                <h1 className="text-5xl md:text-7xl pt-4 font-black text-primary leading-none tracking-tighter mb-8">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mx-auto max-w-2xl text-foreground-muted text-xl md:text-2xl font-medium leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
