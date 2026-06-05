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
  return (
    <article className="bg-[#181818] border border-[#262626] p-5 sm:p-6 rounded-2xl hover:border-accent/20 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-350 group-hover:scale-105 ${iconBg || 'bg-accent/10'}`}>
          <Icon size={20} className={iconColor || 'text-accent'} aria-hidden="true" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold ${
            trend === 'up'   ? 'bg-success/8 text-success border-success/15' :
            trend === 'down' ? 'bg-accent-red/8 text-accent-red border-accent-red/15' :
                               'bg-foreground/4 text-foreground-muted border-foreground/8'
          }`}>
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1.5">
        <p className="text-foreground-muted text-[10px] font-bold tracking-[0.1em] uppercase">{label}</p>
        <p className="text-2xl font-bold text-foreground tracking-tight transition-all group-hover:scale-[1.01] origin-left">
          {typeof value === 'number' ? value.toLocaleString('es-ES') : value}
        </p>
      </div>
    </article>
  );
}
