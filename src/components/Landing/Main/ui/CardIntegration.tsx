interface CardIntegrationProps {
    integration: {
        title: string;
        desc: string;
        icon: React.ReactNode;
        iconBg: string;
        detail: string;
    }
}

export default function CardIntegration({ integration }: CardIntegrationProps) {
    const { icon, iconBg, title, desc, detail } = integration;

    return (
        <article className="integration-card group opacity-0 relative flex flex-col p-8 md:p-12 rounded-[2.5rem] bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 hover:border-contrast/30 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.1)]">
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full ${iconBg}`} />

            <div className="relative z-10 flex flex-col h-full">
                <span className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-white/5`}>
                    {icon}
                </span>

                <div className="mt-auto space-y-4">
                    <h3 className="text-2xl md:text-4xl font-black text-primary leading-tight tracking-tighter group-hover:text-contrast transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-base md:text-xl text-foreground-muted leading-relaxed font-medium">
                        {desc}
                    </p>
                    
                    <div className="pt-6 border-t border-foreground/10">
                        <p className="text-sm md:text-lg font-bold text-foreground flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-contrast shadow-[0_0_10px_rgba(255,122,0,0.5)] animate-pulse" />
                            {detail}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

