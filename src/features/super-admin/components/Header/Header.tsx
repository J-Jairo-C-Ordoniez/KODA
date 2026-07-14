'use client';

import Logo from '@/shared/components/Logo';

export default function Header() {
  return (
    <header className="px-4 sm:px-6 h-16 w-full bg-background/80 backdrop-blur-xl flex items-center justify-center lg:justify-start border-b border-foreground/5 sticky top-0 z-50">
      <Logo type="light" />
    </header>
  );
}