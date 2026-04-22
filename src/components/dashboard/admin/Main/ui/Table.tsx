interface Column {
    accessorKey: string;
    header: string;
}

interface Row {
    [key: string]: any;
}

export default function Table({ columns, data }: { columns: Column[], data: Row[] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                        {columns.map((column) => (
                            <th
                                key={column.accessorKey}
                                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.map((row) => (
                        <tr
                            key={row.tenantId}
                            className="hover:bg-gray-50/80 transition-colors group"
                        >
                            {columns.map((column) => (
                                <td key={column.accessorKey} className="px-6 py-4 text-sm text-gray-600">
                                    {(() => {
                                        const value = row[column.accessorKey];

                                        // 1. Lógica para el Nombre del Negocio (Bold para jerarquía)
                                        if (column.accessorKey === "businessName") {
                                            return <span className="font-bold text-gray-900">{value}</span>;
                                        }

                                        // 2. Lógica para el Plan
                                        if (column.accessorKey === "plan") {
                                            return (
                                                <span className="capitalize">
                                                    {row.subscription?.plan.name || "Sin Plan"}
                                                </span>
                                            );
                                        }

                                        // 3. Lógica para el Estado (Badges funcionales)
                                        if (column.accessorKey === "status") {
                                            const statusStyles = {
                                                active: "bg-green-100 text-green-700",
                                                noVerify: "bg-orange-100 text-orange-700",
                                                suspended: "bg-red-100 text-red-700",
                                                mora: "bg-yellow-100 text-yellow-700",
                                            };
                                            return (
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyles[row.status] || "bg-gray-100"}`}>
                                                    {row.status}
                                                </span>
                                            );
                                        }

                                        // 4. Formateo de Fecha
                                        if (column.accessorKey === "registeredAt") {
                                            return new Date(row.createdAt).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            });
                                        }

                                        return value;
                                    })()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}