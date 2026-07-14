'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function NavLeft() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentGender = searchParams.get('gender') || 'mujer';

    const handleGenderClick = (gender: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('gender', gender);
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const linkClass = (active: boolean) => `
        transition-all duration-500 relative py-2 
        ${active ? "text-primary scale-105" : "text-foreground-muted hover:text-primary"}
        text-[11px] font-black tracking-[0.2em]
    `;

    return (
        <nav className="flex items-center gap-10">
            <button
                onClick={() => handleGenderClick("mujer")}
                className={linkClass(currentGender === "mujer")}
            >
                MUJER
                {currentGender === "mujer" && (
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-contrast rounded-full shadow-[0_0_12px_rgba(255,107,0,0.5)] animate-in fade-in zoom-in duration-500" />
                )}
            </button>
            <button
                onClick={() => handleGenderClick("hombre")}
                className={linkClass(currentGender === "hombre")}
            >
                HOMBRE
                {currentGender === "hombre" && (
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-contrast rounded-full shadow-[0_0_12px_rgba(255,107,0,0.5)] animate-in fade-in zoom-in duration-500" />
                )}
            </button>
        </nav>
    );
}