import Sidebar from "@/features/dashboard/employee/components/sidebar/Sidebar";
import TabBar from "@/features/dashboard/employee/components/sidebar/TabBar";

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden relative h-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background pb-30 lg:pb-0">
          {children}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
