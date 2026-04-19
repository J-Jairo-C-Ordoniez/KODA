"use client";

import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Nav, { NavMobile } from './ui/Nav';
import Button from '../ui/Button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Características', href: '#features' },
    { name: 'Precios', href: '#pricing' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <Container className="flex items-center justify-between">
        <Logo type="light" />

        <Nav navLinks={navLinks} />

        <div className="hidden md:flex items-center gap-4">
          <Button
            href="/login"
            variant="ghost"
            className="px-4"
          >
            Ingresar
          </Button>
          <Button
            href="/register"
            variant="accent"
          >
            Comenzar
          </Button>
        </div>

        <Button
          variant="ambulance"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </Container>

      {isMenuOpen && (
        <NavMobile
          navLinks={navLinks}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </header>
  );
};
