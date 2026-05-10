import Container from "@/components/ui/Container";

interface HeroProps {
    title: string;
    subtitle?: string;
    badge?: string;
}

export default function Hero({ title, subtitle, badge = 'Soporte & Ayuda' }: HeroProps) {
    return (
        <section className="relative pt-24 pb-20 overflow-hidden bg-background">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-contrast/6 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            <Container className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-contrast" />
                    <p className="text-xs uppercase font-bold tracking-widest text-foreground-muted">{badge}</p>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tighter mb-6">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto font-medium leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </Container>
        </section>
    );
}
