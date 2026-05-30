import Header from "@/components/Dashboard/admin/Header/Header";
import Ecosystem from "@/components/Dashboard/admin/Main/Ecosystem";
import Metrics from "@/components/Dashboard/admin/Main/Metrics";
import Subscriptions from "@/components/Dashboard/admin/Main/Subscriptions";
import Plans from "@/components/Dashboard/admin/Main/Plans";
import Sidebar from "@/components/Dashboard/admin/Aside/Sidebar";

export function MetricsP() {
    return (
        <DashboardLayout>
            <Metrics />
        </DashboardLayout>
    );
}

export function EcoP() {
    return (
        <DashboardLayout>
            <Ecosystem />
        </DashboardLayout>
    );
}

export function BillingP() {
    return (
        <DashboardLayout>
            <Subscriptions />
        </DashboardLayout>
    );
}

export function PlansP() {
    return (
        <DashboardLayout>
            <Plans />
        </DashboardLayout>
    );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden relative pb-6">
                <Sidebar />
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
                    {children}
                </div>
            </div>
        </div>
    );
}
