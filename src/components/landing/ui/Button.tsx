import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'ambulance' | 'navy';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false,
  size = 'md'
}: ButtonProps) {
  const baseStyles = "cursor-pointer rounded-lg font-black tracking-wide transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm lg:text-md",
    lg: "px-8 py-4 text-md lg:text-lg",
  };

  const variants = {
    primary: "bg-primary text-background hover:bg-navy shadow-lg shadow-black/5",
    secondary: "bg-secondary text-background hover:bg-primary shadow-xl shadow-black/5",
    outline: "border-2 border-navy/20 text-navy hover:border-navy hover:bg-navy/5",
    ghost: "text-navy hover:bg-navy/5",
    accent: "bg-navy text-background hover:opacity-90 shadow-xl shadow-navy/20",
    navy: "bg-navy text-background hover:opacity-90 shadow-xl shadow-navy/20",
    ambulance: "bg-background border border-foreground/10 text-primary hover:bg-foreground hover:text-background shadow-sm hover:shadow-lg",
  };

  const combinedStyles = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles}>
      {children}
    </button>
  );
};
