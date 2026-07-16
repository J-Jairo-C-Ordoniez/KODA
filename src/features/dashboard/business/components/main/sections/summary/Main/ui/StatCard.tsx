import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    iconBg?: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ label, value, icon: Icon, iconColor, iconBg, change, trend }: StatCardProps) {
    
    // Configuración semántica de colores para la etiqueta de tendencia
    const trendStyles = {
        up: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        down: 'bg-red-50 text-red-700 border-red-100',
        neutral: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    return (
        <article className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 p-5 rounded-2xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${iconBg || 'bg-gray-100'}`}>
                    <Icon size={20} className={iconColor || 'text-gray-600'} aria-hidden="true" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold tracking-wide ${trend ? trendStyles[trend] : trendStyles.neutral}`}>
                        <span>{change}</span>
                    </div>
                )}
            </div>
            
            <div className="space-y-1">
                <h3 className="text-gray-500 text-[10px] font-bold tracking-[0.1em] uppercase">
                    {label}
                </h3>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">
                    {typeof value === 'number' ? value.toLocaleString('es-ES') : value}
                </p>
            </div>
        </article>
    );
}