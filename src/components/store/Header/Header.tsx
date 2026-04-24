'use client';

import useBreadcrumbsStore from '@/store/breadcrumbs.store';
import useFilterCatalogStore from '@/store/filterCatalog.store';
import NavLeft from '@/components/store/Header/ui/NavLeft';
import NavRight from '@/components/store/Header/ui/NavRight';
import Link from 'next/link';

interface Props {
  businessName?: string;
  slug?: string;
  tenantId?: string;
}

export default function Header({ businessName, slug, tenantId }: Props) {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const { setGender } = useFilterCatalogStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-background font-sans">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <NavLeft
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
          setGender={setGender}
          tenantId={tenantId}
        />

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link href={`/${slug}`}>
            <h1 className="text-sm md:text-base font-semibold tracking-widest text-primary whitespace-nowrap uppercase ">
              {businessName}
            </h1>
          </Link>
        </div>

        <NavRight
          setBreadcrumbsRoute={setBreadcrumbsRoute}
          slug={slug}
        />
      </div>
    </header>
  );
}
