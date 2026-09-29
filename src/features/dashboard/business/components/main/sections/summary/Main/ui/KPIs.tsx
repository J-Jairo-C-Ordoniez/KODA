import { ReactNode } from 'react';

export interface KPIBadge {
    text: string | number;
    className?: string;
}

export interface KPIsProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    iconClassName?: string;
    valueClassName?: string;
    badge?: KPIBadge;
    footer?: ReactNode;
}

export default function KPIs({ title, value, icon: Icon, iconClassName = "text-primary", valueClassName = "text-primary", badge, footer }: KPIsProps) {
    return (
        <article className="rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-4 sm:p-6 flex flex-col justify-center">
            <header className="flex justify-between items-start mb-3">
                <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${iconClassName}`}>
                    <Icon
                        size={24}
                        weight="fill"
                        aria-hidden="true"
                    />
                </div>

                {badge && badge.text && (
                    <span className={`text-base sm:text-md font-semibold leading-relaxed px-2 py-0.5 rounded-full ${badge.className || 'text-primary/70'}`}>
                        {badge.text}
                    </span>
                )}
            </header>

            <div>
                <h3 className="text-base sm:text-md font-medium leading-relaxed text-foreground/75 mb-1">
                    {title}
                </h3>
                <p className={`text-base sm:text-lg md:text-2xl font-bold leading-relaxed text-foreground/75 ${valueClassName}`}>
                    {value}
                </p>
            </div>

            {footer && (
                <div className="mt-2 pt-2 border-t border-primary/10">
                    {footer}
                </div>
            )}
        </article>
    );
}