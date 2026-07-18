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
        <article className="bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl flex flex-col h-full overflow-hidden transition-shadow duration-300">
            <header className="p-5 pb-4 flex items-center gap-2 border-b border-gray-50/50">
                <div aria-hidden="true" className="p-1.5 bg-gray-50 rounded-lg">
                    {icon}
                </div>
                <h3 className="text-base font-bold text-gray-800 tracking-tight">
                    {title}
                </h3>
            </header>

            <div className="flex-1 p-2">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-center px-4">
                        <p className="text-sm font-medium text-gray-400">{emptyMessage}</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-1">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-gray-900 transition-colors">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-400">
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