"use client";

import { useState, useEffect } from 'react';
import Container from '@/shared/components/Container';
import Logo from '@/shared/components/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`h-20 flex justify-center items-center sticky top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-sm' : 'bg-transparent'
      }`}>
      <Container className="flex items-center justify-between">
        <Logo type="light" />
      </Container>
    </header>
  );
}
