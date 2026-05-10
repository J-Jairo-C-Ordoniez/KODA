import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-5">
      <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center">
        <Icon size={32} className="text-foreground-muted" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <p className="font-black text-primary text-lg">{title}</p>
        {description && <p className="text-foreground-muted text-sm font-medium max-w-xs mx-auto leading-relaxed">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
