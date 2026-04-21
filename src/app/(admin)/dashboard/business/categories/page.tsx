import Header from '@/components/dashboard/bussines/header/Header';
import Sidebar from '@/components/dashboard/bussines/sidebar/Sidebar';
import CategoryClient from '@/components/dashboard/bussines/categories/CategoryClient';

export default function CategoriesPage() {
  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <CategoryClient />
      </div>
    </div>
  );
}
