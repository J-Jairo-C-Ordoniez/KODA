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
    transition-all duration-300 relative py-2 
    ${active ? 'text-primary font-black scale-105' : 'text-foreground-muted hover:text-primary font-bold'}
    text-[11px] tracking-[0.25em] uppercase
  `;

  return (
    <nav className="flex items-center gap-8">
      <button
        onClick={() => handleGenderClick('mujer')}
        className={linkClass(currentGender === 'mujer')}
      >
        MUJER
        {currentGender === 'mujer' && (
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-contrast rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)] animate-in fade-in zoom-in duration-300" />
        )}
      </button>
      <button
        onClick={() => handleGenderClick('hombre')}
        className={linkClass(currentGender === 'hombre')}
      >
        HOMBRE
        {currentGender === 'hombre' && (
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-contrast rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)] animate-in fade-in zoom-in duration-300" />
        )}
      </button>
    </nav>
  );
}
