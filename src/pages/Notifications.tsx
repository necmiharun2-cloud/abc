import { Send, Bell, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Notifications() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Telegram Banner */}
      <div className="bg-[#1d2733] border border-[#2b5278] rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-[#2aabee] rounded-full flex items-center justify-center shrink-0">
          <Send className="w-6 h-6 text-white -ml-1" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Telegram Bildirimlerini Aktifleştirin!</h3>
          <p className="text-gray-400 text-sm">
            Hesabınızla alakalı tüm bildirimleri telegram üzerinden alabilirsiniz.<br/>
            Telegram hesabınız ile itemsatış üyeliğinizi eşleştirin bildirimleri daha hızlı alın, detaylı bilgi için tıklayınız.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-[600px] bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
        {/* Left Side - List */}
        <div className="w-full md:w-[350px] border-r border-white/5 flex flex-col items-center justify-center p-8 text-center bg-[#1a1d27]/50">
          <Loader2 className="w-8 h-8 text-gray-500 animate-spin mb-4" />
          <p className="text-gray-400 text-sm">
            Bildirimler yükleniyor.<br/>
            Lütfen bekleyiniz.
          </p>
        </div>

        {/* Right Side - Detail */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8b5cf6] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#8b5cf6] to-[#5b68f6] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <div className="w-24 h-24 rounded-full bg-[#232736] flex items-center justify-center">
                <Bell className="w-10 h-10 text-[#8b5cf6]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Bildirim Seçilmedi</h2>
            <p className="text-gray-400">Bildirimleri görüntülemek için menüden bildirim seçiniz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
