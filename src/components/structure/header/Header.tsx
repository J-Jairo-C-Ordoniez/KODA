'use client';

import useBreadcrumbsStore from '../../../store/breadcrumbs.store';
import useFilterCatalogStore from '../../../store/filterCatalog.store';
import Link from 'next/link';
import NavLeft from './ui/NavLeft';
import NavRight from './ui/NavRight';

export default function Header() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { setGender } = useFilterCatalogStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-background font-sans">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        <NavLeft
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
          setGender={setGender}
        />

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link href="/" aria-label="Inicio, Moda y Estilo" className="text-sm md:text-base font-semibold tracking-widest text-primary whitespace-nowrap">
            <span className="hidden sm:inline">MODA Y ESTILO</span>
            <span className="sm:hidden">M & E</span>
          </Link>
        </div>

        <NavRight
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />
      </div>
    </header>
  );
}
