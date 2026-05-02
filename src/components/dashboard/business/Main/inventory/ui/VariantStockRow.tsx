import { Minus, Plus, CheckCircle2, Layers } from 'lucide-react';
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
      className={`group bg-background border rounded-2xl p-3 flex items-center gap-4 transition-all hover:bg-foreground/1 ${
        isEmpty ? 'border-red-100' : 
        isLow ? 'border-amber-100' : 
        'border-foreground/5'
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-navy/5 overflow-hidden flex items-center justify-center shrink-0 border border-foreground/5">
        {variant.images?.[0] ? (
          <img src={variant.images[0].content} className="w-full h-full object-cover" alt={variant.name} />
        ) : (
          <Layers size={16} className="text-navy/50" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm text-primary truncate">{variant.name}</p>
          {isEmpty && <span className="text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-red-500 text-white rounded-md">Vacío</span>}
          {isLow && !isEmpty && <span className="text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-amber-500 text-white rounded-md">Bajo</span>}
        </div>
        <p className="text-xs font-bold text-secondary uppercase tracking-wider opacity-60">
          {variant.sku} · {variant.color} / {variant.size}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-foreground/5 p-1 rounded-xl">
          <button 
            onClick={() => onStockChange(variant.variantId, currentStock, -1)}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy transition-all active:scale-90 text-secondary"
            aria-label="Disminuir stock"
          >
            <Minus size={14} />
          </button>
          
          <input 
            type="number"
            value={displayStock}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) onStockInput(variant.variantId, Math.max(0, val));
            }}
            className="w-10 text-center bg-transparent font-black text-primary outline-none text-sm"
            aria-label="Cantidad de stock"
          />

          <button 
            onClick={() => onStockChange(variant.variantId, currentStock, 1)}
            className="p-1.5 rounded-lg hover:bg-white hover:text-navy transition-all active:scale-90 text-secondary"
            aria-label="Aumentar stock"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="w-20">
          {hasChanges ? (
            <button 
              onClick={() => onSaveStock(variant.variantId)}
              disabled={isSaving}
              className="w-full py-2 rounded-xl bg-navy text-white font-black text-[10px] uppercase tracking-widest shadow-md shadow-navy/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              {isSaving ? <Loader size="xs" color="border-white" /> : 'Guardar'}
            </button>
          ) : (
            <div className="text-center opacity-20">
              <CheckCircle2 size={14} className="mx-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
