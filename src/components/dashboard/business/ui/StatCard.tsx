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
    <article className="bg-background-elevated/50 lg:bg-background-elevated border border-white/5 lg:border-white/10 p-8 rounded-[32px] hover:border-contrast/20 transition-all duration-300 group shadow-xl shadow-black/5">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${iconBg || 'bg-contrast/10'} shadow-lg shadow-black/5`}>
          <Icon size={22} className={iconColor || 'text-contrast'} aria-hidden="true" />
        </div>
        {change && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
            trend === 'up'   ? 'bg-success/10 text-success border-success/20' :
            trend === 'down' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                               'bg-foreground/5 text-foreground-muted border-foreground/10'
          }`}>
            <span className="text-[10px] font-black tracking-tight">{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-foreground-muted text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none">{label}</p>
        <p className="text-3xl font-black text-primary tracking-tighter transition-all group-hover:scale-[1.02] origin-left">
          {typeof value === 'number' ? value.toLocaleString('es-ES') : value}
        </p>
      </div>
    </article>
  );
}
