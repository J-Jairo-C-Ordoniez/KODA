import { ReactNode } from 'react';

export interface InventoryListItem {
    id: string;
    title: string;
    subtitle: string;
    badgeText: string;
    badgeStyles: string;
}

interface InventoryListCardProps {
    title: string;
    icon: ReactNode;
    items: InventoryListItem[];
    emptyMessage?: string;
}

export function InventoryListCard({ title, icon, items, emptyMessage = "No hay datos disponibles." }: InventoryListCardProps) {
    return (
        <article className="rounded-3xl md:rounded-4xl border border-primary/10 bg-background/80 shadow-sm p-4 sm:p-6 flex flex-col justify-center">
            <header className="pb-3 flex items-center gap-2 border-b border-primary/5">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <h3 className="text-base sm:text-md font-bold leading-relaxed text-foreground/75">
                    {title}
                </h3>
            </header>

            <div className="flex-1 p-2">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-30 text-center px-4">
                        <p className="text-sm font-medium leading-relaxed text-foreground/50">{emptyMessage}</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-0.5">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center p-2.5 rounded-xl hover:bg-primary/5 transition-colors group"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-base sm:text-md font-medium leading-relaxed text-foreground/75 capitalize">
                                        {item.title}
                                    </p>
                                    <p className="text-sm font-medium leading-relaxed text-foreground/50">
                                        {item.subtitle}
                                    </p>
                                </div>
                                <span className={`shrink-0 ml-3 ${item.badgeStyles}`}>
                                    {item.badgeText}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}