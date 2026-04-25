import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-60">
      <div className="p-5 bg-foreground/5 rounded-full">
        <Icon size={36} className="text-secondary" />
      </div>
      <div className="space-y-1">
        <p className="font-black text-primary">{title}</p>
        {description && <p className="text-secondary text-sm font-medium">{description}</p>}
      </div>
      {action && <div className="opacity-100">{action}</div>}
    </div>
  );
}
