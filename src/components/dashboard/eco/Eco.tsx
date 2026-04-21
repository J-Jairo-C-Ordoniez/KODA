import Header from "@/components/dashboard/eco/Header/Header";
import Ecosystem from "@/components/dashboard/eco/Main/Ecosystem";
import Sidebar from "@/components/dashboard/eco/Aside/Sidebar";

export function Eco() {
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