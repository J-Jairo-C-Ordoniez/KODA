import { Tag, X, Trash2 } from 'lucide-react';

export function CategoryFormModal({
  isOpen,
  onClose,
  editingCategory,
  newCat,
  setNewCat,
  onSubmit,
  isSaving
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background rounded-[40px] p-10 w-full max-w-md shadow-2xl shadow-navy/20 border border-white/20 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-foreground/5 text-secondary transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-navy/10 flex items-center justify-center shadow-inner">
            <Tag size={32} className="text-navy" />
          </div>

            <div>
              <h3 className="text-2xl font-black text-primary tracking-tight">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <p className="text-secondary font-medium text-sm">
                {editingCategory ? 'Actualiza los detalles de esta categoría.' : 'Define los detalles para organizar tu inventario.'}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Nombre</label>
                <input
                  autoFocus
                  type="text"
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary placeholder:font-medium bg-foreground/2"
                  placeholder="Ej. Calzado, Accesorios..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Descripción (Opcional)</label>
                <textarea
                  rows={4}
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-foreground/10 focus:border-navy focus:ring-4 focus:ring-navy/5 outline-none transition-all font-bold text-primary placeholder:font-medium bg-foreground/2 resize-none"
                  placeholder="Breve descripción de la categoría..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl border border-foreground/10 font-bold text-secondary hover:bg-foreground/5 transition-all active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !newCat.name.trim()}
                  className="flex-1 py-4 rounded-2xl bg-navy text-white font-black hover:bg-navy/90 disabled:opacity-50 transition-all shadow-xl shadow-navy/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSaving ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export function DeleteCategoryModal({
    isOpen,
    onClose,
    categoryToDelete,
    onConfirm,
    isDeleting
  }: any) {
    if (!isOpen || !categoryToDelete) return null;

    return (
      <div className="fixed inset-0 bg-red-600/10 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-background rounded-[40px] p-10 w-full max-w-sm shadow-2xl shadow-red-600/10 border border-white/20 relative overflow-hidden text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-[30px] bg-red-50 flex items-center justify-center mx-auto shadow-inner">
              <Trash2 size={40} className="text-red-500" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-primary tracking-tight">¿Eliminar Categoría?</h3>
              <p className="text-secondary font-medium text-sm mt-2">
                Estás a punto de eliminar <span className="text-primary font-bold">"{categoryToDelete?.name}"</span>. Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                disabled={isDeleting}
                onClick={onConfirm}
                className="w-full py-4 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                {isDeleting ? 'Eliminando...' : 'Sí, eliminar categoría'}
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
