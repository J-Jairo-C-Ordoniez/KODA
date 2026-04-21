import Header from "@/components/dashboard/admin/Header/Header";
import Ecosystem from "@/components/dashboard/admin/Main/Ecosystem";
import Metrics from "@/components/dashboard/admin/Main/Metrics";
import Sidebar from "@/components/dashboard/admin/Aside/Sidebar";

export function MetricsP() {
    return (
        <div className="grid grid-cols-2 h-screen box-border">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <Sidebar />
                <Metrics />
            </div>
        </div>
    );
}

export function EcoP() {
    return (
        <div className="grid grid-cols-2 h-screen box-border">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <Sidebar />
                <Ecosystem />
            </div>
        </div>
    );
}