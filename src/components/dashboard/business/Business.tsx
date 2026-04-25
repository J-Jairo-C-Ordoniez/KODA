import Overview from "@/components/dashboard/business/Main/Overview";
import Categories from "@/components/dashboard/business/Main/categories/Categories";
import Header from "@/components/dashboard/business/Header/Header";
import Sidebar from "@/components/dashboard/business/Aside/Sidebar";
import Catalog from "@/components/dashboard/business/Main/catalog/Catalog";

export function OverviewP() {
    return (
        <div className="grid grid-cols-2 h-screen box-border">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <Sidebar />
                <Overview />
            </div>
        </div>
    );
}

export function CategoriesP() {
    return (
        <div className="grid grid-cols-2 h-screen box-border">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <Sidebar />
                <Categories />
            </div>
        </div>
    );
}

export function CatalogP() {
    return (
        <div className="grid grid-cols-2 h-screen box-border">
            <Header />
            <div className="col-span-full flex h-[calc(100vh-5rem)]">
                <Sidebar />
                <Catalog />
            </div>
        </div>
    );
}