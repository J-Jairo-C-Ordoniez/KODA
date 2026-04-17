import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'ambulance';
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({ children, href, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const baseStyles = "cursor-pointer px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm lg:text-md active:scale-95";

  const variants = {
    primary: "bg-primary text-foreground hover:bg-secondary shadow-lg shadow-black/5",
    secondary: "bg-secondary text-foreground hover:bg-primary shadow-xl shadow-black/5",
    outline: "border border-primary/20 text-primary hover:bg-secondary/10",
    ghost: "text-primary hover:bg-secondary/10",
    accent: "bg-accent/80 text-foreground hover:bg-accent shadow-lg",
    ambulance: "bg-background/60 text-primary/60 hover:text-primary shadow-lg",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};
