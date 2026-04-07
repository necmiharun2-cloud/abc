import { 
  Wallet, ArrowUpRight, ArrowDownRight, Package, Trophy, 
  ChevronDown, User, Shield, CreditCard, Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading } = useAuth();

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
            <button className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Wallet className="w-4 h-4" />
              Bakiye Yükle
            </button>
            <button className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Para Çek
            </button>
          </div>
        </div>

          {/* Navigation Menu */}
          <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
            {/* Hesap Section */}
            <div>
              <button className="w-full flex items-center justify-between p-4 bg-white/5 text-white hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 font-medium">
                  <User className="w-5 h-5 text-gray-400" />
                  Hesap
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-white bg-white/5 border-l-2 border-[#5b68f6]">
                  Hesap Özeti
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Oyuncu ID & URL <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">YENİ</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Üyelik Paketleri
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Kişisel Bilgiler
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Referanslarım
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Bağlantılı Hesaplar
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Değerlendirmelerim
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Bildirim Ayarları
                </a>
              </div>
            </div>

            {/* Profil & Görünüm Section */}
            <div>
              <button className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <div className="flex items-center gap-3 font-medium">
                  <User className="w-5 h-5" />
                  Profil & Görünüm
                </div>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Avatar
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Kapak Fotoğrafı
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Hızlı Erişim Menü
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Rozet Sergileme
                </a>
              </div>
            </div>

            {/* Güvenlik Section */}
            <div>
              <button className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <div className="flex items-center gap-3 font-medium">
                  <Shield className="w-5 h-5" />
                  Güvenlik
                </div>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Şifre Değiştir
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Mail Değiştir
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Telefon Değiştir
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Hesap Güvenliği
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Erişim Kayıtları
                </a>
              </div>
            </div>

            {/* Banka & Bakiye Section */}
            <div>
              <button className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <div className="flex items-center gap-3 font-medium">
                  <CreditCard className="w-5 h-5" />
                  Banka & Bakiye
                </div>
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
              <div className="bg-[#1a1d27] py-2">
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Banka Hesapları
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Bakiye Hareketleri
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Fatura Bilgileri
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Bakiye Kuponu
                </a>
                <a href="#" className="flex items-center gap-3 px-12 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Hediye Merkezi
                </a>
              </div>
            </div>

            {/* Kullanıcı İzinleri Section */}
            <button className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
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
