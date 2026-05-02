import { Edit2, Trash2 } from 'lucide-react';

export default function MainCategory({ handleOpenModal, categories, handleDelete, searchTerm }) {
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="overflow-x-auto -mx-2 mt-6">
            <table className="w-full min-w-[600px] lg:min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-xs font-semibold uppercase text-secondary tracking-widest text-center">
                        <th className="pb-2 px-4 w-12 text-center border-b border-primary/10">ID</th>
                        <th className="pb-2 px-2 border-b border-primary/10">Categoría</th>
                        <th className="pb-2 px-4 text-center border-b border-primary/10">Productos</th>
                        <th className="pb-2 px-4 text-right border-b border-primary/10">Acciones</th>
                    </tr>
                </thead>
                <tbody className="space-y-2">
                    {filteredCategories.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-20 text-center">
                                <p className="text-md font-medium tracking-wider text-secondary">
                                    {searchTerm ? 'No se encontraron resultados' : 'No hay categorías registradas'}
                                </p>
                            </td>
                        </tr>
                    ) : (
                        filteredCategories.map((cat) => (
                            <tr key={cat.categoryId} className="group transition-all duration-200">
                                <td className="rounded-l-xl py-3 px-4 text-xs font-bold text-center text-primary/70 group-hover:bg-primary/10 transition-colors">
                                    {cat.categoryId}
                                </td>
                                <td className="py-3 px-4 text-xs font-bold text-center text-primary/70 group-hover:bg-primary/10 transition-colors">
                                    <p className="text-primary/80 leading-relaxed text-sm tracking-wider font-medium">
                                        {cat.name}
                                    </p>
                                </td>

                                <td className="py-3 px-4 text-xs font-bold text-center text-primary/70 group-hover:bg-primary/10 transition-colors">
                                    <p className="text-primary/80 leading-relaxed text-sm tracking-wider font-semibold">
                                        {cat._count?.products || 0} producto{cat._count?.products !== 1 ? 's' : ''}
                                    </p>
                                </td>

                                <td className="rounded-r-xl py-3 px-4 text-right group-hover:bg-primary/10 transition-colors">
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
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}