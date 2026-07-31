"use client";

import { ShieldCheck } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: Props) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-primary/5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-primary/60 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-primary/5">
          <ShieldCheck size={14} className="text-primary/60" />
          <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">
            Empleado en Turno
          </span>
        </div>
      </div>
    </header>
  );
}
