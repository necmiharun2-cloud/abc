import TopBanner from './TopBanner';
import TopBar from './TopBar';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingChat from './FloatingChat';
import NotificationModal from './NotificationModal';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#2b3142] text-white font-sans pb-20">
      <NotificationModal />
      <TopBanner />
      <TopBar />
      <Header />
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
}
