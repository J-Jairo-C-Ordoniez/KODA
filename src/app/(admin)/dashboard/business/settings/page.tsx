import Sidebar from '@/components/dashboard/bussines/sidebar/Sidebar';
import Header from '@/components/dashboard/bussines/header/Header';
import SettingsClient from '@/components/dashboard/bussines/settings/SettingsClient';

export default function SettingsPage() {
  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <SettingsClient />
      </div>
    </div>

  );
}