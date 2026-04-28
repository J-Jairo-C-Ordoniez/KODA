import { ReactNode } from 'react';

export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-full mx-auto px-10 sm:px-20 ${className}`}>
      {children}
    </div>
  );
}