'use client';

import NavLeft from '@/features/storefront/components/Header/ui/NavLeft';
import NavRight from '@/features/storefront/components/Header/ui/NavRight';
import Link from 'next/link';

interface Props {
  businessName?: string;
  slug?: string;
  tenantId?: string;
}

export default function Header({ businessName, slug, tenantId }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-foreground/5 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative">
        <NavLeft />

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link href={`/${slug}`}>
            <h1 className="text-lg font-black tracking-[0.3em] text-primary whitespace-nowrap uppercase italic">
              {businessName}
            </h1>
          </Link>
        </div>

        <NavRight slug={slug} />
      </div>
    </header>
  );
}
