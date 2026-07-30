'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '@/shared/components/Button';

interface Props {
  message?: string;
}

export default function ProductGridError({ message }: Props) {
  return (
    <div className="w-full py-24 my-8 flex flex-col items-center justify-center gap-5 text-center">
      <span className="w-12 h-12 rounded-2xl bg-red-500/8 border border-red-500/15 flex items-center justify-center text-red-500/60">
        <AlertTriangle
          size={24}
          strokeWidth={1.5}
        />
      </span>

      <div className="space-y-2">
        <h3 className="text-base font-medium text-primary tracking-tight">
          Ocurrió un inconveniente
        </h3>
        <p className="text-sm text-primary/60 leading-relaxed max-w-xs">
          {message || 'No se pudo cargar el catálogo de la tienda.'}
        </p>
      </div>

      <Button
        onClick={() => window.location.reload()}
        variant='primary'
      >
        <RefreshCw size={18} />
        <span>Reintentar</span>
      </Button>
    </div>
  );
}
