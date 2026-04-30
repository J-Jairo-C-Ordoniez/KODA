'use client';

import Link from 'next/link';
import { Search, User } from 'lucide-react';

export default function NavRight({ slug }: { slug?: string }) {
    return (
        <div className="flex items-center gap-6">
            <Link
                href={`/${slug}/search`}
                aria-label="Buscar"
                className="text-secondary/60 hover:text-primary transition-all hover:scale-110 active:scale-90"
            >
                <Search size={20} strokeWidth={2} />
            </Link>

            <Link
                href={`/login`}
                aria-label="Cuenta"
                className="text-secondary/60 hover:text-primary transition-all hover:scale-110 active:scale-90"
            >
                <User size={20} strokeWidth={2} />
            </Link>
        </div>
    );
}
