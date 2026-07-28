'use client';

import Link from 'next/link';
import { Search, Info } from 'lucide-react';

interface Props {
  slug: string;
  hasInfo?: boolean;
}

export default function NavRight({ slug, hasInfo = true }: Props) {
  return (
    <div className="flex items-center gap-6">
      <Link
        href={`/${slug}/search`}
        aria-label="Buscar en catálogo"
        className="text-foreground-muted hover:text-primary transition-all hover:scale-110 active:scale-95 p-1"
        title="Buscar"
      >
        <Search size={18} strokeWidth={2} />
      </Link>

      {hasInfo && (
        <Link
          href={`/${slug}/about`}
          aria-label="Información y Contacto"
          className="text-foreground-muted hover:text-primary transition-all hover:scale-110 active:scale-95 p-1"
          title="Contacto e Información"
        >
          <Info size={18} strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
