'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/60 py-2">
            <Link href="/" className="hover:text-primary transition-colors">INICIO</Link>
            {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join('/')}`;
                const isLast = index === segments.length - 1;
                
                return (
                    <div key={href} className="flex items-center gap-2">
                        <ChevronRight size={10} className="opacity-40" />
                        {isLast ? (
                            <span className="text-primary tracking-widest">{segment}</span>
                        ) : (
                            <Link href={href} className="hover:text-primary transition-colors">{segment}</Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
