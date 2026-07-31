'use client';

import Image from 'next/image';
import { Store } from 'lucide-react';

interface Props {
  businessName: string;
  type?: string;
  description?: string | null;
  logo?: string | null;
}

export default function AboutHero({ businessName, type, description, logo }: Props) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center gap-8 pb-12 border-b border-primary/10">
      {logo ? (
        <figure className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 border border-primary/8 m-0">
          <Image
            src={logo}
            alt={`Logotipo oficial de ${businessName}`}
            fill
            className="object-cover"
            priority
          />
        </figure>
      ) : (
        <div 
          role="img" 
          aria-label="Ícono de tienda"
          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/30 shrink-0"
        >
          <Store 
            size={36} 
            strokeWidth={1.25} 
            aria-hidden="true" 
          />
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs font-medium text-primary/40 uppercase tracking-wider">
          {type ? `Tienda de ${type}` : 'Información Oficial'}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
          {businessName}
        </h1>
        {description && (
          <p className="text-base md:text-lg font-normal text-primary/70 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
