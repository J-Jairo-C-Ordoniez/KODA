import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-background mt-20 py-24 border-t border-foreground/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <Link href="/aboutUs" className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all">
            Nosotros
          </Link>
          <Link href="/policies" className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all">
            Políticas y Privacidad
          </Link>
          <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all">
            Contacto
          </Link>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">
            © {new Date().getFullYear()} KODA CLOTHING. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
