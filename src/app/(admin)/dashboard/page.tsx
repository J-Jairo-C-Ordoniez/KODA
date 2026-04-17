import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Header from '@/components/dashboard/header/Header';
import Main from '@/components/dashboard/main/Main';

export default async function DashboardHome() {

  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}