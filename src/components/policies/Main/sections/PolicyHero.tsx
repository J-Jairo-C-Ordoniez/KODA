import Container from "@/components/ui/Container";

interface PolicyHeroProps {
    title: string;
    subtitle?: string;
}

export default function PolicyHero({ title, subtitle }: PolicyHeroProps) {
    return (
        <section className="relative py-4 flex justify-center h-fit overflow-hidden bg-background bg-grid">
            <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] pointer-events-none" />

            <Container className="relative z-10 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 shadow-sm animate-fade-in">
                    <p className="text-xs uppercase font-bold tracking-[0.2em] text-navy">Legal & Privacidad</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-primary leading-tight tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-md lg:text-lg text-primary/80 max-w-4xl mx-auto font-medium leading-snug tracking-wider">
                        {subtitle}
                    </p>
                )}
            </Container>
        </section>
    );
}
