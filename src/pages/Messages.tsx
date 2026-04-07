import { Search, AlertTriangle, MessageSquarePlus, Filter, CheckCircle2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Messages() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Red Warning Banner */}
      <div className="bg-[#ff4747]/10 border border-[#ff4747]/20 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="text-[#ff4747] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-[#ff4747] font-bold">Önemli Uyarı!</h3>
          <p className="text-gray-300 text-sm">Site dışı iletişim kurmak alışveriş güvenliğini sağlayamayacağımız için <span className="text-[#ff4747] underline">yasaktır</span>.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[700px]">
        {/* Sidebar */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          <button className="w-full bg-[#5b68f6]/20 hover:bg-[#5b68f6]/30 text-[#60a5fa] py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-[#5b68f6]/30">
            <MessageSquarePlus className="w-5 h-5" />
            YENİ SOHBET OLUŞTUR
          </button>

          <div className="flex gap-2">
            <button className="bg-[#5b68f6] p-3 rounded-lg text-white hover:bg-[#4a55d6] transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Sohbet ara.." 
                className="w-full bg-[#232736] border border-white/5 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 bg-[#232736] rounded-lg border border-white/5 overflow-y-auto">
            {/* Chat Item 1 */}
            <div className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#1a1d27] flex items-center justify-center">
                  <img src="https://picsum.photos/seed/bot/40/40" alt="Bot" className="rounded-full" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-white truncate">itemSatış Bot</span>
                  <span className="text-xs text-gray-500">16:27</span>
                </div>
                <p className="text-sm text-gray-400 truncate">🎉 3 Kişiye MisBits Steam ...</p>
              </div>
            </div>

            {/* Chat Item 2 */}
            <div className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#1a1d27] flex items-center justify-center">
                  <img src="https://picsum.photos/seed/user/40/40" alt="User" className="rounded-full" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#232736]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-blue-400 truncate">Klann0</span>
                  <span className="text-xs text-gray-500">19:08</span>
                </div>
                <p className="text-sm text-gray-400 truncate">s.a buralarda mısın</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 bg-[#232736] rounded-lg border border-white/5 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-4">Önemli Bilgilendirme</h2>
          
          <div className="space-y-4 text-sm text-gray-400 max-w-2xl">
            <p>
              Mesajlaşma sistemi üzerinden size ulaşıp ilanınızı satın aldım diyen kişilere itibar etmeyiniz ve canlı desteğe raporlayınız. <span className="text-[#60a5fa] font-semibold">itemsatış sizinle hiçbir şekilde Chat, Facebook veya Instagram üzerinden iletişime geçmez!</span>
            </p>
            
            <p>
              İlanınızın satıldığını nasıl anlayabilirsiniz?<br/>
              Size ITEM SATIS başlığıyla SMS, no-reply@itemsatis.com adresinden mail ve site içerisindeki bildirimlerim sayfanızdan ulaşabileceğiniz teslimat mesajı gönderiyoruz. Bunun haricinde bir yerden gelen mesajı dikkate almayınız.
            </p>
            
            <p className="text-[#60a5fa] font-semibold">
              LÜTFEN sizinle ilanı satın aldım diyerek iletişime geçen kişilere prim vermeyiniz ve destek ekibine bildiriniz! <span className="text-gray-400 font-normal">Sizlerin de desteğiyle daima güvenli bir alışveriş platformu olmaya devam edeceğiz.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
