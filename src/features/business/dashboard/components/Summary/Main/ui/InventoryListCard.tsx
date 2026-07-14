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
        <article className="bg-white border border-gray-200 shadow-sm hover:shadow-md p-5 rounded-2xl transition-all duration-300 flex flex-col h-full">
            <header className="mb-4 flex items-center gap-2">
                <div aria-hidden="true">{icon}</div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {title}
                </h3>
            </header>

            <div className="flex-1">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-6">{emptyMessage}</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0 group">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.subtitle}
                                    </p>
                                </div>
                                <span
                                    className={`text-xs font-bold px-2 py-1 rounded-md border whitespace-nowrap ml-3 ${item.badgeStyles}`}
                                >
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