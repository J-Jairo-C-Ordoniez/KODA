import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ label, value, icon: Icon, color, change, trend }: StatCardProps) {
  return (
    <article className="bg-background border border-foreground/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl transition-colors ${color || 'bg-navy/5 text-navy'}`}>
          <Icon size={20} />
        </div>
        {change && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
            trend === 'up' ? 'bg-green-500/10 text-green-600' :
            trend === 'down' ? 'bg-red-500/10 text-red-600' :
            'bg-foreground/5 text-secondary'
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-secondary text-sm font-medium mb-1">{label}</p>
      <h3 className="text-2xl font-black text-primary">{value}</h3>
    </article>
  );
}
