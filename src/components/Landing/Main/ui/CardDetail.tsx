import { LucideIcon } from 'lucide-react';

interface CardDetailProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function CardDetail({ title, description, icon: Icon }: CardDetailProps) {
    return (
        <article className="scrolly-card group opacity-0 relative flex flex-col gap-6 bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 rounded-4xl p-2 md:p-8 hover:border-contrast/30 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.15)]">
            <div className="w-14 h-14 rounded-2xl bg-lirear-to-br from-background-elevated to-background border border-foreground/10 flex items-center justify-center text-contrast group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl">
                <Icon size={28} strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight tracking-tight group-hover:text-contrast transition-colors duration-300">
                {title}
            </h3>

            <p className="text-base md:text-lg text-foreground-muted leading-relaxed font-medium">
                {description}
            </p>
        </article>
    );
}
