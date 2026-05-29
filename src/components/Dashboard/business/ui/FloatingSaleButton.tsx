'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FloatingSaleButton() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <button
      onClick={() => router.push('/dashboard/business/sales?newSale=true')}
      aria-label="Registrar nueva venta"
      title="Registrar nueva venta"
      className="fixed bottom-6 right-5 sm:right-8 z-60 flex items-center gap-2.5 bg-contrast/90 hover:bg-contrast text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-lg shadow-contrast/20 hover:shadow-contrast/30 hover:scale-[1.04] active:scale-95 transition-all duration-200 backdrop-blur-sm"
    >
      <Plus size={17} aria-hidden="true" strokeWidth={2.5} />
      <span className="hidden sm:block font-black text-xs tracking-widest uppercase">
        Nueva venta
      </span>
    </button>
  );
}
