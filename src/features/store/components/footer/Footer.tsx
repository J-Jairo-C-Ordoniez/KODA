'use client';

import Link from 'next/link';

interface Props {
  businessName?: string;
  slug?: string;
  whatsApp?: string;
}

export default function Footer({ businessName, slug, whatsApp }: Props) {
  return (
    <footer className="w-full bg-background mt-32 py-16 border-t border-foreground/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
            {businessName || 'KODA STORE'}
          </p>
          <span className="hidden md:inline text-foreground-muted/30">•</span>
          <p className="text-[9px] font-bold text-foreground-muted uppercase tracking-[0.2em] opacity-40">
            © {new Date().getFullYear()} TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>

        {slug && (
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-foreground-muted">
            <Link href={`/${slug}`} className="hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link href={`/${slug}/search`} className="hover:text-primary transition-colors">
              Buscar
            </Link>
            <Link href={`/${slug}/about`} className="hover:text-primary transition-colors">
              Información
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
