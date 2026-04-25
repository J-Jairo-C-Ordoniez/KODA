interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-navy mb-1">Panel de Gestión</p>
        <h1 className="text-3xl font-black text-primary tracking-tight">{title}</h1>
        {subtitle && <p className="text-secondary font-medium mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
