import { Trash2 } from 'lucide-react';

export function DeleteProductModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-foreground/5 text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
            <Trash2 size={32} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary">Delete Product?</h3>
            <p className="text-secondary text-sm mt-2 font-medium">This action cannot be undone.</p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <button
              disabled={isDeleting}
              onClick={onConfirm}
              className="w-full py-3.5 rounded-xl bg-red-500 text-white font-black text-xs hover:bg-red-600 transition-all active:scale-95"
            >
              {isDeleting ? 'Deleting...' : 'Yes, delete'}
            </button>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 text-xs transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
