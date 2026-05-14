import React from 'react';

interface HelpCardProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
    bgClass: string;
}

export default function HelpCard({ title, desc, icon, bgClass }: HelpCardProps) {
    return (
        <article className="group relative flex flex-col p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] bg-background-elevated/40 backdrop-blur-xl border border-foreground/10 hover:border-contrast/30 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.1)]">
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full ${bgClass.split(' ')[0]}`} />

            <div className="relative z-10 flex flex-col h-full">
                <span className={`w-14 h-14 ${bgClass} rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 border border-white/5`}>
                    {icon}
                </span>

                <div className="mt-auto space-y-3">
                    <h3 className="text-xl md:text-2xl font-black text-primary leading-tight tracking-tight group-hover:text-contrast transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-base md:text-lg text-foreground-muted leading-relaxed font-medium">
                        {desc}
                    </p>
                </div>
            </div>
        </article>
    );
}
