import Header from "@/components/Dashboard/business/Header/Header";
import EmployeeSidebar from "./Aside/EmployeeSidebar";
import EmployeeSales from "./Main/EmployeeSales";
import Customers from "@/components/Dashboard/business/Main/customers/Customers";
import { EmployeeFloatingSaleButton } from "./ui/EmployeeFloatingSaleButton";
import EmployeeBottomNav from "./Aside/EmployeeBottomNav";

function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden relative pb-0 lg:pb-6">
                <EmployeeSidebar />
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-background pb-20 lg:pb-0">
                    {children}
                </div>
            </div>
            <EmployeeFloatingSaleButton />
            <EmployeeBottomNav />
        </div>
    );
}

export function EmployeeSalesP() {
    return (
        <EmployeeDashboardLayout>
            <EmployeeSales />
        </EmployeeDashboardLayout>
    );
}

export function EmployeeCustomersP() {
    return (
        <EmployeeDashboardLayout>
            <Customers />
        </EmployeeDashboardLayout>
    );
}
