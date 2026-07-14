import Header from '@/components/Dashboard/business/Header/Header';
import Sidebar from '@/components/Dashboard/business/Aside/Sidebar';
import { FloatingSaleButton } from '@/components/Dashboard/business/ui/FloatingSaleButton';
import BusinessBottomNav from '@/components/Dashboard/business/Aside/BusinessBottomNav';

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden relative h-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background pb-20 lg:pb-0">
          {children}
        </div>
      </div>
      <FloatingSaleButton />
      <BusinessBottomNav />
    </div>
  );
}
