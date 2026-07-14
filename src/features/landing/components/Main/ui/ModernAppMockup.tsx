import { LayoutDashboard, ShoppingBag, FolderOpen, PanelLeftClose, Search, Users, Activity } from "lucide-react";

export default function ModernAppMockup({ step }: { step: "nav" | "workspace" | "metrics" }) {
    const isMenuCollapsed = step === "workspace";

    return (
        <div className="relative flex aspect-4/3 w-full overflow-hidden rounded-xl border border-background/10 bg-background shadow-2xl">
            <nav className="flex w-10 sm:w-12 shrink-0 rounded-xl flex-col items-center bg-primary py-4 text-background z-10">
                <div className="w-6 h-6 bg-background rounded-md flex items-center justify-center transition-colors mb-6">
                    <span className="font-black text-lg text-primary">K</span>
                </div>
                <ul className="flex flex-col gap-4">
                    <li className={`cursor-pointer rounded-lg p-1.5 transition-colors ${step === "metrics" ? "bg-background/12 text-background" : "hover:text-background"}`}>
                        <LayoutDashboard size={16} />
                    </li>
                    <li className={`cursor-pointer rounded-lg p-1.5 transition-colors ${step === "workspace" ? "bg-background/12 text-background" : "hover:text-background"}`}>
                        <ShoppingBag size={16} />
                    </li>
                    <li className={`cursor-pointer rounded-lg p-1.5 transition-colors ${step === "nav" ? "bg-background/12 text-background" : "hover:text-background"}`}>
                        <FolderOpen size={16} />
                    </li>
                </ul>
            </nav>

            <aside className={`flex shrink-0 flex-col transition-all duration-500 ease-in-out 
                ${isMenuCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-32 sm:w-40 px-3 py-4 opacity-100"}`}
            >
                <div className="mb-4 flex items-center justify-between px-1 text-foreground/60">
                    <PanelLeftClose size={16} />
                </div>

                <ul className="space-y-1">
                    {["Inventario", "Categorías", "Proveedores", "Ajustes"].map((item, i) => (
                        <li
                            key={item}
                            className={`rounded-md px-2 py-1.5 text-xs font-medium ${i === 0 ? "bg-primary/8 text-primary" : "text-primary/60"}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 flex flex-col p-4 transition-all duration-500">
                <header className="mb-6">
                    <h1 className="text-sm sm:text-base font-bold text-foreground">
                        {step === "nav" ? "Gestión de Inventario" : step === "workspace" ? "Punto de Venta" : "Resumen del Negocio"}
                    </h1>
                    <p className="text-xs text-foreground/60">
                        {step === "nav" ? "Organiza tus productos fácilmente" : step === "workspace" ? "Espacio libre de distracciones" : "Métricas en tiempo real"}
                    </p>
                </header>

                <div className="flex-1">
                    {step === "nav" && (
                        <div className="flex h-full flex-col gap-3">
                            <div className="h-8 w-full rounded bg-primary/8" />
                            <div className="h-8 w-3/4 rounded bg-primary/8" />
                            <div className="h-8 w-1/2 rounded bg-primary/8" />
                        </div>
                    )}

                    {step === "workspace" && (
                        <div className="flex h-full gap-4">
                            <p className="flex-1 rounded-md bg-primary/5 p-4 border border-dashed border-primary/15 flex items-center justify-center text-xs text-primary">
                                Selecciona productos para cobrar
                            </p>
                            <div className="w-1/3 rounded-md bg-primary/5 border border-primary/10 p-3 flex flex-col justify-between">
                                <span className="text-xs font-bold text-primary uppercase">
                                    Factura actual
                                </span>
                                <button className="w-full rounded bg-primary py-1.5 text-xs font-bold text-background">
                                    Cobrar $0
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "metrics" && (
                        <div className="grid h-full grid-cols-2 gap-3">
                            <div className="rounded-md bg-primary/5 p-4">
                                <Activity
                                    size={20}
                                    className="text-primary mb-3"
                                />
                                <div className="h-6 w-1/2 rounded bg-primary/10 mb-2" />
                                <div className="h-4 w-1/3 rounded bg-primary/10" />
                            </div>

                            <div className="rounded-md bg-primary/5 p-4">
                                <Users
                                    size={20}
                                    className="text-primary mb-3"
                                />
                                <div className="h-4 w-1/3 rounded bg-primary/10" />
                            </div>

                            <div className="col-span-2 rounded-md bg-primary/5 p-3 flex items-end gap-1">
                                {[40, 70, 45, 90, 65].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-full bg-primary/40 rounded-t-sm"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}