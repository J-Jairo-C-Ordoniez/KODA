"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import Logo from '@/shared/components/Logo';
import Button from '@/shared/components/Button';
import Container from '@/shared/components/Container';
import Nav from '@/features/legal/components/Header/ui/Menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-16 flex justify-center items-center sticky top-0 w-full z-50 transition-all duration-500">
      <Container className="flex items-center justify-between">
        <div className="w-[70%] h-16 bg-transparent flex items-center px-40 py-4">
          <Logo />
        </div>

        <div className="w-[30%] h-16 bg-primary flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen
              ? <X size={24} className="text-foreground-muted" aria-label="Cerrar menú" />
              : <Menu size={24} className="text-foreground-muted" aria-label="Abrir menú" />
            }
          </Button>
        </div>
      </Container>

      {isMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú móvil">
          <Nav setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </header>
  );
}
