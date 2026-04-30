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

    return (
        <nav className="flex items-center gap-8 text-[11px] font-black tracking-[0.2em] text-secondary">
            <button
                onClick={() => handleGenderClick("mujer")}
                className={`transition-all duration-300 relative py-2 ${currentGender === "mujer" ? "text-primary" : "hover:text-primary"}`}
            >
                MUJER
                {currentGender === "mujer" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in slide-in-from-left-2" />}
            </button>
            <button
                onClick={() => handleGenderClick("hombre")}
                className={`transition-all duration-300 relative py-2 ${currentGender === "hombre" ? "text-primary" : "hover:text-primary"}`}
            >
                HOMBRE
                {currentGender === "hombre" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in slide-in-from-left-2" />}
            </button>
        </nav>
    );
}