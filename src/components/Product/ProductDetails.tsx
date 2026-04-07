import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  return (
    <div className="space-y-4">
      {/* Price History & Alternatives */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#232736] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-sm text-white font-medium mb-6">
            <svg className="w-4 h-4 text-[#5b68f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            Son 30 Gün Fiyat Geçmişi
          </div>
          <div className="h-24 flex items-end gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex-1 bg-[#2b3142] rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-2">
            <span>1 Ay Önce</span>
            <span>Bugün</span>
          </div>
        </div>

        <div className="bg-[#232736] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-sm text-white font-medium mb-4">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            Akıllı Alternatif Önerileri
          </div>
          <div className="space-y-3">
            <div 
              onClick={() => handleComingSoon('Alternatif Ürün')}
              className="bg-[#2b3142] rounded p-3 flex justify-between items-center cursor-pointer hover:bg-[#32394d] transition-colors"
            >
              <div>
                <div className="text-xs text-white font-medium">Daha Hızlı Teslimat Yapan Satıcı</div>
                <div className="text-[10px] text-gray-400">Ort. Yanıt: 2dk • FastSeller</div>
              </div>
              <div className="text-emerald-500 font-bold text-sm">65,00 ₺</div>
            </div>
            <div 
              onClick={() => handleComingSoon('Alternatif Ürün')}
              className="bg-[#2b3142] rounded p-3 flex justify-between items-center cursor-pointer hover:bg-[#32394d] transition-colors"
            >
              <div>
                <div className="text-xs text-white font-medium">Daha Güvenilir Satıcı (Risk: 0)</div>
                <div className="text-[10px] text-gray-400">10.000+ İşlem • ProSeller</div>
              </div>
              <div className="text-[#5b68f6] font-bold text-sm">62,50 ₺</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
        <div className="flex border-b border-white/5">
          <button className="flex-1 py-4 text-sm font-medium bg-[#5b68f6] text-white">
            Açıklama
          </button>
          <button 
            onClick={() => handleComingSoon('Değerlendirmeler')}
            className="flex-1 py-4 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2b3142] transition-colors"
          >
            Değerlendirme
          </button>
          <button 
            onClick={() => handleComingSoon('Güvenli Ticaret')}
            className="flex-1 py-4 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2b3142] transition-colors"
          >
            Güvenli Ticaret
          </button>
          <button 
            onClick={() => handleComingSoon('Soru & Cevap')}
            className="flex-1 py-4 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2b3142] transition-colors"
          >
            Soru & Cevap
          </button>
        </div>

        <div className="p-6">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#2b3142] p-4 rounded-lg">
              <div className="text-[10px] text-[#5b68f6] font-medium mb-1">Gönderim Süresi</div>
              <div className="text-white font-bold">1-24 Saat</div>
            </div>
            <div className="bg-[#2b3142] p-4 rounded-lg">
              <div className="text-[10px] text-[#5b68f6] font-medium mb-1">Garanti Süresi</div>
              <div className="text-white font-bold">7 Gün</div>
            </div>
            <div className="bg-[#2b3142] p-4 rounded-lg">
              <div className="text-[10px] text-[#5b68f6] font-medium mb-1">Gönderim Lokasyonu</div>
              <div className="text-white font-bold">Karışık</div>
            </div>
          </div>

          {/* Description Content */}
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="text-white font-bold underline underline-offset-4 mb-4">Youtube 1000 izlenme ilanımıza Hoşgeldiniz.</h3>
              
              <div className="text-red-500 font-bold mb-2">📌 Nasıl Teslim Edilir?</div>
              <p className="text-white font-medium mb-2">İlanımızı Satın Aldığınızda Bize İlettiğiniz Link Gelir, O Linke Gönderimi Sağlarız.</p>
              <p className="text-red-500 font-medium">Youtube İlanlarında Hesabınızın Gizli Olmaması Gerekir. Şayet Bu Gönderimi İmkansız Hale Kılar ve Gönderimi İptal Edemediğim İçin İade Olmaz.</p>
            </div>

            <div>
              <div className="text-yellow-500 font-bold mb-2">😱 Sorun Yaşadım:</div>
              <p className="text-[#5b68f6] font-medium">Sorun Yaşadığınız Takdirde Kişisel Olarak Sorununuzla İlgileniyorum, Eğer Sorunu Çözemiyorsam Anında İadenizi Veriyorum.</p>
            </div>

            <div>
              <div className="text-yellow-500 font-bold mb-2">😉 Peki Niye Bu İlan:</div>
              <p className="text-white font-medium">Kaliteden Ödün Vermeden Olabilecek En Ucuz Fiyattan Satış Sağlamaya Çalışıyorum, Bende Bir İnsan ve Yeri Geldiğinde Bir Müşteri oluyorum.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discord Banner */}
      <div className="bg-[#232736] rounded-xl p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm">D</div>
            <span className="text-white font-medium text-sm">Discord Mağaza Sunucumuz Aktif!</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Duyurular ve sohbet için hemen Discord sunucumuza katılın!</h3>
          <p className="text-gray-400 text-sm mb-6">En yeni ilan duyuruları, özel kampanyalar ve 7/24 destek için mağaza Discord kanalımızda olun.</p>
          <button 
            onClick={() => handleComingSoon('Discord Sunucusuna Katıl')}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Hemen Katıl!
          </button>
        </div>
      </div>
    </div>
  );
}
