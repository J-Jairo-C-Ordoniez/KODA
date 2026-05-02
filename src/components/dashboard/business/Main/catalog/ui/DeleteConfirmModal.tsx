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
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-md z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] p-10 w-full max-w-sm shadow-2xl border border-foreground/5 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 rounded-[30px] bg-red-50 flex items-center justify-center mx-auto shadow-inner">
            <Trash2 size={40} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-primary tracking-tight">{title}</h3>
            <p className="text-secondary text-sm mt-2 font-medium leading-relaxed">
              {itemName ? <>Estás a punto de eliminar <span className="text-primary font-bold">"{itemName}"</span>. </> : null}
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button
              disabled={isDeleting}
              onClick={onConfirm}
              className="w-full py-4 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
