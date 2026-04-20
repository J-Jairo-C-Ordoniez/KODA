"use client";

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-foreground/5 shadow-sm' : 'bg-transparent py-6'}`}>
      <Container className="flex items-center justify-between">
        <Logo type="light" />

        <div className="hidden md:flex items-center gap-6">
          <Button
            href="/login"
            variant="ghost"
            className="px-4 font-bold tracking-tight text-primary/80 hover:text-navy hover:scale-105 transition-all"
          >
            Ingresar
          </Button>
          <Button
            href="/register"
            variant="accent"
            className="px-8 font-bold tracking-tight shadow-navy/20 hover:shadow-navy/40"
          >
            Comenzar
          </Button>
        </div>
      </Container>
    </header>
  );
};
