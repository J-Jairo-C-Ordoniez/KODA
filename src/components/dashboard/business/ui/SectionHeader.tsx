interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action, children }: SectionHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-primary tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-foreground-muted text-sm font-medium mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {(action || children) && (
        <div className="shrink-0 w-full sm:w-auto">
          {children || action}
        </div>
      )}
    </header>
  );
}
