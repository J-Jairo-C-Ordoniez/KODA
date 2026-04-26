import Overview from "@/components/dashboard/business/Main/Overview";
import Categories from "@/components/dashboard/business/Main/categories/Categories";
import Header from "@/components/dashboard/business/Header/Header";
import Sidebar from "@/components/dashboard/business/Aside/Sidebar";
import Catalog from "@/components/dashboard/business/Main/catalog/Catalog";
import Sales from "@/components/dashboard/business/Main/sales/Sales";
import Customers from "@/components/dashboard/business/Main/customers/Customers";
import Inventory from "@/components/dashboard/business/Main/inventory/Inventory";
import Settings from "@/components/dashboard/business/Main/settings/Settings";
import { FloatingSaleButton } from "./ui/FloatingSaleButton";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2 h-screen box-border relative">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <Sidebar />
                {children}
            </div>
            <FloatingSaleButton />
        </div>
    );
}

export function OverviewP() {
    return (
        <DashboardLayout>
            <Overview />
        </DashboardLayout>
    );
}

export function CategoriesP() {
    return (
        <DashboardLayout>
            <Categories />
        </DashboardLayout>
    );
}

export function CatalogP() {
    return (
        <DashboardLayout>
            <Catalog />
        </DashboardLayout>
    );
}

export function SalesP() {
    return (
        <DashboardLayout>
            <Sales />
        </DashboardLayout>
    );
}

export function CustomersP() {
    return (
        <DashboardLayout>
            <Customers />
        </DashboardLayout>
    );
}

export function InventoryP() {
    return (
        <DashboardLayout>
            <Inventory />
        </DashboardLayout>
    );
}

export function SettingsP() {
    return (
        <DashboardLayout>
            <Settings />
        </DashboardLayout>
    );
}