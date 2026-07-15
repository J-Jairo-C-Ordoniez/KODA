import React from 'react';

interface HelpCardProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

export default function HelpCard({ title, desc, icon }: HelpCardProps) {
    return (
        <article className="relative flex flex-col justify-center gap-4 overflow-hidden rounded-4xl border p-8 md:p-12 w-full transition-all duration-300 border-primary/10 bg-background text-primary shadow-xl shadow-primary/2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background">
                {icon}
            </div>

            <div className="space-y-2 mt-auto">
                <h3 className="text-2xl font-bold leading-[1.1] tracking-tight">
                    {title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed opacity-80">
                    {desc}
                </p>
            </div>
        </article>
    );
}