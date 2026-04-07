import { Star, ShieldCheck, Zap, Clock } from 'lucide-react';

export default function ProductGallery() {
  return (
    <div className="flex gap-6 bg-[#232736] p-4 rounded-xl border border-white/5">
      {/* Image */}
      <div className="w-[400px] shrink-0 relative rounded-lg overflow-hidden">
        <img 
          src="https://picsum.photos/seed/valorant/800/600" 
          alt="Valorant" 
          className="w-full h-[280px] object-cover"
        />
        <div className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          Hızlı Teslimat
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
          7/24 Destek
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 py-2">
        <h1 className="text-2xl font-bold text-yellow-500 mb-3">
          Valorant Random Hesap (10-100 Skin)
        </h1>
        
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white">9.8</span>
            <div className="flex text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-gray-400">
            <span className="text-white font-medium">297</span> Değerlendirme
          </div>
          <div className="text-gray-400">
            <span className="text-white font-medium">0</span> Soru & Cevap
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Youtube 1000 izlenme ilanımıza Hoşgeldiniz. 📌 Nasıl Teslim Edilir? İlanımızı Satın Aldığınızda Bize İlettiğiniz Link Gelir, O Linke Gönderimi Sağlarız. Youtube İlanlarında Hesabınızın Gizli Olmaması Gerekir. Şayet Bu Gönderimi İmkansız Hale Kılar ve Gönderi...
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            Kimlik Onaylı Satıcı
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full text-xs font-medium border border-yellow-500/20">
            <Zap className="w-4 h-4" />
            Otomatik Teslimat
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Kalan süre : 58 gün 14 saat 54 dakika 8 saniye</span>
        </div>
      </div>
    </div>
  );
}
