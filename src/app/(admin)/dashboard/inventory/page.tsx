import Header from '@/components/dashboard/header/Header';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import InventoryClient from '@/components/dashboard/inventory/InventoryClient';

export const dynamic = 'force-dynamic';

export default function InventoryPage() {
  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <InventoryClient />
      </div>
    </div>
  );
}
