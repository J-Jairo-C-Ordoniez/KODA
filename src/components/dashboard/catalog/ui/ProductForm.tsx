export default function ProductForm({ editingProduct, categories, onSubmit, onCancel, loading, error }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    };

    const inputClasses = "text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm bg-transparent focus:outline-none focus:border-secondary/60 transition-colors cursor-pointer appearance-none";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                    <p className="text-sm font-medium tracking-wider">{error}</p>
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-wider text-primary/90">
                    Nombre del producto
                </label>
                <input
                    required
                    name="name"
                    defaultValue={editingProduct?.name}
                    className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent"
                    placeholder="Ej: Camiseta Oversized..."
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-wider text-primary/90">
                    Descripción
                </label>
                <textarea
                    required
                    name="description"
                    defaultValue={editingProduct?.description}
                    className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent min-h-[100px]"
                    placeholder="Describe las características principales..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Categoría
                    </label>
                    <div className="relative">
                        <select
                            required
                            name="categoryId"
                            defaultValue={editingProduct?.categoryId}
                            className={inputClasses}
                        >
                            <option value="" className="bg-foreground text-primary">Seleccione...</option>
                            {categories.map(c => (
                                <option key={c.categoryId} value={c.categoryId} className="bg-foreground text-primary">
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary/50">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Género
                    </label>
                    <div className="relative">
                        <select
                            required
                            name="gender"
                            defaultValue={editingProduct?.gender || 'mixto'}
                            className={inputClasses}
                        >
                            <option value="hombre" className="bg-foreground text-primary">Hombre</option>
                            <option value="mujer" className="bg-foreground text-primary">Mujer</option>
                            <option value="mixto" className="bg-foreground text-primary">Mixto</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary/50">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>
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
                    disabled={loading}
                    className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    {loading ? 'Procesando...' : 'Guardar Producto'}
                </button>
            </div>
        </form>
    );
}