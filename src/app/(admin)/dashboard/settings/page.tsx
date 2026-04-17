import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Header from '@/components/dashboard/header/Header';
import SettingsClient from '@/components/dashboard/settings/SettingsClient';

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