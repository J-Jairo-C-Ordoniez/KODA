'use client';

import Link from 'next/link';

interface Props {
  businessName?: string;
  slug?: string;
  whatsApp?: string;
}

export default function Footer({ businessName, slug }: Props) {
  return (
    <footer className="w-full bg-background border-t border-primary/5 mt-20 py-12">
      <div className='mx-auto px-10 py-12'>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-6 relative z-10">
          <article>
            <h2 className="text-xl font-bold tracking-tight text-primary">
              {businessName || 'KODA STORE'}
            </h2>
          </article>

          <nav>
            <h4 className="font-medium leading-[1.1] tracking-tight text-md text-primary mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">
                KODA
              </Link>
              </li>
              {slug && (
                <li>
                  <Link href={`/${slug}/about`} className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">
                    Información
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <article>
            <h4 className="font-medium leading-[1.1] tracking-tight text-md text-primary mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/termsAndConditions" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/legal/privacyPolicy" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/cookiesPolicy" className="text-base font-normal leading-relaxed text-foreground/80 hover:text-foreground transition-colors duration-200">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </article>
        </section>
        <section className="pt-8 border-t border-foreground/5">
          <p className="text-base font-normal leading-relaxed text-foreground/80">
            © {new Date().getFullYear()} {businessName || 'KODA STORE'}. Todos los derechos reservados.
          </p>
        </section>
      </div>
    </footer>
  );
}
