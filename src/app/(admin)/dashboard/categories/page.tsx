import Header from '@/components/dashboard/header/Header';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import CategoryClient from '@/components/dashboard/categories/CategoryClient';

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
