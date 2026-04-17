import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-background mt-6 py-20 border-t border-secondary/10">
      <div className="text-secondary tracking-wider container mx-auto p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <Link href="/aboutUs" className="hover:text-primary transition-colors text-sm md:text-base">
          Nosotros
        </Link>
        <Link href="/policies" className="hover:text-primary transition-colors text-sm md:text-base">
          Políticas y Privacidad
        </Link>
        <Link href="/contact" className="hover:text-primary transition-colors text-sm md:text-base">
          Contacto
        </Link>
      </div>
      <div className="text-secondary/40 tracking-wider container mx-auto p-4 md:p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        <p className="text-xs md:text-base">© {new Date().getFullYear()} Moda y Estilo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
