import Sidebar from '@/features/dashboard/business/components/sidebar/Sidebar';
import TabBar from '@/features/dashboard/business/components/sidebar/TabBar';

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden relative h-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background pb-20 lg:pb-0">
          {children}
        </div>
      </div>
      <TabBar />
    </div>
  );
}