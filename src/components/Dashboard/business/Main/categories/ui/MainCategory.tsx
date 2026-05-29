import { Edit2, Trash2 } from 'lucide-react';

export default function MainCategory({ handleOpenModal, categories, handleDelete, searchTerm }) {
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="mt-6 w-full">
            <table className="w-full text-left border-separate border-spacing-y-4 lg:border-spacing-y-2">
                <thead className="hidden lg:table-header-group">
                    <tr className="text-xs font-medium uppercase text-foreground/60 tracking-wider text-center">
                        <th className="pb-2 px-4 w-12 text-center border-b border-primary/10">ID</th>
                        <th className="pb-2 px-2 border-b border-primary/10">Categoría</th>
                        <th className="pb-2 px-4 text-center border-b border-primary/10">Productos</th>
                        <th className="pb-2 px-4 text-right border-b border-primary/10">Acciones</th>
                    </tr>
                </thead>
                <tbody className="block lg:table-row-group space-y-4 lg:space-y-0">
                    {filteredCategories.length === 0 ? (
                        <tr className="block lg:table-row">
                            <td colSpan={4} className="block lg:table-cell py-20 text-center">
                                <p className="text-md font-medium tracking-wider text-secondary">
                                    {searchTerm ? 'No se encontraron resultados' : 'No hay categorías registradas'}
                                </p>
                            </td>
                        </tr>
                    ) : (
                        filteredCategories.map((cat) => (
                            <tr key={cat.categoryId} className="group transition-all duration-200 block lg:table-row bg-foreground lg:bg-transparent rounded-2xl lg:rounded-none border border-primary/10 lg:border-none p-4 lg:p-0 shadow-sm lg:shadow-none">
                                <td className="block lg:table-cell lg:rounded-l-xl py-2 lg:py-3 px-2 lg:px-4 text-xs font-medium lg:text-center text-primary/70 lg:group-hover:bg-primary/10 transition-colors border-b border-primary/5 lg:border-none mb-2 lg:mb-0">
                                    <div className="flex items-center justify-between lg:justify-center">
                                        <span className="lg:hidden text-xs font-medium text-foreground/60">ID</span>
                                        <span>{cat.categoryId}</span>
                                    </div>
                                </td>
                                <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 text-xs lg:text-center text-primary/70 lg:group-hover:bg-primary/10 transition-colors">
                                    <div className="flex items-center justify-between lg:justify-center">
                                        <span className="lg:hidden text-xs font-medium text-foreground/60">Categoría</span>
                                        <p className="text-primary text-sm tracking-tight font-medium">
                                            {cat.name}
                                        </p>
                                    </div>
                                </td>

                                <td className="block lg:table-cell py-2 lg:py-3 px-2 lg:px-4 text-xs lg:text-center text-primary/70 lg:group-hover:bg-primary/10 transition-colors">
                                    <div className="flex items-center justify-between lg:justify-center">
                                        <span className="lg:hidden text-xs font-medium text-foreground/60">Productos</span>
                                        <p className="text-foreground/80 text-sm tracking-tight font-medium">
                                            {cat._count?.products || 0} producto{cat._count?.products !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </td>

                                <td className="block lg:table-cell lg:rounded-r-xl py-4 lg:py-3 px-2 lg:px-4 lg:text-right lg:group-hover:bg-primary/10 transition-colors border-t border-primary/5 lg:border-none mt-2 lg:mt-0">
                                    <div className="flex items-center justify-between lg:justify-end">
                                        <span className="lg:hidden text-xs font-medium text-foreground/60">Acciones</span>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(cat)}
                                                aria-label={`Editar categoría ${cat.name}`}
                                                className="cursor-pointer inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm group/btn"
                                                title="Editar"
                                            >
                                                <Edit2 className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.categoryId)}
                                                aria-label={`Eliminar categoría ${cat.name}`}
                                                className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm group/btn-danger"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}