'use client';

import React from 'react';

interface InventoryNavItemProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  activeColor: string;
}

export function InventoryNavItem({ label, value, icon, active, onClick, activeColor }: InventoryNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shrink-0 group
        ${active 
          ? `bg-background-elevated border-contrast/30 shadow-lg shadow-black/20` 
          : 'bg-transparent border-foreground/5 hover:border-foreground/10 text-foreground-muted hover:text-primary'
        }
      `}
    >
      <div className={`
        w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300
        ${active ? activeColor : 'bg-foreground/5 text-foreground-muted group-hover:bg-foreground/10'}
      `}>
        {React.cloneElement(icon as React.ReactElement<any>, { 
          size: 14,
          className: active ? 'text-white' : 'text-foreground-muted group-hover:text-primary'
        })}
      </div>
      
      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${active ? 'text-primary' : 'text-foreground-muted'}`}>
        {label}
      </span>

      <div className={`
        px-2 py-0.5 rounded-full text-[10px] font-black min-w-[24px] text-center transition-all duration-300
        ${active ? 'bg-contrast text-white scale-110 shadow-sm' : 'bg-foreground/10 text-foreground-muted'}
      `}>
        {value}
      </div>

      {active && (
        <div className="absolute inset-0 rounded-full border-2 border-contrast/10 animate-pulse pointer-events-none" />
      )}
    </button>
  );
}
