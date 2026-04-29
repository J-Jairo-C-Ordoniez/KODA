import Header from "@/components/dashboard/business/Header/Header";
import EmployeeSidebar from "./Aside/EmployeeSidebar";
import EmployeeSales from "./Main/EmployeeSales";
import Customers from "@/components/dashboard/business/Main/customers/Customers";
import { EmployeeFloatingSaleButton } from "./ui/EmployeeFloatingSaleButton";

function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2 h-screen box-border relative">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <EmployeeSidebar />
                {children}
            </div>
            <EmployeeFloatingSaleButton />
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
