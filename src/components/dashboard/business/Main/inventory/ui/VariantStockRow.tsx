'use client';

import { Minus, Plus, CheckCircle2, Layers, Check } from 'lucide-react';
import Loader from '@/components/ui/Loader';

const LOW_STOCK_THRESHOLD = 5;

interface VariantStockRowProps {
  variant: any;
  currentStock: number;
  editedStock: number | undefined;
  isSaving: boolean;
  onStockChange: (variantId: string, current: number, delta: number) => void;
  onStockInput: (variantId: string, val: number) => void;
  onSaveStock: (variantId: string) => void;
}

export function VariantStockRow({
  variant,
  currentStock,
  editedStock,
  isSaving,
  onStockChange,
  onStockInput,
  onSaveStock
}: VariantStockRowProps) {
  const displayStock = editedStock !== undefined ? editedStock : currentStock;
  const isLow = displayStock > 0 && displayStock < LOW_STOCK_THRESHOLD;
  const isEmpty = displayStock === 0;
  const hasChanges = editedStock !== undefined && editedStock !== currentStock;

  return (
    <div 
      className={`
        group relative p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 border rounded-3xl
        ${isEmpty ? 'bg-red-500/3 border-red-500/10 hover:border-red-500/30' : 
          isLow ? 'bg-amber-500/3 border-amber-500/10 hover:border-amber-500/30' : 
          'bg-background-elevated border-foreground/8 hover:border-foreground/20 hover:bg-foreground/2'
        }
      `}
    >
      {/* Ambient glow for low/empty stock */}
      {(isEmpty || isLow) && (
        <div className={`absolute -inset-px rounded-3xl pointer-events-none opacity-20 transition-opacity group-hover:opacity-40 ${isEmpty ? 'shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'shadow-[0_0_20px_rgba(245,158,11,0.2)]'}`} />
      )}

      {/* Image Container */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-background border border-foreground/8 overflow-hidden flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
          {variant.images?.[0] ? (
            <img src={variant.images[0].content} className="w-full h-full object-cover" alt={variant.name} />
          ) : (
            <Layers size={20} className="text-foreground-muted/30" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-black text-sm text-primary tracking-tight truncate">{variant.name}</p>
            {isEmpty && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg">
                Sin Stock
              </span>
            )}
            {isLow && !isEmpty && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
                Stock Bajo
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider mt-0.5">
            {variant.sku} <span className="opacity-30 mx-1">/</span> {variant.color} <span className="opacity-30 mx-1">·</span> {variant.size}
          </p>
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex items-center justify-between sm:justify-end gap-6 sm:ml-auto w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-foreground/5">
        <div className="flex items-center gap-1.5 bg-background p-1.5 rounded-2xl border border-foreground/10 shadow-sm">
          <button 
            onClick={() => onStockChange(variant.variantId, currentStock, -1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-foreground/5 text-foreground-muted hover:text-primary transition-all active:scale-90"
            aria-label="Disminuir stock"
          >
            <Minus size={16} />
          </button>
          
          <input 
            type="number"
            value={displayStock}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) onStockInput(variant.variantId, Math.max(0, val));
            }}
            className="w-12 text-center bg-transparent font-black text-primary outline-none text-base"
            aria-label="Cantidad de stock"
          />

          <button 
            onClick={() => onStockChange(variant.variantId, currentStock, 1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-foreground/5 text-foreground-muted hover:text-primary transition-all active:scale-90"
            aria-label="Aumentar stock"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="w-28 shrink-0">
          {hasChanges ? (
            <button 
              onClick={() => onSaveStock(variant.variantId)}
              disabled={isSaving}
              className="w-full py-2.5 px-4 rounded-2xl bg-contrast text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-contrast/20 hover:bg-contrast-hover active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader size="xs" color="border-white" /> : <><Check size={14} /> Guardar</>}
            </button>
          ) : (
            <div className="flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 size={18} className="text-success" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
