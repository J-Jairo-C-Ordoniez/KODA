'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FloatingSaleButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/dashboard/business/sales?newSale=true')}
      aria-label="Registrar nueva venta"
      className="fixed bottom-6 right-4 sm:right-8 z-[60] flex items-center gap-3 bg-contrast text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-2xl shadow-contrast/30 hover:scale-[1.05] hover:bg-contrast-hover active:scale-95 transition-all duration-200 group"
    >
      <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300" aria-hidden="true">
        <Plus size={18} />
      </div>
      <span className="font-black text-sm tracking-widest uppercase">Registrar Venta</span>
    </button>
  );
}
