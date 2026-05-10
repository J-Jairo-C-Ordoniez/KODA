"use client";

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`h-20 flex justify-center items-center sticky top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-sm' : 'bg-transparent'
    }`}>
      <Container className="flex items-center justify-between">
        <Logo type="light" />

        <Button
          href="/register"
          variant="contrast"
          className="hidden md:flex px-8 py-2.5 font-bold tracking-widest uppercase text-xs"
        >
          Comenzar
        </Button>

        <Button
          variant="ambulance"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </Container>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 h-screen bg-background flex flex-col z-50">
          <div className="h-20 flex justify-between px-6 items-center border-b border-foreground/5">
            <Logo type="light" />
            <Button variant="ambulance" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          <div className="p-8">
            <Button href="/register" variant="contrast" className="w-full py-4 font-bold tracking-widest uppercase">
              Comenzar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
