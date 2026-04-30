'use client';

import Link from 'next/link';
import { Search, User, ShoppingBag } from 'lucide-react';

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

            <button
                aria-label="Carrito"
                className="text-secondary/60 hover:text-primary transition-all hover:scale-110 active:scale-90 relative"
            >
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-navy text-white text-[8px] font-black rounded-full flex items-center justify-center">
                    0
                </span>
            </button>
        </div>
    );
}
