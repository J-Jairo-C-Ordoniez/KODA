interface PolicyHeroProps {
    title: string;
    subtitle?: string;
}

export default function PolicyHero({ title, subtitle }: PolicyHeroProps) {
    return (
        <section className="relative w-full flex flex-col items-center bg-background px-6 pt-8 lg:pt-10 pb-12 overflow-hidden">
            <div className="container relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
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
