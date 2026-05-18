import Header from '@/components/dashboard/business/Header/Header';
import Sidebar from '@/components/dashboard/business/Aside/Sidebar';
import { FloatingSaleButton } from '@/components/dashboard/business/ui/FloatingSaleButton';

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden relative pb-6">
        <Sidebar />
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
          {children}
        </div>
      </div>
      <FloatingSaleButton />
    </div>
  );
}
