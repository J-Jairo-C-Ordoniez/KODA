'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) return null;

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full flex justify-center items-center gap-4 mt-24 mb-10 text-xs font-bold tracking-widest text-gray-500 uppercase">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          aria-label={`Página ${p}`}
          aria-current={p === page ? 'page' : undefined}
          className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
            p === page
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-500 text-white hover:bg-gray-400'
          }`}
        >
          {p}
        </button>
      ))}

      {page < totalPages && (
        <button
          onClick={() => setPage(page + 1)}
          aria-label="Página Siguiente"
          className="ml-4 hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
        >
          SIGUIENTE <span aria-hidden="true" className="text-xs sm:text-xs">&gt;</span>
        </button>
      )}
    </div>
  );
}

