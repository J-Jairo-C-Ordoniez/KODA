import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, description, action, children }: SectionHeaderProps) {
  const displaySubtitle = subtitle || description;
  return (
    <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">{title}</h1>
        {displaySubtitle && (
          <p className="text-foreground-muted/80 text-sm font-light mt-1 leading-relaxed">{displaySubtitle}</p>
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
