'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

interface Props {
  businessName: string;
  slug: string;
}

export default function Header({ businessName, slug }: Props) {
  return (
    <header className="h-16 flex justify-center items-center w-full transition-all duration-500">
      <div className="h-full flex items-center justify-between w-full">
        <Link
          href={`/${slug}`}
          className="w-[70%] h-full bg-transparent flex items-center px-10 md:px-40 py-4 text-2xl font-bold text-primary tracking-tight"
        >
          {businessName}
        </Link>

        <div className="w-[30%] h-full bg-primary flex items-center justify-center">
          <Link
            href={`/${slug}/search`}
            className="flex items-center gap-2 text-foreground-muted/80 hover:text-foreground-muted transition-colors"
            title='Buscar'
          >
            <Search
              size={24}
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
