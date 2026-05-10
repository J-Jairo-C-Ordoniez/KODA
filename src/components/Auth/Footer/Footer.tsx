import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background text-primary py-10 overflow-hidden relative border-t border-foreground/5">
      <Container>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          <article className="space-y-5">
            <Logo type="light" />
            <p className="text-sm text-foreground-muted font-medium leading-relaxed max-w-xs">
              La plataforma inteligente para el control total de inventarios y ventas en negocios de moda.
            </p>
          </article>
          <nav>
            <h4 className="text-xs uppercase font-bold tracking-widest text-foreground-muted mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Inicio</Link></li>
              <li><Link href="/#features" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Características</Link></li>
              <li><Link href="/#pricing" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Planes</Link></li>
              <li><Link href="/register" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Registrar Negocio</Link></li>
            </ul>
          </nav>
          <article>
            <h4 className="text-xs uppercase font-bold tracking-widest text-foreground-muted mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/policies/terms" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Términos y Condiciones</Link></li>
              <li><Link href="/policies/privacy" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Política de Privacidad</Link></li>
              <li><Link href="/policies/cookies" className="text-sm text-primary/60 hover:text-primary transition-colors duration-200">Política de Cookies</Link></li>
            </ul>
          </article>
          <article>
            <h4 className="text-xs uppercase font-bold tracking-widest text-foreground-muted mb-6">Ubicación</h4>
            <address className="not-italic space-y-1">
              <p className="text-sm text-primary/60">La Unión, Nariño</p>
              <p className="text-sm text-primary/60">Colombia</p>
            </address>
          </article>
        </section>
        <section className="pt-12 border-t border-foreground/10">
          <article className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary/30 tracking-wide">© {new Date().getFullYear()} KODA. Todos los derechos reservados.</p>
            <Link href="/help" className="text-xs text-primary/40 hover:text-primary/80 transition-colors duration-200">Centro de ayuda</Link>
          </article>
        </section>
      </Container>
    </footer>
  );
}
