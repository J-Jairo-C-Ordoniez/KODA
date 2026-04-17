import Header from '@/components/dashboard/header/Header';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import SalesClient from '@/components/dashboard/sales/SalesClient';

export const dynamic = 'force-dynamic';

export default function SalesPage() {
  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <SalesClient />
      </div>
    </div>
  );
}
