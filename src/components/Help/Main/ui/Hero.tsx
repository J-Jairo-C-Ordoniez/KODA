interface HeroProps {
    title: string;
    subtitle?: string;
    badge?: string;
}

export default function Hero({ title, subtitle, badge = 'Soporte & Ayuda' }: HeroProps) {
    return (
        <header className="relative px-6 pt-8 lg:pt-10 pb-12 overflow-hidden bg-background">
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tighter mb-6">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl text-foreground-muted max-w-3xl mx-auto font-medium leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </header>
    );
}
