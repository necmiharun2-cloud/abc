import { Shield, Smartphone, MessageSquare, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { chatService } from '../../services/chatService';

interface SellerCardProps {
  sellerName?: string;
  sellerAvatar?: string;
  sellerId?: string;
}

export default function SellerCard({ sellerName = 'ValoKing', sellerAvatar, sellerId }: SellerCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  const handleMessage = async () => {
    if (!user) {
      toast.error('Mesaj göndermek için giriş yapmalısınız.');
      navigate('/login');
      return;
    }

    if (!sellerId) {
      toast.error('Satıcı bilgisi bulunamadı.');
      return;
    }

    if (user.uid === sellerId) {
      toast.error('Kendinize mesaj gönderemezsiniz.');
      return;
    }

    try {
      const chatId = await chatService.createOrGetChat(user.uid, sellerId);
      navigate('/mesajlarim', { state: { activeChatId: chatId } });
    } catch (error) {
      toast.error('Sohbet başlatılamadı.');
    }
  };

  return (
    <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 uppercase">Satıcı Bilgileri</span>
        <button 
          onClick={() => handleComingSoon('Takip Et')}
          className="text-xs text-[#5b68f6] hover:text-white transition-colors flex items-center gap-1"
        >
          Takip Et
        </button>
      </div>

      {/* Profile */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={sellerAvatar || `https://picsum.photos/seed/${sellerName}/48/48`} 
                alt={sellerName} 
                className="w-12 h-12 rounded-lg object-cover" 
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#232736]"></div>
            </div>
            <div>
              <div className="text-white font-bold text-sm flex items-center gap-1.5">
                {sellerName}
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <Smartphone className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">{Math.floor(Math.random() * 5000) + 100}</div>
            <div className="text-[10px] text-gray-400">Başarılı İşlem</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          {sellerId ? (
            <Link 
              to={`/profil/${sellerId}`}
              className="flex-1 bg-[#2b3142] hover:bg-[#32394d] text-white text-xs font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
            >
              Satıcı Profili
            </Link>
          ) : (
            <button 
              onClick={() => handleComingSoon('Satıcı Profili')}
              className="flex-1 bg-[#2b3142] hover:bg-[#32394d] text-white text-xs font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
            >
              Satıcı Profili
            </button>
          )}
          <button 
            onClick={() => handleComingSoon('Sepete Ekle')}
            className="w-10 bg-[#2b3142] hover:bg-[#32394d] text-white rounded flex items-center justify-center transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button 
            onClick={handleMessage}
            className="flex-1 bg-[#2b3142] hover:bg-[#32394d] text-white text-xs font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Mesaj Gönder
          </button>
        </div>

        {/* Risk Score */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Satıcı Risk Skoru</span>
            <span className="text-emerald-500 font-medium">Düşük Risk</span>
          </div>
          <div className="h-1.5 bg-[#2b3142] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-1/4 rounded-full"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-[10px] text-gray-400 pt-4 border-t border-white/5">
          <div>Ort. Cevap: <span className="text-white font-medium">3dk</span></div>
          <div>Son Görülme: <span className="text-white font-medium">Şimdi</span></div>
        </div>
      </div>
    </div>
  );
}
