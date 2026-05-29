import { Trash2 } from 'lucide-react';

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  title = '¿Eliminar?',
  description = 'Esta acción no se puede deshacer.',
  itemName
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title?: string;
  description?: string;
  itemName?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-background-elevated rounded-[32px] p-8 w-full max-w-sm shadow-2xl shadow-black/50 border border-foreground/8 text-center mx-4 animate-in zoom-in-95 duration-200">
        <div className="space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <Trash2 size={28} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary tracking-tight">{title}</h3>
            <p className="text-foreground-muted text-sm mt-2 font-medium leading-relaxed">
              {itemName ? <>Estás a punto de eliminar <span className="text-primary font-bold">"{itemName}"</span>. </> : null}
              {description}
            </p>
          </div>
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-3.5 rounded-2xl border border-foreground/10 font-bold text-sm text-foreground-muted hover:bg-foreground/5 hover:text-primary transition-all active:scale-95 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              disabled={isDeleting}
              onClick={onConfirm}
              className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white font-black text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Eliminando...
                </span>
              ) : 'Sí, eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
