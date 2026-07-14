import { useState } from 'react';

export default function CategoryForm({ editingCategory, onSubmit, initialName, submitting, error, onCancel }) {
    const [name, setName] = useState(initialName || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                    <p className="text-sm font-medium tracking-wider">{error || 'Ha ocurrido un error, intenta de nuevo'}</p>
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-wider text-primary/90">
                    Nombre de la categoría
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors"
                    placeholder="Ej: Camisetas, Pantalones..."
                    autoFocus
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 text-secondary px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    {submitting ? 'Procesando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}
