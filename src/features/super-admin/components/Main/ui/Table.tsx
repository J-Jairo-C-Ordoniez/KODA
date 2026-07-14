import { EllipsisVertical, Play, Pause } from "lucide-react";

interface Column {
    accessorKey: string;
    header: string;
}

interface Row {
    [key: string]: any;
}

interface TableProps {
    columns: Column[];
    data: Row[];
    isSearching: boolean;
    onStatusChange?: (tenantId: string, currentStatus: string) => void;
    onPaymentClick?: (row: any) => void;
}

export default function Table({ columns, data, isSearching, onStatusChange, onPaymentClick }: TableProps) {
    return (
        <div className={`${isSearching ? 'opacity-50 pointer-events-none' : 'opacity-100'} w-full bg-transparent lg:bg-background lg:border border-foreground/5 lg:p-6 lg:rounded-[32px] lg:shadow-sm transition-opacity duration-200 overflow-x-auto`}>
            <table className="w-full text-left lg:border-collapse border-separate border-spacing-y-4 lg:border-spacing-y-0">
                <thead className="hidden lg:table-header-group">
                    <tr className="border-b border-foreground/5">
                        {columns.map((column) => (
                            <th
                                key={column.accessorKey}
                                className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-secondary"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="flex flex-col gap-4 lg:block lg:table-row-group lg:divide-y divide-foreground/5">
                    {data.length === 0
                        ? (
                            <tr className="block lg:table-row">
                                <td colSpan={columns.length} className="block lg:table-cell text-center py-8 text-secondary font-medium bg-foreground/5 rounded-3xl border border-dashed border-foreground/10">
                                    No se encontraron negocios.
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.tenantId}
                                    className="flex flex-col lg:table-row bg-background lg:bg-transparent rounded-[24px] lg:rounded-none border border-foreground/10 lg:border-none p-5 lg:p-0 shadow-lg shadow-black/5 lg:shadow-none hover:border-contrast/30 lg:hover:bg-foreground/2 transition-all group lg:border-b"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.accessorKey}
                                            className="block lg:table-cell px-0 lg:px-6 py-3 lg:py-4 text-sm lg:text-center text-secondary border-b border-dashed border-foreground/10 lg:border-none last:border-b-0 last:pb-0 first:pt-0"
                                        >
                                            <div className="flex items-center justify-between lg:justify-center">
                                                <span className="lg:hidden text-[10px] font-black uppercase tracking-[0.15em] text-secondary/40">
                                                    {column.header}
                                                </span>
                                                <div className="text-right lg:text-center">
                                                {(() => {
                                                    const value = row[column.accessorKey];

                                                    if (column.accessorKey === "slug" || column.accessorKey === "businessName") {
                                                        return <span className="font-bold text-primary">{value}</span>;
                                                    }

                                                    if (column.accessorKey === "plan") {
                                                        return (
                                                            <span className="capitalize text-primary font-medium">
                                                                {row.subscription?.plan.name || "Sin Plan"}
                                                            </span>
                                                        );
                                                    }

                                                    if (column.accessorKey === "status") {
                                                        const statusStyles: any = {
                                                            active: "bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20",
                                                            noVerify: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
                                                            pastDue: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
                                                            suspended: "bg-red-500/10 text-red-500 border border-red-500/20",
                                                            mora: "bg-red-500/10 text-red-500 border border-red-500/20",
                                                            canceled: "bg-foreground/10 text-secondary border border-foreground/20",
                                                        };
                                                        return (
                                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${statusStyles[row.status] || "bg-foreground/5 text-secondary border border-foreground/10"}`}>
                                                                {row.status}
                                                            </span>
                                                        );
                                                    }

                                                    if (column.accessorKey === "registeredAt") {
                                                        return <span className="text-primary font-medium">{new Date(row.createdAt).toLocaleDateString("es-ES", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}</span>;
                                                    }

                                                    if (column.accessorKey === "endDate") {
                                                        if (!row.endDate) return <span className="text-foreground-muted font-medium">N/A</span>;
                                                        return <span className="text-secondary font-medium">{new Date(row.endDate).toLocaleDateString("es-ES", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}</span>;
                                                    }

                                                    if (column.accessorKey === "actions" && onStatusChange) {
                                                        const isSuspended = row.status === 'suspended';
                                                        return (
                                                            <div className="flex items-center gap-2 justify-end lg:justify-center mt-1 lg:mt-0">
                                                              <button 
                                                                onClick={() => onStatusChange(row.tenantId, row.status)}
                                                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                                  isSuspended 
                                                                    ? 'bg-[#00C896]/10 text-[#00C896] hover:bg-[#00C896]/20 shadow-sm shadow-[#00C896]/5' 
                                                                    : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 shadow-sm shadow-red-500/5'
                                                                }`}
                                                              >
                                                                {isSuspended ? <Play size={14} /> : <Pause size={14} />}
                                                                {isSuspended ? 'Activar' : 'Suspender'}
                                                              </button>
                                                            </div>
                                                        );
                                                    }
                                                    
                                                    if (column.accessorKey === "actions" && onPaymentClick) {
                                                        const isOverdue = row.status === 'mora' || row.status === 'pastDue' || row.status === 'noVerify';
                                                        return (
                                                            <div className="flex items-center gap-2 justify-end lg:justify-center mt-1 lg:mt-0">
                                                              <button 
                                                                onClick={() => onPaymentClick(row)}
                                                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                                  isOverdue
                                                                    ? 'bg-contrast text-white hover:bg-contrast-hover shadow-md shadow-contrast/20'
                                                                    : 'bg-foreground/5 text-primary hover:bg-foreground/10'
                                                                }`}
                                                              >
                                                                Registrar Pago
                                                              </button>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <button className="cursor-pointer text-secondary hover:text-primary transition-colors inline-flex">
                                                            <EllipsisVertical className="w-5 h-5" />
                                                        </button>
                                                    );
                                                })()}
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            )))}
                </tbody>
            </table>
        </div>
    )
}