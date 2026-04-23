import { EllipsisVertical } from "lucide-react";

interface Column {
    accessorKey: string;
    header: string;
}

interface Row {
    [key: string]: any;
}

export default function Table({ columns, data, isSearching }: { columns: Column[], data: Row[], isSearching: boolean }) {
    return (
        <div className={`${isSearching ? 'opacity-50 pointer-events-none' : 'opacity-100'} overflow-x-auto bg-background border border-foreground/5 p-6 rounded-[32px] shadow-sm flex items-center gap-6 transition-opacity duration-200`}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        {columns.map((column) => (
                            <th
                                key={column.accessorKey}
                                className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.length === 0
                        ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-gray-600">
                                    No se encontraron negocios.
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.tenantId}
                                    className="hover:bg-gray-50/80 transition-colors group border-b border-gray-200"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.accessorKey}
                                            className="px-6 py-4 text-sm text-center text-gray-600"
                                        >
                                            {(() => {
                                                const value = row[column.accessorKey];

                                                if (column.accessorKey === "slug") {
                                                    return <span className="font-bold text-gray-900">{value}</span>;
                                                }

                                                if (column.accessorKey === "businessName") {
                                                    return <span className="font-bold text-gray-900">{value}</span>;
                                                }

                                                if (column.accessorKey === "plan") {
                                                    return (
                                                        <span className="capitalize">
                                                            {row.subscription?.plan.name || "Sin Plan"}
                                                        </span>
                                                    );
                                                }

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

                                                if (column.accessorKey === "registeredAt") {
                                                    return new Date(row.createdAt).toLocaleDateString("es-ES", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    });
                                                }

                                                return (
                                                    <span className="px-6 py-4 text-sm text-gray-600">
                                                        <button className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
                                                            <EllipsisVertical className="w-5 h-5" />
                                                        </button>
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                    ))}
                                </tr>
                            )))}
                </tbody>
            </table>
        </div>
    )
}