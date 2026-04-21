import Header from '@/components/dashboard/bussines/header/Header';
import Sidebar from '@/components/dashboard/bussines/sidebar/Sidebar';
import CatalogClient from '@/components/dashboard/bussines/catalog/CatalogClient';

export const dynamic = 'force-dynamic';

export default function CatalogPage() {
  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <CatalogClient />
      </div>
    </div>
  );
}

