import { 
  Wallet, ArrowUpRight, ArrowDownRight, Package, Trophy, 
  ChevronDown, User, Shield, CreditCard, Settings, LifeBuoy
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, loading } = useAuth();

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-[280px] shrink-0 space-y-4">
        {/* User Card */}
        <div className="bg-[#232736] rounded-xl border border-white/5 p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#5b68f6] flex items-center justify-center text-3xl text-white font-bold mb-3 border-4 border-[#1a1d27]">
            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-lg font-bold text-white">{user.displayName || 'Kullanıcı'}</h2>
          <p className="text-emerald-400 font-semibold text-lg mt-1">0.00 ₺</p>
          
          <div className="flex gap-2 w-full mt-4">
            <button 
              onClick={() => handleComingSoon('Bakiye Yükle')}
              className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Bakiye Yükle
            </button>
            <Link to="/para-cek" className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Para Çek
            </Link>
          </div>
        </div>

          {/* Navigation Menu */}
          <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
            {/* Hesap Section */}
            <div>
              <button 
                onClick={() => handleComingSoon('Hesap')}
                className="w-full flex items-center justify-between p-4 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 font-medium">
                  <User className="w-5 h-5 text-gray-400" />
                  Hesap
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <button onClick={() => handleComingSoon('Hesap Özeti')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-white bg-white/5 border-l-2 border-[#5b68f6] text-left">
                  Hesap Özeti
                </button>
                <button onClick={() => handleComingSoon('Oyuncu ID & URL')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Oyuncu ID & URL <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">YENİ</span>
                </button>
                <button onClick={() => handleComingSoon('Üyelik Paketleri')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Üyelik Paketleri
                </button>
                <button onClick={() => handleComingSoon('Kişisel Bilgiler')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Kişisel Bilgiler
                </button>
                <button onClick={() => handleComingSoon('Referanslarım')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Referanslarım
                </button>
                <button onClick={() => handleComingSoon('Bağlantılı Hesaplar')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Bağlantılı Hesaplar
                </button>
                <button onClick={() => handleComingSoon('Değerlendirmelerim')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Değerlendirmelerim
                </button>
                <button onClick={() => handleComingSoon('Bildirim Ayarları')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Bildirim Ayarları
                </button>
              </div>
            </div>

            {/* Profil & Görünüm Section */}
            <div>
              <button 
                onClick={() => handleComingSoon('Profil & Görünüm')}
                className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
              >
                <div className="flex items-center gap-3 font-medium">
                  <User className="w-5 h-5" />
                  Profil & Görünüm
                </div>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <button onClick={() => handleComingSoon('Avatar')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Avatar
                </button>
                <button onClick={() => handleComingSoon('Kapak Fotoğrafı')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Kapak Fotoğrafı
                </button>
                <button onClick={() => handleComingSoon('Hızlı Erişim Menü')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Hızlı Erişim Menü
                </button>
                <button onClick={() => handleComingSoon('Rozet Sergileme')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Rozet Sergileme
                </button>
              </div>
            </div>

            {/* Güvenlik Section */}
            <div>
              <button 
                onClick={() => handleComingSoon('Güvenlik')}
                className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
              >
                <div className="flex items-center gap-3 font-medium">
                  <Shield className="w-5 h-5" />
                  Güvenlik
                </div>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <button onClick={() => handleComingSoon('Şifre Değiştir')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Şifre Değiştir
                </button>
                <button onClick={() => handleComingSoon('Mail Değiştir')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Mail Değiştir
                </button>
                <button onClick={() => handleComingSoon('Telefon Değiştir')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Telefon Değiştir
                </button>
                <button onClick={() => handleComingSoon('Hesap Güvenliği')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Hesap Güvenliği
                </button>
                <button onClick={() => handleComingSoon('Erişim Kayıtları')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Erişim Kayıtları
                </button>
              </div>
            </div>

            {/* Banka & Bakiye Section */}
            <div>
              <button 
                onClick={() => handleComingSoon('Banka & Bakiye')}
                className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
              >
                <div className="flex items-center gap-3 font-medium">
                  <CreditCard className="w-5 h-5" />
                  Banka & Bakiye
                </div>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <button onClick={() => handleComingSoon('Banka Hesapları')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Banka Hesapları
                </button>
                <button onClick={() => handleComingSoon('Bakiye Hareketleri')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Bakiye Hareketleri
                </button>
                <button onClick={() => handleComingSoon('Fatura Bilgileri')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Fatura Bilgileri
                </button>
                <button onClick={() => handleComingSoon('Bakiye Kuponu')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Bakiye Kuponu
                </button>
                <button onClick={() => handleComingSoon('Hediye Merkezi')} className="w-full flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                  Hediye Merkezi
                </button>
              </div>
            </div>

            {/* Destek Section */}
            <div>
              <Link to="/destek-sistemi" className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <div className="flex items-center gap-3 font-medium">
                  <LifeBuoy className="w-5 h-5" />
                  Destek Sistemi
                </div>
              </Link>
            </div>

            {/* Kullanıcı İzinleri Section */}
            <button 
              onClick={() => handleComingSoon('Kullanıcı İzinleri')}
              className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
            >
              <div className="flex items-center gap-3 font-medium">
                <Settings className="w-5 h-5" />
                Kullanıcı İzinleri
              </div>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Hesap Özeti */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Hesap Özeti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Hesap Bakiyesi</p>
                <p className="text-xl font-bold text-white">0.00 ₺</p>
              </div>
            </div>
            <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Satılan Toplam İlan</p>
                <p className="text-xl font-bold text-white">0</p>
              </div>
            </div>
            <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Çekilebilir Tutar</p>
                <p className="text-xl font-bold text-white">0.00 ₺</p>
              </div>
            </div>
            <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Toplam Kazanç</p>
                <p className="text-xl font-bold text-white">0.00 ₺</p>
              </div>
            </div>
            <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Toplam Harcama Tutarı</p>
                <p className="text-xl font-bold text-white">0.00 ₺</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topluluk Özeti */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Topluluk Özeti</h2>
          <div className="bg-[#232736] p-6 rounded-xl border border-white/5 flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#1a1d27] border-4 border-blue-500 flex items-center justify-center flex-col">
                <span className="text-[10px] text-gray-400 font-bold">SEVİYE</span>
                <span className="text-2xl font-bold text-white leading-none">2</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-yellow-400">
                <Trophy className="w-6 h-6 fill-current" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">+45 EXP seviye atlamak için gerekiyor</span>
                <span className="text-gray-400">45 toplam exp</span>
              </div>
              <div className="h-2 bg-[#1a1d27] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[50%]"></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">50%</div>
            </div>
          </div>
        </div>

        {/* İlan Özeti */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">İlan Özeti</h2>
          <div className="bg-[#232736] p-12 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
            <Package className="w-16 h-16 text-yellow-500 mb-4 opacity-80" />
            <h3 className="text-lg font-bold text-white mb-2">İlan bulunamadı</h3>
            <p className="text-gray-400">Aktif ilanınız bulunmamaktadır.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
