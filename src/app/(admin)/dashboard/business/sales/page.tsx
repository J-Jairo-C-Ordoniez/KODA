import Header from '@/components/dashboard/bussines/header/Header';
import Sidebar from '@/components/dashboard/bussines/sidebar/Sidebar';
import SalesClient from '@/components/dashboard/bussines/sales/SalesClient';

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
