import { Heart, Star, Bell, ShieldCheck, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoriSistemi() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Heart className="w-4 h-4 fill-current" />
          Favori Sistemi
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Sevdiğiniz İlanları <span className="text-pink-500">Asla Kaçırmayın</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          İtemsatış favori sistemi ile takip etmek istediğiniz ilanları kaydedin, fiyat değişimlerinden anında haberdar olun.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#232736] p-8 rounded-2xl border border-white/5 space-y-4 hover:border-pink-500/30 transition-all group">
          <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bell className="w-7 h-7 text-pink-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Fiyat Takibi</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Favoriye eklediğiniz bir ilanın fiyatı düştüğünde size anında bildirim gönderiyoruz. Böylece en iyi fırsatları yakalarsınız.
          </p>
        </div>

        <div className="bg-[#232736] p-8 rounded-2xl border border-white/5 space-y-4 hover:border-pink-500/30 transition-all group">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Stok Bildirimleri</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Stoku biten ürünler tekrar stoka girdiğinde ilk sizin haberiniz olsun. Popüler ürünleri kaçırma riskini ortadan kaldırın.
          </p>
        </div>

        <div className="bg-[#232736] p-8 rounded-2xl border border-white/5 space-y-4 hover:border-pink-500/30 transition-all group">
          <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Hızlı Erişim</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Binlerce ilan arasında kaybolmayın. Beğendiğiniz ilanlara profilinizdeki "Favorilerim" sekmesinden tek tıkla ulaşın.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[#232736] rounded-3xl p-10 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">Nasıl Kullanılır?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-4 relative">
            <div className="w-12 h-12 bg-[#1a1d27] rounded-full flex items-center justify-center mx-auto text-white font-bold border border-white/10">1</div>
            <h4 className="font-bold text-white">İlanı Bulun</h4>
            <p className="text-xs text-gray-500">İlginizi çeken bir ilan bulun.</p>
            <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-white/10"></div>
          </div>
          <div className="text-center space-y-4 relative">
            <div className="w-12 h-12 bg-[#1a1d27] rounded-full flex items-center justify-center mx-auto text-white font-bold border border-white/10">2</div>
            <h4 className="font-bold text-white">Kalbe Tıklayın</h4>
            <p className="text-xs text-gray-500">İlan kartındaki kalp simgesine basın.</p>
            <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-white/10"></div>
          </div>
          <div className="text-center space-y-4 relative">
            <div className="w-12 h-12 bg-[#1a1d27] rounded-full flex items-center justify-center mx-auto text-white font-bold border border-white/10">3</div>
            <h4 className="font-bold text-white">Kaydedildi!</h4>
            <p className="text-xs text-gray-500">İlan artık favoriler listenizde.</p>
            <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-white/10"></div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">4</div>
            <h4 className="font-bold text-white">Takip Edin</h4>
            <p className="text-xs text-gray-500">Gelişmelerden anında haberdar olun.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 text-center space-y-6 shadow-2xl shadow-pink-500/20">
        <h2 className="text-3xl font-bold text-white">Hemen Favorilerini Oluşturmaya Başla</h2>
        <p className="text-white/80 max-w-xl mx-auto">
          Üye girişi yaparak favori sisteminin tüm avantajlarından yararlanabilirsiniz.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/ilan-pazari" className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            İlanları Keşfet
          </Link>
          <Link to="/register" className="bg-black/20 text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-black/30 transition-colors">
            Ücretsiz Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}
