import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface KPIBadge {
    text: string | number;
    className?: string;
}

export interface KPIsProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconClassName?: string;
    valueClassName?: string;
    badge?: KPIBadge;
    footer?: ReactNode;
}

export default function KPIs({ title, value, icon: Icon, iconClassName = "bg-primary text-background", valueClassName = "text-primary", badge, footer }: KPIsProps) {
    return (
        <article className="bg-background-card border border-primary/8 hover:shadow-md p-5 rounded-2xl transition-all duration-300 group">
            <header className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${iconClassName}`} >
                    <Icon
                        size={20}
                        aria-hidden="true"
                    />
                </div>

                {badge && badge.text && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${badge.className || 'text-primary bg-primary/2 border-primary/8'}`}>
                        {badge.text}
                    </span>
                )}
            </header>

            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-primary/50 mb-1">
                    {title}
                </h3>
                <p className={`text-2xl font-bold tracking-tight ${valueClassName}`}>
                    {value}
                </p>
            </div>

            {footer && (
                <div className="mt-1">
                    {footer}
                </div>
            )}
        </article>
    );
}