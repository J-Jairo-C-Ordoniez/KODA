import Header from "@/features/super-admin/components/Header/Header";
import Ecosystem from "@/features/super-admin/components/Main/Ecosystem";
import Metrics from "@/features/super-admin/components/Main/Metrics";
import Subscriptions from "@/features/super-admin/components/Main/Subscriptions";
import Plans from "@/features/super-admin/components/Main/Plans";
import Sidebar from "@/features/super-admin/components/Aside/Sidebar";
import AdminBottomNav from "@/features/super-admin/components/Aside/AdminBottomNav";

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
            <div className="flex flex-1 overflow-hidden relative pb-0 lg:pb-6">
                <Sidebar />
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-background pb-20 lg:pb-0">
                    {children}
                </div>
            </div>
            <AdminBottomNav />
        </div>
    );
}
