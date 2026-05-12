interface CardDetailProps {
    title: string;
    description: string;
    color: string;
    children: React.ReactNode;
}

export default function CardDetail({ title, description, color, children }: CardDetailProps) {
    return (
        <article className="scrolly-card opacity-0 flex flex-col md:flex-row items-center gap-10 bg-background-elevated border border-foreground/5 rounded-4xl p-8 md:p-12 shadow-2xl">
            <div className="flex-1 space-y-6">
                <h3 className="text-3xl md:text-4xl font-black text-primary leading-tight tracking-tight">
                    {title}
                </h3>

                <p className="text-lg text-foreground-muted leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="scrolly-img flex-1 w-full bg-background rounded-3xl border border-foreground/10 aspect-square md:aspect-4/3 flex items-center justify-center relative overflow-hidden transform-gpu">
                {children}
            </div>
        </article>
    );
}