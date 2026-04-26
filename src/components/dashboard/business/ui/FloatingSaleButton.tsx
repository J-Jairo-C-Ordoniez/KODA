'use client';

import { DollarSign, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FloatingSaleButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard/business/sales?newSale=true');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-[60] flex items-center gap-3 bg-navy text-white px-6 py-4 rounded-3xl shadow-2xl shadow-navy/30 hover:scale-[1.05] hover:bg-navy/90 active:scale-95 transition-all group"
    >
      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform">
        <Plus size={20} />
      </div>
      <span className="font-black text-sm tracking-tight">Registrar Venta</span>
    </button>
  );
}
